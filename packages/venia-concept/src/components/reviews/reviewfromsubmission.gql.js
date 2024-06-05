import { gql } from '@apollo/client';
export const reviewForm = gql`mutation 

createProductReview(
    $sku:String!
    $nickname:String!
    $summary:String!
    $text:String!
){
    createProductReview(
        input: {
            sku: $sku,
            nickname: $nickname,
            summary: $summary,
            text: $text,
            ratings: [
                {
                    id: "NA==",
                    value_id: "MTk="
                }, {
                    id: "MQ==",
                    value_id: "NA=="
                }, {
                    id: "Mg==",
                    value_id: "OA=="
                }
            ]
        }
    ) {
        review {
            nickname
            summary
            text
            average_rating
            ratings_breakdown {
                name
                value
            }
        }
    }
}
`
export default {
    createAccount: reviewForm
}