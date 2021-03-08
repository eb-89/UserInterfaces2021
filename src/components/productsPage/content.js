/**
 * This page will create all the content of the Products-page (views/products.js)
 */

export default class Content {
    constructor() {
    }

    init = () => {
        
    }

    render = () => {
        var content = $('<div class="content-container"></div>');
        $(content).append(this.createOrderButton());
        $(content).append(this.createEditDialog());
        $(content).append(this.listBoughtItems());
        
        return content;
    }
    createOrderButton=()=>
    {
      var orderButton = '<button id = "orderBtn" onclick = "onClick_CreateOrder()"> + OrderNewItem</button>';
      return orderButton;  
    }
    createEditDialog = () => {

        var modal = '<div class="modal-content">';
        modal += '<div class="modal-header">';
        modal += '<span class="close"><button id = "closeBtn" type="button" onclick="OnCloseDialog()">X</button></span>';
        modal += ' <h5 id ="modalHeader">Update Stock Data</h5>';
        modal += '</div>';
        modal += '<div class="modal-body">';
        modal += ' <input type = "hidden" id = "tf_transactionid"/>';
        modal += ' <label>Admin ID : </label><input type = "text" id = "tf_adminid"/><br/>';
        modal += ' <label>Beer ID : </label><input type = "text" id = "tf_beerid"/><br/>';
        modal += ' <label>Price : </label><input type = "text" id = "tf_price"/><br/>';
        modal += ' <label>Amount : </label><input type = "text" id = "tf_amount"/><br/>';
        modal += '<Button type ="button" id = "update_stock_button" onclick = "OnUpdateStock()">Update</button>';
        modal += '<Button type ="button" id = "add_stock_button" onclick = "onCreateNewOrder()">Save</button>';
        modal += '</div>';
        modal += '<div class="modal-footer"></div>'
        modal += '</div></div>';
        return modal;
    }

    // Function to list all the bought items in a table
    listBoughtItems = () => {
        var boughtItems = window.Database.getBoughtItems();

        var content = $('<div class="content-container"></div>');

        var table = '<table border=1px solid black>';
        table += '<caption> Bought Items </caption>';
        table += '<tr><th>Transaction ID</th><th>Admin ID<th>Beer ID</th><th>Amount</th><th>Price</th><th>Time</th><th>Remaining stock</th><th colspan ="2">Actions</th></tr>';
        
        var rows = boughtItems.length;

        for (var row = 0; row < rows; ++row)
        {
            let stockquantity = window.getRemainingStock(boughtItems[row].beer_id);
            table += '<td>' + boughtItems[row].transaction_id + '</td><td>' + boughtItems[row].admin_id + '</td><td>' + boughtItems[row].beer_id +
                '</td><td>' + boughtItems[row].amount + '</td><td>' + boughtItems[row].price + '</td><td>' + boughtItems[row].timestamp +
                '</td><td>'+stockquantity+'</td><td><button id = "editButton" type = "button" value = "' + boughtItems[row].transaction_id +
                '" onclick = edit("' + boughtItems[row].transaction_id + '")>Edit</button></td>';
                table+='<td><button id = "deleteButton" type = "button" value = "' + boughtItems[row].transaction_id +
                '" onclick = ondelete("' + boughtItems[row].transaction_id + '")>Delete</button></td>';
            table += '</tr>';
        }
        
        table += '</table>';
        $(content).append(table);

        return content;
    }


}