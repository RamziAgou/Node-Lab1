const express = require("express"), app = express();

const content = '<!DOCTYPE html>' +
'<html>' +
'    <head>' +
'        <meta charset="utf-8" />' +
'        <title>Homepage</title>' +
'    </head>' + 
'    <body>' +
'         <h2>Welcome to our page, you\'ll see a link below to go to our hello page !</h2>' +
'           <p>In this page, you can write your name in the url and the page will welcome you like you deserve'+
'           <p>Click on this link => <a href="hello/Ramzi">hello</a></p>'
'    </body>' +
'</html>'

const content2 = '<html>' +
'    <head>' +
'        <meta charset="utf-8" />' +
'        <title>Ramzi\'s page</title>' +
'    </head>' + 
'    <body>' +
'         <h2>Welcome to our page, you\'ll see a link below to go to our hello page !</h2>' +
'           <p>It\'s my page and I have nothing to say, I\'m a man, and that\'s it. Just write an other name please</p>'+
'    </body>' +
'</html>'

module.exports = {
    normalPath: (req, res) => {
            res.send(content);
            res.end();
    },

    helloPath : (req, res) => {
        if(req.params.name === 'Ramzi'){
            res.send(content2);
            res.end();
        }
        else{
            res.end('Hello '+req.params.name);
        }
    }
}