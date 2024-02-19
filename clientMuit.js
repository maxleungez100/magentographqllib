const { ApolloClient, InMemoryCache, HttpLink, from, DefaultOptions } = require('@apollo/client');
const { setContext } = require("apollo-link-context");
const fetch = require('cross-fetch');

var clientPool = {}
var ServerEndPoint = ""
var clientTokenPool = {}



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
    // const Store = storeCode 

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

async function runGraphQL(code, ql, varb, idx = 0, act = "") {
    const rs = await new Promise(async (resolve, err) => {
        var rsdata = ""
        try {
            var variables = varb?.[idx] || varb
            if (act == "1") {
                rsdata = await clientPool[code].mutate({ mutation: ql, variables, errorPolicy: "all" })
            } else {
                rsdata = await clientPool[code].query({ query: ql, variables, errorPolicy: "all" })
            }

            resolve(rsdata)
            return
        } catch (error) {
            // console.log(error.message)

            resolve({ error, errorMsg: error.networkError.bodyText })
        }

    })
    return rs


}


async function QuerysAct(query, varb) {
    var results = []
    var process = Object.values(this.codes).map((clientKey, idx) => {
        return runGraphQL(clientKey, query, varb, idx)
    })
    results = await Promise.all(process)
    return results
}

async function MutationsAct(mutation, varb) {
    var results = []
    var process = Object.values(this.codes).map((clientKey, idx) => {
        return runGraphQL(clientKey, mutation, varb, idx, "1")
    })
    results = await Promise.all(process)
    return results
}

const ResetClients = () => {
    clientPool = {}
    clientTokenPool = {}
}


const InitGraphqlConnect = (serverEndPoint) => {
    ServerEndPoint = serverEndPoint
}

const BatchGraphql = (codes = [""], token = "") => {
    if (!ServerEndPoint) {
        throw new Error("Run InitGraphqlConnect First!!!")
    }


    const httpLink = new HttpLink({ uri: `${ServerEndPoint}/graphql`, fetch });

    codes.map((store_code) => {
        if (!clientPool[store_code] || !clientTokenPool[store_code]) {
            clientTokenPool[store_code] = token
            clientPool[store_code] = new ApolloClient({
                cache: new InMemoryCache({ addTypename: false }),
                link: from([genAuthMiddlewares(store_code, clientTokenPool[store_code], "Post"), httpLink]),
                defaultOptions
            })
        }
    })


    const module = {
        codes,
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
