var express = require('express');
var router = express.Router();
const { writeFile } = require('fs')

//Read from file when the server starts so the data are always up to date
var dataArray = require('./UsersData.json');


/* GET users listing. */
router.get('/', function (req, res, next) {

  let param = JSON.parse(req.query.loginValues)
  const serverUserInfo = dataArray.find( person => ((person.username.toLowerCase() === param.username.toLowerCase()) && (person.password.toLowerCase() === param.password.toLowerCase())) );

  res.json({
    data: serverUserInfo
  })
});

//Not needed post yet.
// router.post('/', function (req, res, next) {

//   
//   // console.log(req.body)
//   dataArray.push(req.body)

//   res.json({
//     data: dataArray
//   })

// });


module.exports = router;
