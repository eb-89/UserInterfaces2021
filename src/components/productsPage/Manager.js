/*
summary :
 @Author : Saad Ali
*/

// function to hide the edit Dialog
function OnCloseDialog() {
    $(".modal-content").hide();
}
// function to get the item details by transectionID and populate values in dialog to modify
function edit(transectionID) {
    $(".modal-content").show();
    $("#modalHeader").text("Edit and Update details");
    $("#update_stock_button").show();
    $("#add_stock_button").hide();

    boughtitem = window.getBoughtItemByTransectionId(transectionID);

    $("#tf_transactionid").val(boughtitem.transaction_id);
    $("#tf_beerid").val(boughtitem.beer_id);
    $("#tf_adminid").val(boughtitem.admin_id);
    $("#tf_amount").val(boughtitem.amount);
    $("#tf_price").val(boughtitem.price);
}
// this functions gets called when user clicks on update button from editDialog to update the transaction info in Database
function OnUpdateStock() {
    transectionID = $("#tf_transactionid").val();
    beerid = $("#tf_beerid").val();
    adminid = $("#tf_adminid").val();
    amount = $("#tf_amount").val();
    price = $("#tf_price").val();

    var response = window.updateBoughtItem(
        transectionID,
        beerid,
        adminid,
        amount,
        price
    );
    if (response) {
        location.reload();
    } else {
        alert("Error : Unable to Update!");
    }
}
// function gets called when user clicks on +OrderNewItem button
function onClick_CreateOrder() {
    // showing the dialog and changing the header text
    $(".modal-content").show();
    $("#modalHeader").text("Order New Item");
    // hiding update button and showing the save button
    $("#update_stock_button").hide();
    $("#add_stock_button").show();
    // clearing text fields
    $("#tf_transactionid").val("");
    $("#tf_beerid").val("");
    $("#tf_adminid").val("");
    $("#tf_amount").val("");
    $("#tf_price").val("");
}
// function to insert to order item in database..
function onCreateNewOrder() {
    // getting data from input fields from dialogBox
    beerid = $("#tf_beerid").val();
    adminid = $("#tf_adminid").val();
    amount = $("#tf_amount").val();
    price = $("#tf_price").val();

    if (!(beerid && adminid && amount && price)) {
        alert("Error : Make sure to fill in All fields!");
        return;
    }
    // calling the function defined in Database.js and getting the boolean response [ true = sucess]
    var response = window.orderNewItem(beerid, adminid, amount, price);
    if (response) {
        location.reload();
    }
}

// function to call on delete button click
function ondelete(transactionID) {
    var response = window.deleteBoughtTransaction(transactionID);
    if (response) {
        // sucessfully Deleted Item
        location.reload();
    }
}
