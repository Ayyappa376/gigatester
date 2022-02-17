var fs = require("fs");
var jsObfuscator = require('javascript-obfuscator')

fs.readFile('./src/gigatester_script.js', 'UTF-8', function(error, code){
if(error){
    throw error;
}
var obfuscateResult = jsObfuscator.obfuscate(code)

fs.writeFile('./build/gigatester_script.js',obfuscateResult.getObfuscatedCode(), function(fsError){
    if(fsError){
        return console.log(fsError);
    }
    console.log("Your obfuscated file is ready");
})
})