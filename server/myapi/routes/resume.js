var express = require('express');
var router = express.Router();
const upload = require('express-fileupload')
router.use(upload())


// router.get('/', function (req, res, next) {
//
// });

router.post('/', function (req, res, next) {

    // console.log(req.files)
    

    if (req.files) {
        console.log("Resume incoming")
        var file = req.files.file

        file.mv('./Resumes/' + file.name, function (err) {
            if (err) {
                res.send(err)
            }
            else {
                // res.send(file)
            }
        })

    }

});

module.exports = router;