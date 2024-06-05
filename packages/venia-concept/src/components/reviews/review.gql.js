import { gql } from '@apollo/client';

export const GET_PRODUCTS_REVIEWS = gql`query getProductReviews(
    $sku: String!
) {
    products(filter: { sku: { eq: $sku } }) {
        items {
            uid
            review_count
            rating_summary
            reviews {
                items {
                    average_rating
                    summary
                    text
                    created_at
                    nickname
                }
            }
        }
    }
}
`