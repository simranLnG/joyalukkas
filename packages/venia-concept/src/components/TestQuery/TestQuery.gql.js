import { gql } from '@apollo/client';

export const ADD_RECORD = gql`
    query addRecord() {
        mutation {
            createForm(
                first_name: "Gunjan"
                last_name: "Patel"
                email: "jhcvjdvfdvdd"
                age: "50"
            ){
                message
                id
            }
        }
    }
`;