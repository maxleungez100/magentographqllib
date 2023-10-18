
This library can help you use graqlph to communicate with magento.

Useage:

const { BatchGraphql, InitGraphqlConnect, GraphQl } = require("magento-graphql-lib")

InitGraphqlConnect("http://magentoserver")

async function fun() {
    const rs = await BatchGraphql(["co", "s"]).Querys(SIGN_IN, { email: "test@test.com", password: "123123123" })
    console.log(rs)
}

fun()


