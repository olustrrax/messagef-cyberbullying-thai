

var fs = require('fs'); 
var weka = require('node-weka');
var wordcut = require('wordcut')
var _ = require('lodash');
var comparefeature = require('./comparefeature') 
var allFeature = comparefeature.pair_feature();
var sizeFeature = _.size(allFeature)
wordcut.init();

text = " เป็นคนที่เรียน PC แล้วอิจฉาคอร์สสดตรงประโยคที่ว่า เออเลี้ยงอยู่แล้ว อยากกินไรก็บอก มากๆๆ 5555555 #angkriz"
text = text.replace(/[&\/\\#,+()$~%.'":*?<>_!{}]/g,' ');
text = text.replace(/\s/g, '');
var s = wordcut.cut(text);
var words = s.split('|');
function createWordMap(words){
    var wordsMap = {};
    words.forEach(function (key) {
      if (wordsMap.hasOwnProperty(key)) {
        wordsMap[key]++;
      } else {
        wordsMap[key] = 1;
      }
    });
    
      return wordsMap;
}


function compare(words){
    var sizeMessage = _.size(words)
    var messageObj = [];
    var noFeature = 0;
    for(var i=0; i < sizeFeature; i++){
        noFeature = 0;
        for(var j=0; j < sizeMessage; j++){
            if(_.keys(words)[j] == _.keys(allFeature)[i]){
                messageObj[_.values(allFeature)[i]] = _.values(words)[j]
                noFeature = 1;
            }
           
        }
        if(noFeature == 0){            
            messageObj[_.values(allFeature)[i]] = 0;
        }
    }
    messageObj["class"] = "?"
    return messageObj;
}



var wordsMap = createWordMap (words);
var text_normolize = compare(wordsMap);

// console.log(text_normolize)

var file = "messagetest2"
var fileId = file+'.arff'
var Arff = require('arff-utils')
var arff = new Arff.ArffWriter(file, Arff.MODE_OBJECT)

for (var i = 0; i< sizeFeature ; i++){
    var key = _.keys(text_normolize)[i]
    arff.addNumericAttribute(key)
}
arff.addNominalAttribute("class",["negative","positive"])
arff.addData(text_normolize)
arff.writeToStream(process.stdout);
// arff.writeToFile(fileId, function (err) {
//     if(err) throws;
//     else console.log('SUCCESS')
// });










// fs.writeFile(fileId, arff, function (err) {
//     if(err) throws;
//     else console.log('SUCCESS')
//   });
//   console.log('SUCCESS')
// console.log(typeof arff)

// var exec = require('child_process').exec;
// var child = exec('java test1 '+arff,
//   function (error, stdout, stderr){
//     console.log('Output -> ' + stdout);
//     if(error !== null){
//       console.log("Error -> "+error);
//     }
// });
//TEST
// for (i=0; i<3;i++){
//     var key = _.keys(text_normolize)[i]
//     arff.addNumericAttribute(key.replace(/["']/g, ""))
// }

// key0 = _.keys(text_normolize)[0].replace(/["']/g, "")
// key1 = _.keys(text_normolize)[1].replace(/["']/g, "")
// key2 = _.keys(text_normolize)[2].replace(/["']/g, "")
// arff.addData   ({
//     key0 : _.values(text_normolize)[0],
//     key1 : _.values(text_normolize)[1],
//     key2 : _.values(text_normolize)[2]
    
//     })

