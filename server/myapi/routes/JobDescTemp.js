var express = require('express');
var router = express.Router();
const { writeFile } = require('fs')

const writeTo = __filename.replace(/^.*[\\\/]/, '').slice(0, -3)

router.get('/', function (req, res, next) {
    var answers = require('../' + writeTo + '.json');
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
    })

});




module.exports = router;
