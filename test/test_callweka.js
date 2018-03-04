//call weka for classify
//only TEST
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
    return messageObj;
}



var wordsMap = createWordMap (words);
var text_normolize = compare(wordsMap);

console.log(text_normolize["a794"])



var arff = require('node-arff');
var weka = require('./lib/weka-lib.js');

var data = arff.load('./train75cor.arff', function(err, data) {
  if (err) {
    return console.error(err);
  }
  data.normalize();
  data.randomize();
})

var options = {
  //'classifier': 'weka.classifiers.bayes.NaiveBayes', 
  'classifier': 'weka.classifiers.functions.SMO',
  'params'    : ''
};

weka.classify(data, text_normolize, options, function (err, result) {
  if (err) {
    return console.error('error!!'+err);
  }
  console.log(result); //{ predicted: 'yes', prediction: '1' } 
  
});













// fs.createReadStream(req.file.path)
//     .pipe(parse({delimiter: ':'}))
//     .on('data', function(csvrow) {
//         console.log(csvrow);
//         //do something with csvrow
//         csvData.push(csvrow);        
//     })
//     .on('end',function() {
//       //do something wiht csvData
//       console.log(csvData);
//     });


// var csvData=[];
// obj.from.path('../testdata_from_train75cor.csv').to.array(function (data) {
  
//     for (var index = 0; index < data.length; index++) {

//         csvData.push(new csvData(data[index][0], data[index][1], data[index][2]));

//     }
//     console.log(csvData);
// });