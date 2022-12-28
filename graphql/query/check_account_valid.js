import { gql } from "@apollo/client"

const CHECK_ACCOUNT_VALID= gql`
    query check_account_valid($email: String!) {
        check_account_valid(email: $email) {
            is_valid
        }
    }
`

export default CHECK_ACCOUNT_VALID    
