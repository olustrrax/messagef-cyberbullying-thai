var twit = require('twit');
var fs = require('fs');
var config = require('./config.js');
var wordseg = require('./wsegmentation.js');
var connect = require('./connectdb.js');
var Twitter = new twit(config);
var comparefeature = require('./comparefeature.js');
var fakeFeature = comparefeature.feature_fakereal();
//แล้วค่อยเอา fakeFeature ไปใช้เทียบ feature ตอนที่ message เข้ามาเพื่อทำนาย


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
        console.log('Name: '+name+'\n'+'Text: '+text);
        var inserts = {screen_name:name,id:id_str,text:text,time_tweet:time};
        wordseg.segmentation(text);
        // connect.insertMessage(inserts);
       
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
  var list = fs.readFileSync('tracklists.txt', 'utf8').split('\n');
  var key = ranDom(list);
  console.log('---------');
  console.log('keyword: '+key);
  return key;
};

