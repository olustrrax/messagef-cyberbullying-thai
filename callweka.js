var nameFile = "messagetest.arff";
var exec = require('child_process').exec;
var child = exec('java -jar classification.jar'+' '+nameFile,
  function (error, stdout, stderr){
    console.log(stdout);
    if(error !== null){
      console.log("Error -> "+error);
    }
});

