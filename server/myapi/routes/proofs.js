var express = require('express');
var router = express.Router();
const upload = require('express-fileupload')

router.use(upload())

// /* GET users listing. */
// router.get('/', function (req, res, next) {
// });

router.post('/', function (req, res, next) {

    if (req.files) {
        console.log(req.url)

        var file = req.files.file

        file.mv('./public/images/proofs/' + file.name, function (err) {
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