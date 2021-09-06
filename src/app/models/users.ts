export class Users {
    
        is_success: boolean
        data: {
            token:string,
            expiry: string,
            is_borrower: boolean,
            is_staff: boolean,
            full_name: string,
            is_mobile_number_verified: boolean,
            is_email_verified: boolean,
            user_type: string,
            is_mfa_enabled: boolean,
            force_mfa: boolean
        }
    
}
