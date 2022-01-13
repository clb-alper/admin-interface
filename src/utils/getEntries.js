const Entry = require('../models/entry');
const db = require('../db/mongoose')
const path = require('path');

const fs = require('fs');


const getEntries =  () => {
    const text = path.join(__dirname, '/text')

    // const jsonPath = path.join(__dirname, '/entries.json')

    const dataBuffer = fs.readFileSync(text);
    const dataText = dataBuffer.toString()
    const datas = dataText.split(']')

    const addParanthesis = datas.map((data) => (data + ']').trim());


    // it filters ]
    const finalArray = addParanthesis.map((element) => {

        if(element !== ']' ){
            return element
        } 
    })

    finalArray.pop()


    const json = JSON.parse(finalArray[finalArray.length - 1]);

    // gives unique id for each entry
    for(let i = 0; i < json.length; i++) {
        if(!json[i]._id) {
            json[i]._id = i
        }
    }


    const jsonContent = JSON.stringify(json);

    fs.writeFile("entries.json", jsonContent, 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }
     
        console.log("JSON file has been saved.");
    });

    return json;
}

 



//giveIdtoEachEntry()
// console.log(getEntries())

module.exports = getEntries;