var wordcut = require("wordcut");
var fs = require('fs');
var _ = require('lodash');
var Arff = require('arff-utils')

wordcut.init();

var number = fs.readFileSync('./testData/last_message_id.txt', 'utf8').split('\n');  

module.exports = {

    
    normalization: function(text, feature_train){
      var sizeFeature = _.size(feature_train)
      //WORD SEGMENTATION
      text = text.replace(/[&\/\\#,+()$~%.'":*?<>_!{}]/g,' ');
      text = text.replace(/\s/g, '');
      var s = wordcut.cut(text);
      var words = s.split('|');
      //WORD EXTRACTION
      var wordsMap = createWordMap (words);
      //DETERMINE FEATURE FROM TWITTER EQUAL TO FEATURE FROM TRAIN DATA
      var text_normolize = compare(wordsMap,feature_train, sizeFeature);

      //SAVE FILE TO .ARFF
      var number = fs.readFileSync('./testData/last_message_id.txt', 'utf8').split('\n');
      var file = 'message'+number[0];
      var fileName = file+'.arff';
      var arff = new Arff.ArffWriter(file, Arff.MODE_OBJECT)
      
      for (var i = 0; i< sizeFeature ; i++){
        var key = _.keys(text_normolize)[i]
        arff.addNumericAttribute(key)
      }
      arff.addNominalAttribute("class",["negative","positive"])
      arff.addData(text_normolize)
      // arff.writeToStream(process.stdout);
      arff.writeToFile('./testData/'+fileName, function (err) {
          if(err) throws;
      });
      
      // console.log('SUCCESS from text nomalize')
      return fileName;
    }
} 


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

function compare(words,allFeature, sizeFeature){
  
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