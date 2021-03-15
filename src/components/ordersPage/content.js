/**
 * This page will create all the content of the Orders-page (views/orders.js)
 */

import UndoRedo from "../undoRedo.js";

export default class Content {
    constructor() {
        this.data = window.OrdersData;
        this.orders = window.OrdersData.data
        this.undoRedo = new UndoRedo();
    }

    init = () => {

    }



    render = () => {
        var content = $('<div class="content-container"></div>');
        $(content).append(this.createUndoRedo());
        $(content).append(this.allOrders());
        window.lang.generateStrings(content);
        return content;
    }

    /**
     * Creates the box containing all orders 
     * @returns A box containing  order-cards
     */
    allOrders = () => {
        let all_orders = $('<div id="all-orders"></div>');

        /* Order items box*/
        let orders = $('<div  id="orders"></div>');
        let header_order = $('<div class="header-order"><span data-textid="order-header-order"></span></div>');
        let cont_orders = $('<div  id="orders-container"></div>');
        
        $(orders).append(header_order);
        $(orders).append(cont_orders);
        
        /* Delivered order items box*/
        let del_orders = $('<div  id="delivered-orders"></div>');
        let header_del = $('<div class="header-delivered"><span data-textid="order-header-delivered"></span></div>');
        let cont_del_orders = $('<div id="delivered-orders-container" ></div>');
        
        $(del_orders).append(header_del);
        $(del_orders).append(cont_del_orders);
        
        $(all_orders).append(orders);
        $(all_orders).append(del_orders);
    
        /*Creats one order card for each order in the database*/
        for (let i = 0; i < this.orders.length; i++){
                if(this.orders[i].delivered == "false"){
                    $(cont_orders).append(this.createOrderCard(this.orders[i], this.orders[i].id));
                }
                else{
                    $(cont_del_orders).append(this.createOrderCard(this.orders[i], this.orders[i].id));
                }
        } 

        /*Prevent standars handling of drag and drop*/
        $(cont_orders).on("dragover", (ev) => {
            ev.preventDefault();
        });

        /*When an order is dropped in the box containing non delivered orders,
        call function changeDeliveredStatus to update the delivered status to false*/
        $(cont_orders).on("drop", (ev) => {
            ev.preventDefault();
            var data = ev.originalEvent.dataTransfer.getData("text");

            if(ev.target.id == "orders-container"){

                let funObj = {
                    execute: {
                        fun: changeDeliveredStatus,
                        args: [data, "false"]
                    },
                    unexecute: {
                        fun: changeDeliveredStatus,
                        args: [data, "true"]
                    }
                }
                this.undoRedo.doit(funObj);
                this.updateUndoRedo()
            }       
        });

        /*Prevent standars handling of drag and drop*/
        $(cont_del_orders).on("dragover", (ev) => {
            ev.preventDefault();
        });

        /*When an order is dropped in the box containing delivered orders,
        call function changeDeliveredStatus to update the delivered status to true*/
        $(cont_del_orders).on("drop", (ev) => {
            ev.preventDefault();
            var data = ev.originalEvent.dataTransfer.getData("text");

            if(ev.target.id == "delivered-orders-container"){  

                let funObj = {
                    execute: {
                        fun: changeDeliveredStatus,
                        args: [data, "true"]
                    },
                    unexecute: {
                        fun: changeDeliveredStatus,
                        args: [data, "false"]
                    }
                }
                this.undoRedo.doit(funObj);
                this.updateUndoRedo()
            }
        });

        /*Updates the delivered status for the order*/
        let changeDeliveredStatus = (orderId, delivered) => {
            for (let i = 0; i < this.orders.length; i++) {
                if (Number(orderId) == this.orders[i].id) {
                    this.orders[i].delivered = delivered;
                    updateView(this.orders[i]);
                    break;
                } 
            }   
        }





        /*Update the view when an order card has been moved*/
        let updateView = (orderDrop) => {
            let orderCard = document.getElementById(orderDrop.id);
            
            if(orderDrop.delivered == "false"){
                $(cont_del_orders).remove(orderCard);
                $(cont_orders).append(orderCard);
            }
            else{
                $(cont_orders).remove(orderCard);
                $(cont_del_orders).append(orderCard);
            }
        }

        return all_orders;
    }
    

    /**
     * Creates the box the box containing an order-card
     * @returns A box containing an order-card
     */
    createOrderCard = (order_cont,id) => {
        let cont_card = $('<div draggable="true" id="' + id + '" class="container-card"></div>');
        let card = $('<div class="order-card"></div>');
        let content_card = $('<div class="content-card"></div>');

        /*Get the id for the order that is being dragged*/
        $(cont_card).on("dragstart", (ev) => {
            ev.originalEvent.dataTransfer.setData("text", ev.target.id);
        });

        let table = $('<div class="container-table">'+
                        '<div class="txt-table"><span data-textid="order-table"></span>:</div>'+
                        '<div class="table"> 4 </div>'+  /*Instead of 4 it should be: order_cont.table*/
                    '</div>');

        let time = $('<div class="container-time">'+
                        '<div class="txt-time"><span data-textid="order-time"></span>:</div>'+
                        '<div class="time"> ' + order_cont.time + '</div>'+
                    '</div>');

        let order = $('<div class="container-order"><div class="txt-order"><span data-textid="order-order"></span>:</div></div>')

        for (let i = 0; i < order_cont.items.length; i++){
            $(order).append(this.addItems( order_cont.items[i]));
        }

        $(content_card).append(table);
        $(content_card).append(time);
        $(content_card).append(order);

        $(card).append(content_card);

        $(cont_card).append(card);
        
        return cont_card;
    }

    /**
     * Creates the box containing the ordered items for one order
     * @returns A box containing the items for one order
     */
    addItems = (product) => {
       let item_cont = $('<div class="container-items"></div>');
       let item = $('<div class="item">' + product.item + '</div>');
       let price = $('<div class="price">' + product.price + '<span data-textid="order-price"></span>' + '</div>');
    
       $(item_cont).append(item);
       $(item_cont).append(price);

       return item_cont;
    }


    createUndoRedo = () => {

        let svgUndo = '<svg width=50 height=30 viewBox="0 0 50 30" xmlns="http://www.w3.org/2000/svg">'+ 
            '<path d="M8 15 l 30 -10 v 20 z" stroke="#341001" stroke-width=5 fill="none"/>' + 
        '</svg>'
        let svgRedo = '<svg width=50 height=30 viewBox="0 0 50 30" xmlns="http://www.w3.org/2000/svg">'+
            '<g transform="scale(-1, 1) translate(-50, 0)">' + 
            '<path d="M8 15 l 30 -10 v 20 z" stroke="#341001" stroke-width=5 fill="none"/>' +
            '</g>' + 
        '</svg>'

        let undo = $('<div id="undoBtn" class="undoRedoButton"></div>').click(() => {
            this.undoRedo.undoit()
            this.updateUndoRedo()
        })
        undo.append(svgUndo)

        let redo = $('<div id="redoBtn" class="undoRedoButton"></div>').click(() => {
            this.undoRedo.redoit()
            this.updateUndoRedo()
        })
        redo.append(svgRedo)

        let container = $('<div class="container-table right"></div>');

        container.append(undo);
        container.append(redo);

        if (!this.undoRedo.isUndo()) { undo.addClass("notavailable") }
        if (!this.undoRedo.isRedo()) { redo.addClass("notavailable") }

        return container;
    }

    updateUndoRedo = () => {
        if (!this.undoRedo.isUndo()) {
            $("#undoBtn").addClass("notavailable")
        } else {
            $("#undoBtn").removeClass("notavailable")
        }

        if (!this.undoRedo.isRedo()) {
            $("#redoBtn").addClass("notavailable")
        } else {
            $("#redoBtn").removeClass("notavailable")
        }
    }

}
