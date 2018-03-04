var fs = require('fs');
var _ = require('lodash');
var colnames = fs.readFileSync('./features/col90cor.txt', 'utf8').split('\r\n');
var colnames_fake = fs.readFileSync('./features/col90cor_fake.txt', 'utf8').split('\r\n');
var feature = new Object


module.exports = {
    pair_feature: function(){
        sizeCol = _.size(colnames);
    
        for(var i=0; i<sizeCol; i++){
            feature[colnames[i]] = colnames_fake[i].replace(/[^0-9a-z]/gi, '');
        }
        return feature;
    }
}

//for TEST
function pair_feature(){
    sizeCol = _.size(colnames);
    
    for(var i = 0;i<sizeCol;i++){
        
        feature[colnames[i]] = colnames_fake[i].replace(/[^0-9a-z]/gi, '');
        console.log(feature[colnames[i]]+':'+colnames_fake[i])
    }
}
// pair_feature()

