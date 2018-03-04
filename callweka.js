
var exec = require('child_process').exec;

module.exports = {
  classification: function (fileName,callback){
      var child = exec('java -jar classification.jar'+' '+fileName,
        function (error, stdout, stderr){
        if(error !== null){
          console.log("Error -> "+error);
        }
        callback(stdout)
      });
  }
}





function classification(filename,callback){
  var child = exec('java -jar classification.jar'+' '+filename,
    function (error, stdout, stderr){
      // console.log("stdout: "+stdout+" type: "+typeof stdout);
      // prediction = stdout
      // console.log("Prediction: "+prediction)
      if(error !== null){
        console.log("Error -> "+error);
      }
      callback(stdout) 
  });
 
}

//TEST
// classification("message3.arff", function(prediction){
//   console.log("Prediction: "+prediction)
// })
