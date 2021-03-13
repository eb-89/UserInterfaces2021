export default class OrdersData {
    constructor() {
      this.data = []
      this.idCounter = 0;
      //remove
      //this.addOrderFunc();
    }

    addOrder(table, items){
    var date = Date().split(' ');
    var time = date[4];
    var order = {id: this.idCounter, table: table, time: time, items: items, delivered: "false"};
    this.data.push(order);
    this.idCounter++;
   } 


  // //remove 
  // //test function to add orders
  // addOrderFunc = () => {
  //   this.addOrder(4, [{item: "beer", price: "42"}]);

  //   this.addOrder(5, [{item: "drink", price: "89"}]);

  //   this.addOrder(8, [{item: "beer", price: "39"},{item: "wine", price: "49"}]);
  // }
}