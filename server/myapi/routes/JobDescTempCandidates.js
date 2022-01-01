const { json } = require('body-parser');
var express = require('express');
var router = express.Router();
const fs = require('fs')


/* GET users listing. */
router.get('/', function (req, res, next) {

    let param = req.query.JobDescTempOfScrenningProcess
    console.log(param)
    // console.log(__dirname +'\\'+ param + "Candidates.json")
    let dataArray

    if (fs.existsSync(__dirname + '\\' + param + "Candidates.json")) {

        dataArray = require(__dirname + '\\' + param + "Candidates.json");
        console.log("exists:");
        console.log(dataArray);

        res.json({
            data: dataArray
        })
    } else {
        console.log("DOES NOT exist:");
        res.json({
            data: []
        })
    }

});


router.post('/', function (req, res, next) {

    let candidateInfo = req.body.candidateInfo
    let processName = req.body.processName

    console.log(candidateInfo)
    console.log(processName)

    fs.readFile(__dirname + '\\' + processName + 'Candidates.json', function (err, data) {
        var json = JSON.parse(data);
        console.log(json)
        json.push(candidateInfo);
        fs.writeFile(__dirname + '\\' + processName + 'Candidates.json', JSON.stringify(json), function (err) {
            if (err) throw err;
            console.log('The "data to append" was appended to file!');
        });
    })


});




module.exports = router;
