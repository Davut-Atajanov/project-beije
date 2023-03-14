export class Order{
    constructor(
        public id: String,
        public price: number,
        //I took information below from website of Beije
        pads: Object[],
        dailyPads: Object[],
        tampons: Object[]
    ){

    }
}