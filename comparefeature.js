var fs = require('fs');
var _ = require('lodash');
var colnames = fs.readFileSync('./colnames1244.txt', 'utf8').split('\n');
var colnames_fake = fs.readFileSync('./colnames1244_fake.txt', 'utf8').split('\n');
var colname_before_fs = fs.readFileSync('./colname.txt', 'utf8').split('\n');
var sizeFullFeature = _.size(colname_before_fs);
var fullFeature = new Object
var feature = new Object


module.exports = {
    pair_feature: function(){
        sizeCol = _.size(colnames);
    
        for(var i=0; i<sizeCol; i++){
            feature[colnames[i].replace('\r','')] = colnames_fake[i].replace('\r','');
        }
        return feature;
    }
}

//for TEST
function pair_feature(){
    sizeCol = _.size(colnames);
    
    for(var i=0; i<sizeCol; i++){
        feature[colnames[i].replace('\r','')] = colnames_fake[i].replace('\r','');
    }
}

// function feature_fakereal(){
    
//     var features = new Object
//     sizeCol = _.size(colnames);
        
//     for(var i=0;i< sizeFullFeature; i++){
//         for(var j=0; j<sizeCol;j++){
//             if(_.keys(colnames)[j] == _.keys(fullFeature)[i]){
//                 features[_.keys(colnames)[j]] = _.values(fullFeature);
//             }
//         }
//     }
//     console.log(features)
// }



// function createFullFeature(){
//     for (var i=1; i<= sizeFullFeature; i++){
//         fullFeature[colname_before_fs[i-1].replace('\r','')] = "a"+i;
//     }
    
// }