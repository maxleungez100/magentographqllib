// 'use strict'
const { gql } = require('@apollo/client');
const { cart, productBrief, productDetail, store, storeConfig, storeConfigBase, storeConfigBrief } = require('./variableStr.js');
module.exports = {
  CREATE_ACCOUT: gql`mutation createAccount(
    $email: String!
    $firstname: String!
    $lastname: String!
    $password: String!
    $cellphone:String!
    $is_subscribed: Boolean!
  ) {
    createCustomer(
        input: {
            email: $email
            firstname: $firstname
            lastname: $lastname
            password: $password
            is_subscribed: $is_subscribed
            cellphone:$cellphone
        }
    ) {
        customer {
          firstname
          created_at
          email
        }
    }
}`,

  SIGN_IN: gql`mutation signIn(
  $email: String!
  $password: String!
){
  generateCustomerToken(email: $email, password: $password) {
      token
    }
}`,

  GET_GEO_NEAR_BY: gql`query geoNearby(
  $latitude: Float!
  $longitude: Float!
  $state:String
){
  geoNearby(latitude: $latitude, longitude: $longitude,state:$state) {
   ${storeConfig}
  }    
}`,

  GET_STORE_RANGE_BY: gql`query geoNearby(
  $latitude: Float!
  $longitude: Float!
  $state:String
){
  geoNearby(latitude: $latitude, longitude: $longitude,state:$state) {
   ${storeConfigBrief}
  }    
}`,


  USER_INFO: gql`query customer{
  customer {
    middlename
    firstname
    lastname
    email
    addresses {
      city
      company
      country_code
      
      country_id
      custom_attributes {
          attribute_code
          value
      }
      customer_id
      default_billing
      default_shipping
      extension_attributes {
          attribute_code
          value
      }
      fax
      firstname
      id
      lastname
      middlename
      postcode
      prefix
      region {
          region
          region_code
          region_id
      }
      region_id
      street
      suffix
      telephone
      vat_id
  }
  }
}`,

  ADD_CUSTOMER_ADDRESS: gql`mutation createCustomerAddress ($input: CustomerAddressInput!) {
  createCustomerAddress (input: $input) {
      city
      company
      country_code
      country_id
      custom_attributes {
          attribute_code
          value
      }
      customer_id
      default_billing
      default_shipping
      extension_attributes {
          attribute_code
          value
      }
      fax
      firstname
      id
      lastname
      middlename
      postcode
      prefix
      region {
          region
          region_code
          region_id
      }
      region_id
      street
      suffix
      telephone
      vat_id
  }
}`,

  SET_DEF_CUSTOMER_SHIPPING_ADDRESS: gql`mutation updateCustomerAddress($id:Int!){
  updateCustomerAddress(id:$id,input:{default_shipping:true}){
    city
    company
    country_code
    country_id
    custom_attributes {
        attribute_code
        value
    }
    customer_id
    default_billing
    default_shipping
    extension_attributes {
        attribute_code
        value
    }
    fax
    firstname
    id
    lastname
    middlename
    postcode
    prefix
    region {
        region
        region_code
        region_id
    }
    region_id
    street
    suffix
    telephone
    vat_id
  }
}`,

  DEL_CUSTOMER_ADDRESS: gql`mutation deleteCustomerAddress ($id: Int!) {
  deleteCustomerAddress (id: $id)
}`,

  UPDATE_CUSTOMER_ADDRESS: gql`mutation updateCustomerAddress ($id: Int!, $input: CustomerAddressInput) {

  updateCustomerAddress (id: $id, input: $input) {
      city
      company
      country_code
      country_id
      custom_attributes {
          attribute_code
          value
      }
      customer_id
      default_billing
      default_shipping
      extension_attributes {
          attribute_code
          value
      }
      fax
      firstname
      id
      lastname
      middlename
      postcode
      prefix
      region {
          region
          region_code
          region_id
      }
      region_id
      street
      suffix
      telephone
      vat_id
  }
}`,

  UPDATE_CUSTOMER_CELLPHONE: gql`mutation updateCustomerCellphone($input:CustomerUpdateInput! ){
  updateCustomerV2(input:$input){
    customer {
      cellphone
    }
  }
}`,

  GET_BASE_CATEGORIES: gql`query categories  {
    categories  {
        items {
            name
            id
            uid
            children {
                image
                name
                uid
                position
                children {
                    id
                    uid
                    name
                    position
                    children{
                        id
                        uid
                        name
                        product_count
                    }
                }
            }
        }
    }
}`,

  GET_BASE_ROOT_CATEGORIES: gql`query categories  {
  categories  {
      items {
          name
          id
          uid
          children {
              image
              name
              uid
              position
          }
      }
  }
}`,



  GET_CATEGORIE_PRODUCT: gql`query categories($filters:CategoryFilterInput,$pageSize:Int,$currentPage:Int,$sort:ProductAttributeSortInput)  {
    categories(filters:$filters)  {
        items {
            uid
            name
            id
            position
            products(pageSize:$pageSize,sort:$sort,currentPage:$currentPage){
                items{
                    ${productBrief}
                }
                total_count
            }
        }
        
    }
}`
  ,
  GET_MUIT_STORE: gql`query mutiStores($storeCodes:[String]){
  allStores(where: {storeCode_in:$storeCodes}){
    ${store}
  }
}`,

  GET_MUIT_STORE_BASE: gql`query mutiStores($storeCodes:[String]){
  allStores(where: {storeCode_in:$storeCodes}){
    ${store}
  }
}`,

  GET_STORE: gql`query oneStores($storeCode: String!){
    allStores(where: {storeCode:$storeCode}){
     ${store}
    }
}`,

  GET_STORE_CONFIG: gql`query getStoreConfig{
  storeConfig{
   ${storeConfig}
  }
}`,

  GET_STORE_CONFIG_BASE: gql`query getStoreConfig{
  storeConfig{
   ${storeConfigBase}
  }
}`,

  GET_STORE_PASSWORD_CONFIG: gql`query getStoreConfig{
  storeConfig{
    minimum_password_length
    required_character_classes_number 
  }
}`,


  GET_PRODUCT: gql`query productDetail($sku: String) {
    productDetail: products(filter: { sku: {eq: $sku}}) {
      items {
       ${productDetail}
      }
    }
}`,

  GET_PRODUCTS_BYSKUS: gql`query productDetailBykey($sku: [String]) {
   products(filter: { sku: { in: $sku }}) {
    items {
     ${productBrief}
    }
  }
}`,

  CREATE_CART: gql`mutation {
  createEmptyCart {
    String
  }
}`,

  GET_CUSTOM_CART: gql`query customerCart {
  customerCart {${cart}}
}`,

  GET_ALLPRODUCT: gql`query allproducts($categoryId:[String],$pageSize:Int,$currentPage:Int)  {
    allproducts:products(filter: { category_id: { in:$categoryId } },pageSize:$pageSize,currentPage:$currentPage)  {
        total_count
        items{
          ${productBrief}
        }
    }
}`,

  GET_SPECIALPRODUCT: gql`query allproducts($categoryId:[String],$pageSize:Int,$currentPage:Int)  {
  allproducts:products(filter: { category_id: { in:$categoryId }, special_price:{from:"0",to:"1000000"}},pageSize:$pageSize,currentPage:$currentPage,sort:{position:ASC})  {
      total_count
      items{
        ${productBrief}
      }
  }
}`,

  ADD_PRODUCTS_TO_CART: gql`mutation addProductsToCart ($cartId: String!, $cartItems: [CartItemInput!]!) {
    addProductsToCart (cartId: $cartId, cartItems: $cartItems) {
        cart{${cart}}
        user_errors {
          code
          message
        }
    }
}`,

  UPDATE_CART_ITEMS: gql`mutation updateCartItems ($input: UpdateCartItemsInput) {
    updateCartItems (input: $input) {
        cart {
            ${cart}
        }
    }
}`,

  CLEAR_CART: gql`mutation clearCart($cart_id:String!){
  customerClearCart(cart_id:$cart_id){
    id
    items{
      quantity
      uid
      product{
        name
      }
      
    }
  }
}`,

  REMOVE_ITEM_FROM_CART: gql`mutation removeItemFromCart ($input: RemoveItemFromCartInput) {
    removeItemFromCart (input: $input) {
        cart{
            id
        }
    }
}`,

  GET_CUSTOMER_CROSS_SITE_CART: gql`query{
    customerCrossSiteCart{
      storeCodes
    }
}`,

  SET_ORDER_CUSTOMER_NOTE: gql`mutation setOrderCustomerNote($cart_id:String!,$customer_note:String!){
  setOrderCustomerNote(cart_id:$cart_id,customer_note:$customer_note)
}`,

  SET_SHIPPING_ADDRESSES_ON_CART: gql`mutation setShippingAddressesOnCart($input:SetShippingAddressesOnCartInput){
    setShippingAddressesOnCart(input:$input) {
      cart {
        id
        shipping_addresses {
          customer_notes
          firstname
          lastname
          company
          street
          city
          region {
            code
            label
          }
          postcode
          telephone
          country {
            code
            label
          }
          available_shipping_methods{
            carrier_code
            carrier_title
            method_code
            method_title
            amount{
              value
            }
            price_incl_tax{
              value
            }
          }
        }
      }
    }
}`,

  SET_BILLING_ADDRESSES_ON_CART: gql`mutation setBillingAddressOnCart ($input: SetBillingAddressOnCartInput) {
    setBillingAddressOnCart (input: $input) {
      cart {
        id
        billing_address{
            firstname
            lastname
            company
            street
            city
            region {
              code
              label
            }
            postcode
            telephone
            country {
              code
              label
            }
        }
      }
    }
}`,

  SET_SHIPPING_METHODS_ON_CART: gql`mutation setShippingMethodsOnCart ($input: SetShippingMethodsOnCartInput) {
  setShippingMethodsOnCart (input: $input) {
    cart {
      id
      prices {
        applied_taxes {
            amount {
                currency
                value
            }
            label
        }
        discount {
            amount {
                currency
                value
            }
            label
        }
        discounts {
            amount {
                currency
                value
            }
            label
        }
        grand_total {
            currency
            value
        }
        subtotal_excluding_tax {
            currency
            value
        }
        subtotal_including_tax {
            currency
            value
        }
        subtotal_with_discount_excluding_tax {
            currency
            value
        }
    }
      shipping_addresses {
       
        city
        company
        country {
            code
            label
        }
        customer_notes
        firstname
        items_weight
        lastname
        postcode
        region {
            code
            label
            region_id
        }
        selected_shipping_method {
            amount {
                currency
                value
            }
            base_amount {
                currency
                value
            }
            carrier_code
            carrier_title
            method_code
            method_title
        }
        street
        telephone
    }
    }
  }
}`,

  GET_CLIENT_SECRET: gql`mutation getClientSecret($cart_id:String!){
  getStripeClientSecret(cart_id: $cart_id) {
    client_secret
    payment_intents
}
}`,

  GET_AVAILABLE_PAYMENT_METHODS: gql`query getAvailablePaymentMethods($cart_id:String!) {
  cart(cart_id:$cart_id) {
    available_payment_methods {
      code
      title
    }
  }
}`,

  SET_PAYMENT_METHOD_ON_CART: gql`mutation setPaymentMethodOnCart ($input: SetPaymentMethodOnCartInput!) {
  setPaymentMethodOnCart (input: $input) {
    cart {
      selected_payment_method {
        code
      }
    }
  }
}`,



  PLACE_ORDER: gql`mutation placeOrder($cart_id:String!) {
  placeOrder(input: {cart_id:$cart_id }) {
    order {
      order_number
    }
  }
}`,

  GET_PRODUCTS: gql`
query get_products_by_category(
  $pageSize: Int
  $currentPage: Int
  $search: String
  $filter:ProductAttributeFilterInput
  $sort:ProductAttributeSortInput
) {
    products(
			pageSize: $pageSize
      currentPage: $currentPage
    	search: $search
      filter: $filter
      sort: $sort
    ) {
        
        items {
          ${productBrief}
        }
        aggregations{
          attribute_code
          count
          label
          options{
            count
            label
            value
          }
        }
        page_info {
            current_page
            total_pages
            page_size
        }
        total_count
    }
}`,
  GET_LAST_MYORDERS: gql`query getMyLastOrders {
  customer {
    orders {
      total_count
      items {
        order_date
        items {
          product_name
          product_sku
          product_url_key
          product_sale_price {
            value
          }
          product_sale_price {
            value
            currency
          }
          quantity_ordered
          quantity_invoiced
          quantity_shipped
        }
      }
    }
  }
}`,

  UPDATE_CUSTOMER_INFO: gql`mutation updateCustomerV2fun($input:CustomerUpdateInput!){
  updateCustomerV2(input:$input){
    customer{
      lastname
      firstname
    }
  }
}`,

  CHANGE_PASSWORD: gql`mutation changeCustomerPasswordfun($currentPassword:String!,$newPassword:String!){
  changeCustomerPassword(currentPassword: $currentPassword, newPassword: $newPassword){
   email
  }
}`,


  THIRD_PARTY_SIGN: gql`mutation thirdSignIn($socialId:String!,$type:String!,$firstName:String,$lastName:String,$email:String){
  generateCustomerTokenByOauth(socialId: $socialId,
     type: $type, firstName: $firstName, 
     lastName: $lastName, 
     email: $email,
     imagePath:"https://www.ez100.com/pub/media/codazon/themeoptions/background/ez100_logo_Moible_EN.jpg"){
    token
  }
}`,

  GET_WHOLE_ORDERLIST: gql`query getWholeOrderList($page:Int){
  customerOrdersV2(currentPage:$page){
    items{
      status
      id
      store_config{
        store_code
        header_logo_src
        store_information{
         name
         phone
         postcode
       }
       secure_base_media_url
      }
      number
      order_date
      shipping_address{
        street
        city
        region
        telephone
        postcode
      }
      shipments{
        comments{
          message
        }
      }
      items{
        product_sku
        product_name
        product_sale_price{
          value
        }
        quantity_ordered
        thumbnailUrl
      }
      comments{
        message
      }
      total{
        grand_total{
          value
        }
        total_shipping{
          value
        }
        total_tax{
          value
        }
        discounts{
          amount{
            value
          }
        }
      }
    }
    total_count
    page_info{
      current_page
    }
  }
}`,


  CUSTOMER_RECEIPT: gql`mutation customerReceipt($status:CustomerAvailableStatusEnum,$order_number:String!){
  customerUpdateOrderStatus(status:$status,order_number:$order_number)
}`,

  FORGOT_PASSWORD: gql`mutation forget($email:String!){ 
  requestPasswordResetEmail(email:$email)
}`,

  CMS_BLOCK: gql`query cmbBlock($id:[String!]){
    cmsBlocks(identifiers: $id) {
      items {
        content
        identifier
        title
      }
    }
}`,

  ADD_COUPONTO_CART: gql`mutation addConponToCart($cart_id:String!,$coupon_code: String!){
  applyCouponToCart(input: { cart_id: $cart_id, coupon_code: $coupon_code }){
   cart{
     ${cart}
   }
  }
}`,

  REMOVE_COUPON_TO_CART: gql`mutation removeConponToCart($cart_id:String!){
  removeCouponFromCart(input:{cart_id:$cart_id}){
    cart{
      id
    }
  }
}`,

  GET_COUPONS: gql`query {
  customerSalesRules {
    apply_to_shipping
    coupon_code
    coupon_type
    description
    discount_amount
    discount_step
    from_date
    name
    rule_id
    simple_action
    stop_rules_processing
    store_labels
    times_used
    to_date
    uses_per_coupon
    uses_per_customer
    website_ids
    sort_order
  }
}`,

  GET_COUPONS_BY_STORE: gql`query {
  customerSalesRules {
    actions_serialized
    conditions_serialized
    sort_order
    coupon_code
    coupon_type
    description
    discount_amount
    discount_step
    from_date
    is_rss
    name
    simple_action
    stop_rules_processing
    store_labels
    times_used
    to_date
    uses_per_coupon
    uses_per_customer
    website_ids
  }
}`,

}