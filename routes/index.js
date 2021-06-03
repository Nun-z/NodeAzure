var express = require('express');
var router = express.Router();

router.use(express.json()); // for parsing application/json
router.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

router.get('/', function(req, res)
{
  console.log("Starting!");
  var authenticate = require("azure.js");
});

function getPipelineStatus(req, res, next)
{
  //var pipelineName = req.query.pipelineName


  next();// No need to return anything.
}

module.exports = router;
