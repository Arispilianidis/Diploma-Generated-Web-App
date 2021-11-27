var express = require('express');
var router = express.Router();
const { writeFile } = require('fs')



router.get('/', function (req, res, next) {

    console.log("Hi")
});

router.post('/', function (req, res, next) {


    
    let formData = req.body
    console.log(formData)

    let writeTo = __filename.replace(/^.*[\\\/]/, '').slice(0,-3)
    console.log(writeTo)
        
    writeFile('./' + writeTo +'.json', JSON.stringify(formData, null, 2), function writeJSON(err) {
        if (err) return console.log(err);
        console.log(JSON.stringify(formData));
    })

});




module.exports = router;
