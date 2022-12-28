import { gql } from "@apollo/client" 

const confirm_code= gql`
    mutation confirm_code($email: String, $verify_code: String) {
        confirmCode(email: $email, verify_code: $verify_code) {
            is_verify,uid,
            photoURL, account_name, displayName, class, languages, soundtrack: , theme_game, email
        }
    }
`

export default confirm_code