

export default class OrdersData {
    constructor() {
      this.data = []
      this.idCounter = 0;
    }



   addOrder(table, items){
    var date = Date().split(' ');
    var time = date[4];
    var order = {id: this.idCounter, table: table, time: time, items: items};
    this.data.push(order);
    this.idCounter++;
   } 

   
}