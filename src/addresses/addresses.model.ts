import { User } from "src/users/users.model";

export class Address{
    constructor(public id: String,
        public user: User["id"],
        public city: String,
        public district: String,
        public fullAddress: String,
        public postalCode: String,
        ){}
    
}