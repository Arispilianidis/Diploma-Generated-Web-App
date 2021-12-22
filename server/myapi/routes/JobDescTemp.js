var express = require('express');
var router = express.Router();
const { writeFile } = require('fs')

const writeTo = __filename.replace(/^.*[\\\/]/, '').slice(0, -3)
var answers = require('../' + writeTo + '.json');

router.get('/', function (req, res, next) {
    
    if (!answers) {
        // console.log("Not found" + writeTo)
        res.send("File Not Found")
    }
    else {
        res.json({
            data: answers
        })
    }
});

router.post('/', function (req, res, next) {

    let formData = req.body
    console.log(formData)
    console.log(writeTo)

    writeFile('./' + writeTo + '.json', JSON.stringify(formData, null, 2), function writeJSON(err) {
        if (err) return console.log(err);
        console.log(JSON.stringify(formData));
        res.sendStatus(200)
    })

});




module.exports = router;
