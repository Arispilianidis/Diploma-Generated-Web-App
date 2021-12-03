var express = require('express');
var router = express.Router();
const upload = require('express-fileupload')

router.use(upload())

router.post('/', function (req, res, next) {

    if (req.files) {

        var file = req.files.file

        file.mv('./public/uploadedFiles/' + file.name, function (err) {
            if (err) {
                res.send(err)
            }
        })

    }

});

module.exports = router;