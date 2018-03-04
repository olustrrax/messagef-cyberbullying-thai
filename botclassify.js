var twit = require('twit');
var fs = require('fs');
var config = require('./config/config.js');
var textN = require('./text_normalization.js');
var connect = require('./connectdb.js');
var Twitter = new twit(config);
var comparefeature = require('./comparefeature.js');
var feature_train = comparefeature.pair_feature();
var callweka = require('./callweka.js');
var number = fs.readFileSync('./testData/last_message_id.txt', 'utf8').split('\n');
var tweet = function() {
  var params = {
    q: randomTrack(),
    // count: 1,since: '2017-11-11',
    result_type: 'recent',
    lang: 'th'    
  } 
  Twitter.get('search/tweets', params, function(err, data) {
    if(err) {
      console.log('Something went wrong while SEARCHING...'+err);
    }
    else{              
      var tweet = data.statuses;
      var tweet = ranDom(tweet);
      if(typeof tweet != 'undefined'){
        var name = tweet.user['screen_name'];
        var time = tweet.created_at;
        var id_str = tweet.id_str;
        var text = tweet.text;
        var fileArff = textN.normalization(text,feature_train);
        // console.log(fileArff);
        callweka.classification(fileArff, function(predict){
          predict = predict.replace('\r\n','')
          var inserts = {screen_name:name,id:id_str,text:text,time_tweet:time,prediction:predict};
          // console.log(inserts)
          connect.insertMessage(inserts);
        })
        
        number = parseInt(number) + 1;
        fs.writeFile("./testData/last_message_id.txt", number, function(err) {
          if(err) {
              return console.log(err);
          }
        });
      }
      else{
        console.log('TWEET ERROR');
      }
    }
        
  });
}

tweet();
setInterval(tweet, 9000);

// function to generate a random tweet tweet
function ranDom (arr) {
  var index = Math.floor(Math.random()*arr.length);
  return arr[index];
};

function randomTrack (data){
  var list = fs.readFileSync('./features/tracklists.txt', 'utf8').split('\n');
  var key = ranDom(list);
  console.log('---------');
  console.log('keyword: '+key);
  return key;
};

