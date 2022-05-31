import { gql } from "@apollo/client";

export const LOAD_CATEGORIES = gql`
    query {
        categories{
            code
            name
            childrensCount
        }
    }
`