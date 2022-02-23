var fs = require("fs");
var jsObfuscator = require('javascript-obfuscator')

fs.readFile('./dist/bundle.js', 'UTF-8', function(error, code){
if(error){
    throw error;
}

var options = {
    ignoreRequireImports: true,
    compact: true,
    transformObjectKeys: true,
    splitStrings: true,
    unicodeEscapeSequence: true,
}
var obfuscateResult = jsObfuscator.obfuscate(code, options);

fs.writeFile('./build/gigatester_script.js',obfuscateResult.getObfuscatedCode(), function(fsError){
    if(fsError){
        return console.log(fsError);
    }
    console.log("Your obfuscated file is ready");
})
})