const { ApolloClient, InMemoryCache, HttpLink, from, DefaultOptions } = require('@apollo/client');
const { setContext } = require("apollo-link-context");
const fetch = require('cross-fetch');

var clientPool = {};
var ServerEndPoint = ""

// export interface GQlResultProps {
//     msg: string,
//     errPath: string,
// }



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



const genAuthMiddlewares = (token, store, method) => {
    const Store = store
    return setContext((req, { headers }) => {
        if (Store) {
            headers = {
                ...headers,
                authorization: token ? `Bearer ${token}` : '',
                Store
            }
        } else {
            headers = {
                ...headers,
                authorization: token ? `Bearer ${token}` : '',
            }
        }
        return {
            headers
        };
    });
}

async function runGraphQL(code, ql, varb, idx = 0, act = "") {
    const rs = await new Promise(async (resolve, err) => {
        var rsdata = ""
        try {
            var variables = varb?.[idx] || varb
            if (act=="1") {
                rsdata = await clientPool[code].mutate({ mutation: ql, variables, errorPolicy: "all" })
            }else{
                rsdata = await clientPool[code].query({ query: ql, variables, errorPolicy: "all" })
            }
            
            resolve(rsdata)
            return
        } catch (error) {
            resolve({ error })
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
        return  runGraphQL(clientKey, mutation, varb, idx,"1")
    })
    results = await Promise.all(process)
    return results
}

const ResetClients = () => {
    clientPool = {}
}


const InitGraphqlConnect = (serverEndPoint) => {
    ServerEndPoint = serverEndPoint
}

const BatchGraphql = (codes = [""], token = "") => {
    const httpLink = new HttpLink({ uri: `${ServerEndPoint}/graphql`, fetch });
    codes.map((code) => {
        if (!clientPool[code]) {
            clientPool[code] = new ApolloClient({
                cache: new InMemoryCache({ addTypename: false }),
                link: from([genAuthMiddlewares(token, code, "Post"), httpLink]),
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