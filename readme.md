
This library can help you use graqlph to communicate with magento.

Useage:

const { BatchGraphql, InitGraphqlConnect, GraphQl } = require("magento-graphql-lib")

InitGraphqlConnect("http://magentoserver")

async function fun() {
    //default store code
    const rs1 = await BatchGraphql().Querys(SIGN_IN, { email: "test@test.com", password: "123123123" })
    console.log(rs1)
    //muit store code
    const rs2 = await BatchGraphql(["store1","store2"]).Querys(SIGN_IN, { email: "test@test.com", password: "123123123" })
    console.log(rs2)
}

fun()


