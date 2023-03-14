export class User{
    constructor(public id: String,
        public name: String,
        public surname: String,
        public registrationDate: Date,
        public gender: Enumerator,
        public eMail: String,
        public password: String,
        public DateOfBirth: String,
        public phoneNumber: String,
        public subscripbedToNewsletter: boolean,
        // public orderHistory: Order[];
        ) {}

}