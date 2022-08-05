let fsJson = require('fs');

module.exports = function(fileJason) {
    this.contenuFile = fsJson.readFileSync(fileJason, "UTF-8");
    this.contenuJson = JSON.stringify(this.contenuFile);
    this.arrayJson = function () {
        return JSON.parse(JSON.parse(this.contenuJson));
    }
}
