var wordcut = require("wordcut");
var fs = require('fs');
wordcut.init();
// var number = fs.readFileSync('./wordseg/last_message_id.txt', 'utf8').split('\n');  

module.exports = {

    
    segmentation: function(text){
        text = " เป็นคนที่เรียน PC แล้วอิจฉาคอร์สสดตรงประโยคที่ว่า เออเลี้ยงอยู่แล้ว อยากกินไรก็บอก มากๆๆ 5555555 #angkriz"
        text = text.replace(/[&\/\\#,+()$~%.'":*?<>_!{}]/g,' ');
        text = text.replace(/\s/g, '');
        
        // var s = wordcut.cut(text);
        // var words = s.split('|');

        

        // var wordsMap = createWordMap (words);
        // var fileName = 'message'+number[0]+'.txt';
        
        console.log(colnames);



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


// fs.writeFile('./wordseg/'+fileName,wordsMap,'utf8', (err) => {
        //     if (err) throw err;
        //     console.log('my.csv saved.');
        // });