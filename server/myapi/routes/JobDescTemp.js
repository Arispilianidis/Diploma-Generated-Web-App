var express = require('express');
var router = express.Router();
const { writeFile } = require('fs')
var processName


router.get('/', function (req, res, next) {

    let answers = require('../' + processName + '.json');
    
    if (!answers) {
        console.log("Not found" + processName)
        res.send("File Not Found")
    }
    else {
        res.json({
            data: answers
        })
    }
});

router.post('/', function (req, res, next) {

    let formData = req.body.formData
    processName = req.body.processName
    console.log(formData)
    console.log(processName)

    writeFile('./' + processName + '.json', JSON.stringify(formData, null, 2), function writeJSON(err) {
        if (err) return console.log(err);
        console.log(JSON.stringify(formData));
        res.sendStatus(200)
    })

});




module.exports = router;
