// her 10 saniyede bir new data geldimi diye bakıcaz.
const Entry = require('../models/entry');
const db = require('../db/mongoose')
const getEntries = require('./getEntries');
const saveEntry = require('./saveEntry');
let jsonids = [];
let dbids = [];
const newEntry =  async () => {
    
    const entries = getEntries();
    // jsonids = entries.map((entry) => entry._id);
    
    // console.log('jsids', jsonids);
    // console.log('dbids', dbids);

    const dbEntries = await Entry.find({}).exec()
    // dbids = dbEntries.map((entry) => entry.id)

    if(entries.length === 0 ) {
        getEntries()
    }
    else if(dbEntries.length !== entries.length) {
        saveEntry()
    }
}

module.exports = newEntry