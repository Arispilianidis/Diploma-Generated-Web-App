var express = require('express');
var router = express.Router();
const { writeFile } = require('fs')

//Read from file when the server starts so the data are always up to date
var dataArray = require('./UsersData.json');


/* GET users listing. */
router.get('/', function (req, res, next) {

  res.json({
    data: dataArray
  })
});

router.put('/', function (req, res, next) {


  // console.log(req.body)
  let newData = req.body.data

  //Find index of specific object using findIndex method.    
  let objIndex = dataArray.findIndex((obj => obj.id === newData.id));

  if (objIndex === -1) {
    return res.status(404).json({ success: false, msg: 'No user found' })
  }

  //Log object to Console.
  console.log("Before update: ", dataArray[objIndex])

  //Update object's assignedProcesses and dueDate properties.
  dataArray[objIndex].assignedProcesses = newData.assignedProcesses
  dataArray[objIndex].dueDate = newData.dueDate

  //Async write to UsersData.json the new datarray
  //TODO: The correct path to replace the file is ./routes/UsersData.json
  writeFile('./UsersData.json', JSON.stringify(dataArray, null, 2), function writeJSON(err) {
    if (err) return console.log(err);
    // console.log(JSON.stringify(dataArray));
  });

  res.json({
    data: dataArray
  })

});

router.post('/', function (req, res, next) {

  //not needed to post users yet.
  // console.log(req.body)
  dataArray.push(req.body)

  res.json({
    data: dataArray
  })


});


module.exports = router;
