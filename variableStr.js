
const productBrief = `
__typename
id
name
sku
uid
image{
    url
}
thumbnail{
    url
}
stock_status
categories {
  id
  uid
  position
  name
}
special_to_date
price_range{
    maximum_price{
        final_price{
            value
        }
        regular_price{
          value
        }
    }
    minimum_price{
        final_price{
            value
            
        }
        regular_price{
          value
        }
    }
}`

const configurableProduct = `
... on ConfigurableProduct {
  configurable_options{
    id
    uid
    attribute_id
    label
    position
    use_default
    attribute_code
    values {
      value_index
      label
    }
    product_id
  }
  variants {
    product {
      id
      name
      sku
      image{
        url
      }
      media_gallery{
        label
        url
        disabled
        position
        __typename
      }
      attribute_set_id
      ... on PhysicalProductInterface {
        weight
      }
      price_range{
        minimum_price{
          regular_price{
            value
            currency
          }
        }
      }
    }
    attributes {
      uid
      label
      code
      value_index
    }
  }

}
`

const customizableProductInterface = `
... on CustomizableProductInterface {  
  options {
    title
    required
    sort_order
    option_id
    __typename
    uid
     ... on CustomizableFieldOption {
      fieldOption:value {
        uid
        sku
        price
        price_type
        max_characters
      }
    }
    ... on CustomizableDropDownOption{
      dropDownOption:value {
        uid
        sku
        price
        price_type
          title
        option_type_id
        sort_order
      }
    }
    ... on CustomizableMultipleOption{
      multipleOption:value {
        uid
        sku
        price
        price_type
          title
        option_type_id
        sort_order
      }
    }
  }
}
`

const productDetail = `
${productBrief}
${configurableProduct}
${customizableProductInterface}
  attribute_set_id
  stock_status
  price_tiers{
    final_price{
      value
      currency
    }
    discount{
    amount_off
      percent_off
    }
    quantity
  }      
  
  description {
    html
  }
  short_description{
      html
  }
  media_gallery {
    label
    url
    disabled
    position
    __typename
  }
  related_products{
    name
    id
    sku
    url_key
    image{url}
    price_tiers{
    final_price{
      value
      currency
    }
    discount{
    amount_off
      percent_off
    }
    quantity
  }      
    price_range {
      minimum_price {
        regular_price { value }
        final_price { value }
      }
      maximum_price {
        regular_price { value }
        final_price { value }
      }
    }
   
  }`

const configcartItem = `... on ConfigurableCartItem {
  configurable_options {
    configurable_product_option_uid
    option_label
    configurable_product_option_value_uid
    value_label
  }
  customizable_options {
    customizable_option_uid
    label
    type
    sort_order
    values{
      customizable_option_value_uid
      price{
        value
      }
      value
      label
    }
  }
}`



const simpleCartItem = `... on SimpleCartItem {
  simpleCustomizable_options:customizable_options {
    customizable_option_uid
    label
    type
    sort_order
    values{
      customizable_option_value_uid
      price{
        value
      }
      value
      label
    }
  }
}`



const cart = `billing_address {
    city
    company
    country {
        code
        label
    }
   
    firstname
    lastname
    postcode
    region {
        code
        label
        region_id
    }
    street
    telephone
}
email
id
applied_coupons{
  code
}
items {
    uid
    ${configcartItem}
    ${simpleCartItem}
    prices {
        discounts {
            label
        }
        price {
            currency
            value
        }
        row_total {
            currency
            value
        }
        row_total_including_tax {
            currency
            value
        }
        total_item_discount {
            currency
            value
        }
    }
    product {
        ${productDetail}
    }
    quantity
}
prices {
    applied_taxes {
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
selected_payment_method {
    code
    purchase_order_number
    title
}
shipping_addresses {
    customer_notes
    available_shipping_methods {
        amount {
            currency
            value
        }
        available
      
        carrier_code
        carrier_title
        error_message
        method_code
        method_title
        price_excl_tax {
            currency
            value
        }
        price_incl_tax {
            currency
            value
        }
    }
   
    
    city
    company
    country {
        code
        label
    }
    customer_notes
    firstname
   
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
      
        carrier_code
        carrier_title
        method_code
        method_title
    }
    street
    telephone
}
total_quantity
`

const store = `id
name
street
city
state
zip
latitude
longitude
radius
overall
phone
storeType
businessType
storeImageUrl
timezone
dst
info
publicJsonData
storeCode
storeId
websiteId
storeGroupId
createdAt
updatedAt
`



const storeConfig = `absolute_footer
allow_guests_to_write_product_reviews
allow_items
allow_order
autocomplete_on_storefront
base_currency_code
base_link_url
base_media_url
base_static_url
base_url
braintree_cc_vault_active
catalog_default_sort_by
category_fixed_product_tax_display_setting
category_url_suffix
cms_home_page
cms_no_cookies
cms_no_route
code
configurable_thumbnail_source
copyright
default_description
default_display_currency_code
default_keywords
default_title
demonotice
front
grid_per_page
grid_per_page_values
head_includes
head_shortcut_icon
header_logo_src
id
is_default_store
is_default_store_group
list_mode
list_per_page
list_per_page_values
locale
logo_alt
logo_height
logo_width
magento_wishlist_general_is_enabled
minimum_password_length
no_route
payment_payflowpro_cc_vault_active
product_fixed_product_tax_display_setting
product_reviews_enabled
product_url_suffix
required_character_classes_number
root_category_id
root_category_uid
sales_fixed_product_tax_display_setting
secure_base_link_url
secure_base_media_url
secure_base_static_url
secure_base_url
send_friend {
  enabled_for_customers
  enabled_for_guests
}
show_cms_breadcrumbs
store_code

store_group_code
store_group_name
store_information {
  storeName
  address{
    city
  }
}
store_name
store_sort_order
timezone
title_prefix
title_separator
title_suffix
use_store_in_url
website_code
website_id
website_name
weight_unit
welcome
twosupply_shipping_method{
  free_shipping_subtotal
  shipping_cost_per_order
}
sales_minimum_order_amount`


const storeConfigBase = `absolute_footer
header_logo_src
secure_base_media_url
store_code
store_information {
  name
}
`


const storeConfigBrief = `
store_code
store_extra_information {
  latitude
  longitude
  overall
  radius
}
store_name`


module.exports = {
  storeConfigBrief,
  storeConfigBase,
  storeConfig,
  store,
  cart,
  simpleCartItem,
  configcartItem,
  productDetail,
  customizableProductInterface,
  configurableProduct,
  productBrief

}