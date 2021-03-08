// =====================================================================================================
// SOme sample API functions for the Flying Dutchman data base.
// =====================================================================================================
// Author: Lars Oestreicher, 2018
//
// Adapted from a mySQL data base.
//
// We use (global) variables to store the data. This is not generally advisable, but has the
// advantage that the data is easy to access through simple APIs. Also, when storing as local storage,
// all data is stored as strings, which might be adding some complexity.

export default class Database {
    constructor(DB, DB2) {
        this.DB = DB;
        this.DB2 = DB2;

        //exposing function to global space, to use in Manager.js file
        window.getBoughtItemByTransectionId = this.getBoughtItemByTransectionId;
        window.updateBoughtItem = this.updateBoughtItem;
        window.orderNewItem = this.orderNewItem;
        window.getTransactionID = this.getTransactionID;
        window.deleteBoughtTransaction = this.deleteBoughtTransaction;
        window.getRemainingStock = this.getRemainingStock;
    }

    allUserNamesPasswords() {
        var nameCollect = [];

        for (let i = 0; i < this.DB.users.length; i++) {
            var user = {
                username: this.DB.users[i].username,
                password: this.DB.users[i].password,
            };
            nameCollect.push(user);
        }
        return nameCollect;
    }

    // =====================================================================================================
    // This is an example of a file that will return an array with some specific details about a
    // selected user name (not the first name/alst name). It will also add details from another "database"
    // which contains the current account status for the person.
    //
    userDetails(userName) {
        var userCollect = {};
        var userID;
        var userIndex;
        var account;

        // First we find the user ID of the selected user. We also save the index number for the record in the JSON
        // structure.
        //
        for (let i = 0; i < this.DB.users.length; i++) {
            if (this.DB.users[i].username == userName) {
                userID = this.DB.users[i].user_id;
                userIndex = i;
            }
        }

        // We get the current account status from another table in the database, account. We store this in
        // a variable here for convenience.
        //
        for (let i = 0; i < this.DB.account.length; i++) {
            if (this.DB.account[i].user_id == userID) {
                account = this.DB.account[i].creditSEK;
            }
        }

        // This is the way to add the details you want from the db into your own data structure.
        // If you want to change the details, then just add or remove items accordingly below.
        userCollect = this.__userDetails(
            this.DB.users[userIndex].user_id,
            this.DB.users[userIndex].credentials,
            this.DB.users[userIndex].username,
            this.DB.users[userIndex].first_name,
            this.DB.users[userIndex].last_name,
            this.DB.users[userIndex].email,
            account
        );

        return userCollect;
    }

    __userDetails(
        user_id,
        credentials,
        username,
        first_name,
        last_name,
        email,
        balance
    ) {
        let collectorJSON = {
            userID: user_id,
            credentials: credentials,
            username: username,
            firstName: first_name,
            lastName: last_name,
            email: email,
            balance: balance,
        };
        return collectorJSON;
    }

    // =====================================================================================================
    // This function will change the credit amount in the user's account. Note that the amount given as argument is the new
    // balance and not the changed amount (± balance).
    //
    changeBalance(userName, newAmount) {
        // We use this variable to store the userID, since that is the link between the two data bases.
        var userID;

        // First we find the userID in the user data base.
        //
        for (let i = 0; i < this.DB.users.length; i++) {
            if (this.DB.users[i].username == userName) {
                userID = this.DB.users[i].user_id;
            }
        }

        // Then we match the userID with the account list.
        // and change the account balance.
        //
        for (let i = 0; i < this.DB.account.length; i++) {
            if (this.DB.account[i].user_id == userID) {
                this.DB.account[i].creditSEK = newAmount; // This changes the value in the JSON object.
            }
        }
    }

    // =====================================================================================================
    // Returns a list of all the names of the beverages in the database. This function can be used as a
    // recipe for similar functions.
    //
    allBeverages() {
        // Using a local variable to collect the items.
        var collector = [];

        // The DB is stored in the variable DB2, with "spirits" as key element. If you need to select only certain
        // items, you may introduce filter functions in the loop... see the template within comments.
        //
        for (let i = 0; i < this.DB2.spirits.length; i++) {
            collector.push([
                this.DB2.spirits[i].namn,
                this.DB2.spirits[i].varugrupp,
            ]);
        }
        //
        return collector;
    }

    // =====================================================================================================
    // Returns a list of all the beverages:
    // returns:
    //
    allBeveragesMoreDetailed() {
        // Using a local variable to collect the items.
        let collector = [];

        for (let i = 0; i < this.DB2.spirits.length; i++) {
            collector.push(
                this.__allBeveragesMoreDetailed(
                    this.DB2.spirits[i].artikelid,
                    this.DB2.spirits[i].namn,
                    this.DB2.spirits[i].prisinklmoms,
                    this.DB2.spirits[i].varugrupp,
                    this.DB2.spirits[i].ursprunglandnamn,
                    this.DB2.spirits[i].producent,
                    this.DB2.spirits[i].alkoholhalt,
                    this.DB2.spirits[i].forpackning
                )
            );
        }

        // The DB is stored in the variable DB2, with "spirits" as key element. If you need to select only certain
        // items, you may introduce filter functions in the loop... see the template within comments.
        return collector;
    }

    __allBeveragesMoreDetailed(id,namn,pris,varugrupp,land,producent,alkoholhalt,forpackning) {
        let collectorJSON = {
            id: id,
            namn: namn,
            pris: pris,
            varugrupp: varugrupp,
            land: land,
            producent: producent,
            alkoholhalt: alkoholhalt,
            forpackning: forpackning,
        };
        return collectorJSON;
    }

    // =====================================================================================================
    // This function returns the names of all strong beverages (i.e. all that contain a percentage of alcohol
    // higher than the strength given in percent.
    //
    allStrongBeverages(strength) {
        // Using a local variable to collect the items.
        //
        var collector = [];

        // The DB is stored in the variable DB2, with "spirits" as key element. If you need to select only certain
        // items, you may introduce filter functions in the loop... see the template within comments.
        //
        for (let i = 0; i < this.DB2.spirits.length; i++) {
            // We check if the percentage alcohol strength stored in the data base is lower than the
            // given limit strength. If the limit is set to 14, also liqueuers are listed.
            //
            if (percentToNumber(this.DB2.spirits[i].alkoholhalt) > strength) {
                // The key for the beverage name is "namn", and beverage type is "varugrupp".
                //
                collector.push([
                    this.DB2.spirits[i].namn,
                    this.DB2.spirits[i].varugrupp,
                ]);
            }
        }

        // Don't forget to return the result.
        //
        return collector;
    }

    // =====================================================================================================
    // Lists all beverage types in the database. As you will see, there are quite a few, and you might want
    // select only a few of them for your data.
    //
    beverageTypes() {
        var types = [];
        for (let i = 0; i < this.DB2.spirits.length; i++) {
            addToSet(types, this.DB2.spirits[i].varugrupp);
        }
        return types;
    }

    // =====================================================================================================
    // Adds an item to a set, only if the item is not already there.
    // The set is modelled using an array.
    //
    addToSet(set, item) {
        if (!set.includes(item)) {
            set.push(item);
        }
        return set;
    }

    // =====================================================================================================
    // Convenience function to change "xx%" into the percentage in whole numbers (non-strings).
    //
    percentToNumber(percentStr) {
        return Number(percentStr.slice(0, -1));
    }

    // This function will return the array of 'Bought' entries from Database
    getBoughtItems() {
        return this.DB.bought;
    }

    // This function will return the details of bought item matching with the 'transectionID'
    getBoughtItemByTransectionId(transectionID) {
        for (let i = 0; i < window.Database.DB.bought.length; ++i) {
            if (window.Database.DB.bought[i].transaction_id == transectionID) {
                return window.Database.DB.bought[i];
            }
        }
    }

    // This function will update the details of bought item with new info from arguments
    updateBoughtItem(transactionID, beerID, adminID, amount, price) {
        for (let i = 0; i < window.Database.DB.bought.length; i++) {
            if (window.Database.DB.bought[i].transaction_id == transactionID) {
                window.Database.DB.bought[i].admin_id = adminID;
                window.Database.DB.bought[i].beer_id = beerID;
                window.Database.DB.bought[i].amount = amount;
                window.Database.DB.bought[i].price = price;
                return true;
            }
        }
        return false;
    }

    // This function will add a new bought item in the Database
    orderNewItem(beerID, adminID, amount, price) {
        var date = new Date().toISOString().substr(0, 19);
        date = date.replace("T", " ");

        var transaction = {
            transaction_id: window.getTransactionID(),
            admin_id: adminID,
            beer_id: beerID,
            amount: amount,
            price: price,
            timestamp: date,
        };

        window.Database.DB.bought.push(transaction);
        return true;
    }

    // this function generateS transaction_id BY GETTING THE LAST transaction_id AND INCREMENTING IT BY 1.
    getTransactionID() {
        let length = window.Database.DB.bought.length;
        var lastID = window.Database.DB.bought[length - 1].transaction_id;

        return parseInt(lastID) + 1;
    }

    // This function will delete the item from bought array
    deleteBoughtTransaction(transactionID) {
        var index = 0;

        for (let i = 0; i < window.Database.DB.bought.length; ++i) {
            if (window.Database.DB.bought[i].transaction_id == transactionID) {
                window.Database.DB.bought.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    // A function to calculate stock
    getRemainingStock(itemID) {
        //itemID = "167903";
        let totalsold = 0;
        let totalbought = 0;

        // Calculate total bought quantity
        for(let i=0;i<window.Database.DB.bought.length;++i) {
            if (window.Database.DB.bought[i].beer_id == itemID) {
                totalbought += parseInt(window.Database.DB.bought[i].amount);
            }
        }

        // calculate how many times the item was sold
        for (let i = 0; i < window.Database.DB.sold.length; ++i) {
            if (window.Database.DB.sold[i].beer_id == itemID) {
                totalsold++;
            }
        }

        return totalbought - totalsold;
    }
}