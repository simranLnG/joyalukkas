import { gql } from '@apollo/client';

export const GET_LINKED_PRODUCTS = gql`
    query getRelatedProducts($sku: String!) {
        products(filter: { sku: { eq: $sku } }) {
            items {
                id
                uid
                name
                related_products {
                    id
                    uid
                    name
                    small_image {
                        label
                        url
                    }
                    url_key
                    url_suffix
                    price_range {
                        minimum_price {
                            regular_price {
                                currency
                                value
                            }
                        }
                    }
                }
                upsell_products {
                    id
                    uid
                    name
                    small_image {
                        label
                        url
                    }
                    url_key
                    url_suffix
                    price_range {
                        minimum_price {
                            regular_price {
                                currency
                                value
                            }
                        }
                    }
                }
                crosssell_products {
                    id
                    uid
                    name
                    small_image {
                        label
                        url
                    }
                    url_key
                    url_suffix
                    price_range {
                        minimum_price {
                            regular_price {
                                currency
                                value
                            }
                        }
                    }
                }
            }
        }
    }
`;