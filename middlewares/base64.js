const base64 = require('base-64');
const utf8 = require('utf8');

module.exports = {
encoded:    function(data){
    let text = data;
    let bytes = utf8.encode(text);
    let encoded = base64.encode(bytes);
    return encoded
},

decoded: function(data){
    let encoded = data;
    let bytes = base64.decode(encoded);
    let text = utf8.decode(bytes);
    return text
}

}