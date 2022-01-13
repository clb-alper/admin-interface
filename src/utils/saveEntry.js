const Entry = require('../models/entry');
const db = require('../db/mongoose')
const getEntries = require('../utils/getEntries');
const { json } = require('express');
const moment = require('moment');

const saveEntry = async () => {
    const entries = getEntries();

    console.log(entries)

    const dbEntries = await Entry.find({}).exec()

    // database deki entry id leri
    const dbids = dbEntries.map((entry) => entry.id);

    // json file dakı entry idleri
    const jsonids = entries.map((entry) => entry._id);

    console.log('jsssss',jsonids)

    if(dbids.length === 0) {
        entries.forEach(async entry => {
            const newEntry = new Entry({
                id: entry._id,
                cardId: entry.Card_ID,
                authorized: entry.Authorized,
                date: moment().format('MMMM Do YYYY, h:mm:ss a')
            })

            await newEntry.save();
        });
    } else if(dbids.length !== jsonids.length) {

        for(let i = 0; i < jsonids.length; i++) {
                if(jsonids[i] !== dbids[i]) {
                    const newEntry = new Entry({
                        id: entries[i]._id,
                        cardId: entries[i].Card_ID,
                        authorized: entries[i].Authorized,
                        date: moment().format('MMMM Do YYYY, h:mm:ss a')
                    })
    
                    await newEntry.save();
                    dbids.push(i)

                }
        }

        // const indexOfjsonLastElement = jsonids.indexOf(jsonids.length - 1) // it finds index of the last element for jsonids array
        // const indexOFdbLastElement = dbids.indexOf(dbids.length - 1);

        // if(!jsonids.includes(dbids[indexOFdbLastElement])) {
        //     for(indexOFdbLastElement; indexOFdbLastElement <db.length - 1; indexOFdbLastElement++) {
        //         const newEntry = new Entry({
        //             id: entries[indexOFdbLastElement]._id,
        //             cardId: entries[indexOFdbLastElement].Card_ID,
        //             authorized: entry[indexOFdbLastElement].Authorized,
        //         })

        //         await newEntry.save();
        //     }
        // }
    }
    // check database if this entry already has been saved
    const savedEntries = await Entry.find({}).exec();
    // console.log(savedEntries)
    
}


module.exports = saveEntry;