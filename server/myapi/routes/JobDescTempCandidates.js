var express = require('express');
var router = express.Router();
const fs = require('fs')

const writeTo = __filename.replace(/^.*[\\\/]/, '').slice(0, -3)
var dataArray = require('../' + writeTo + '.json');

/* GET users listing. */
router.get('/', function (req, res, next) {

    if (dataArray){
        res.json({
            data: dataArray
        })
    }
    else{
        res.json({
            data: []
        })
    }

});


router.post('/', function (req, res, next) {

    let candidateInfo = req.body

    console.log(candidateInfo)
   

    fs.readFile('./' + writeTo + '.json', function (err, data) {
        var json = JSON.parse(data);
        console.log(json)
        json.push(candidateInfo);    
        fs.writeFile('./' + writeTo + '.json', JSON.stringify(json), function(err){
          if (err) throw err;
          console.log('The "data to append" was appended to file!');
        });
    })


});




module.exports = router;
