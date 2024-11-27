const express = require('express');
const app = express();
const axios = require('axios');
const cheerio = require('cheerio');

const port = 3000;

const website = 'https://en.wikipedia.org/wiki/League_of_Legends_World_Championship'

app.use(express.json());
let content = [];

try {

    axios(website).then(res => {
        const data = res.data;
        const $ = cheerio.load(data)

       
        const mango = $('div.mw-heading.mw-heading3');

        mango.each(function (i,elem){

            console.log($(elem).text());
            content.push($(elem).text());
        })
        
        console.log(content)

        app.use('/', function(req, res) {

            res.send(content.map(ok => 

                `<h3>${ok}</h3><br>`
            ).join(''))
        })


})

    } catch(error){

    console.log(error)
}

app.listen(port, () => {

    console.log(`Server has started at port ${port}`)
})
