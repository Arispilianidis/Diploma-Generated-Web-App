var express = require('express');
var router = express.Router();

const writeTo = __filename.replace(/^.*[\\\/]/, '').slice(0, -3)
console.log(writeTo)
var optionsDataArray = require('../' + writeTo + '.json');
console.log(optionsDataArray)


/* GET users listing. */
router.get('/', function (req, res, next) {


    res.json({
        data: optionsDataArray
    })


});


module.exports = router;