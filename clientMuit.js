const { ApolloClient, InMemoryCache, HttpLink, from, DefaultOptions } = require('@apollo/client');
const { setContext } = require("apollo-link-context");
const fetch = require('cross-fetch');


var ServerEndPoint = ""

const defaultOptions = {
    watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
    },
    query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
    },
}



const genAuthMiddlewares = (storeCode, token = "", method = "post") => {

    const genHeader = (req, { headers }) => {

        headers = {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        }
        if (storeCode) {
            headers["Store"] = storeCode
        }
        return { headers };
    }
    return setContext(genHeader);
}

async function runGraphQL(client, ql, varb, idx = 0, act = "") {
    const rs = await new Promise(async (resolve, err) => {
        var rsdata = ""
        try {
            var variables = varb?.[idx] || varb
            if (act == "1") {
                rsdata = await client.mutate({ mutation: ql, variables, errorPolicy: "all" })
            } else {
                rsdata = await client.query({ query: ql, variables, errorPolicy: "all" })
            }
            resolve(rsdata)
            return
        } catch (error) {
            resolve({ error, errorMsg: error.networkError.bodyText })
        }

    })
    return rs


}


async function QuerysAct(query, varb) {
    var results = []
    var process = Object.values(this.stores).map((client, idx) => {
        return runGraphQL(client, query, varb, idx)
    })
    results = await Promise.all(process)
    return results
}

async function MutationsAct(mutation, varb) {
    var results = []
    var process = Object.values(this.stores).map((client, idx) => {
        return runGraphQL(client, mutation, varb, idx, "1")
    })
    results = await Promise.all(process)
    return results
}

const ResetClients = () => {
    // clientPool = {}
    // clientTokenPool = {}
}


const InitGraphqlConnect = (serverEndPoint) => {
    ServerEndPoint = serverEndPoint
    ResetClients()
}

const BatchGraphql = (codes = [""], token = "") => {
    if (!ServerEndPoint) {
        throw new Error("Run InitGraphqlConnect First!!!")
    }

    const httpLink = new HttpLink({ uri: `${ServerEndPoint}/graphql`, fetch });

    const stores = codes.map((store_code) => {
        return new ApolloClient({
            cache: new InMemoryCache({ addTypename: false }),
            link: from([genAuthMiddlewares(store_code, token, "Post"), httpLink]),
            defaultOptions
        })

    })


    const module = {
        stores,
        Querys: QuerysAct,
        Mutations: MutationsAct
    }
    return module

}


module.exports = {
    ResetClients,
    BatchGraphql,
    InitGraphqlConnect

}
