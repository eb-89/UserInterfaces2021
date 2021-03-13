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
        //<span data-textid = "orderNewItemButton"></span>


      var orderButton = '<button id = "orderBtn" onclick = "onClick_CreateOrder()"> <span data-textid = "orderNewItemButton"></span></button>';
      return orderButton;  
    }
    createEditDialog = () => {

        var modal = '<div class="modal-content">';
        modal += '<div class="modal-header">';
        modal += '<span class="close"><button id = "closeBtn" type="button" onclick="OnCloseDialog()">X</button></span>';
        modal += ' <h4 id ="modalHeader"><span data-textid = "UpdateHeaderlabel"></span><span data-textid = "OrderNewHeaderlabel"></span></h4>';
        modal += '</div>';
        modal += '<div class="modal-body">';
        modal += ' <input type = "hidden" id = "tf_transactionid"/>';
        modal += ' <label><span data-textid = "AdminIDLabel"></span></label><input type = "text" id = "tf_adminid"/><br/>';
        modal += ' <label><span data-textid = "BeerIDLabel"></span> </label><input type = "text" id = "tf_beerid"/><br/>';
        modal += ' <label> <span data-textid = "PriceIDLabel"></span></label><input type = "text" id = "tf_price"/><br/>';
        modal += ' <label><span data-textid = "AmountIDLabel"></span> </label><input type = "text" id = "tf_amount"/><br/>';
        modal += '<Button type ="button" id = "update_stock_button" onclick = "OnUpdateStock()"><span data-textid = "UpdateButtonID"></span></button>';
        modal += '<Button type ="button" id = "add_stock_button" onclick = "onCreateNewOrder()"><span data-textid = "SaveButtonID"></span></button>';
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
        table += '<caption> <span data-textid = "TableCaptionLabel"></span></caption>';
        table += '<tr><th><span data-textid = "TransactionIDLabel"></span></th><th><span data-textid = "AdminIDLabel"></span><th><span data-textid = "BeerIDLabel"></span> </th><th><span data-textid = "AmountIDLabel"></span></th><th><span data-textid = "PriceIDLabel"></span></th><th><span data-textid = "TimeIDLabel"></span></th><th><span data-textid = "RemainingIDLabel"></span></th><th colspan ="2"><span data-textid = "ActionsIDLabel"></span></th></tr>';
        
        var rows = boughtItems.length;

        for (var row = 0; row < rows; ++row)
        {
            let stockquantity = window.getRemainingStock(boughtItems[row].beer_id);
            table += '<td>' + boughtItems[row].transaction_id + '</td><td>' + boughtItems[row].admin_id + '</td><td>' + boughtItems[row].beer_id +
                '</td><td>' + boughtItems[row].amount + '</td><td>' + boughtItems[row].price + '</td><td>' + boughtItems[row].timestamp +
                '</td><td>'+stockquantity+'</td><td><button id = "editButton" type = "button" value = "' + boughtItems[row].transaction_id +
                '" onclick = edit("' + boughtItems[row].transaction_id + '")><span data-textid = "EditButtonLabel"></span></button></td>';
                table+='<td><button id = "deleteButton" type = "button" value = "' + boughtItems[row].transaction_id +
                '" onclick = ondelete("' + boughtItems[row].transaction_id + '")><span data-textid = "DeleteButtonLabel"></span></button></td>';
            table += '</tr>';
        }
        
        table += '</table>';
        $(content).append(table);

        return content;
    }


}