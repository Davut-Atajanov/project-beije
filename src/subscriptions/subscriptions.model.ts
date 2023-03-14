import { Order } from "src/orders/orders.model";

export class Subscription{
    constructor(
        public id: String,
        public subscriptionType: Enumerator,
        public orderId: Order["id"],
        public subscriptionPrice: number,
        public startDate: Date,
        public endData: Date,
    ) {
        
    }
}