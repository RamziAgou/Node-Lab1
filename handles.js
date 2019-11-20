const qs = require('querystring')
const url = require('url')

const content = '<!DOCTYPE html>' +
'<html>' +
'    <head>' +
'        <meta charset="utf-8" />' +
'        <title>Homepage</title>' +
'    </head>' + 
'    <body>' +
'         <h2>Welcome to our page, you\'ll see a link below to go to our hello page !</h2>' +
'           <p>In this page, you can write your name in the url and the page will welcome you like you deserve'+
'           <p>Click on this link => <a href="hello?name=Ramzi">hello</a></p>'
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
    serverHandle: function (req, res) {
        const route = url.parse(req.url)
        const path = route.pathname
        const params = qs.parse(route.query)



        if (path === '/') {
            res.write(content);
        } else if (path === '/hello' && 'name' in params) {
            if (params.name === 'Ramzi') {
                res.write(content2);
            } else {
                res.write('Hello ' + params.name);
            }
        } else {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.write('Error you must write a name in the url like hello/?name=YourName');
        }

        res.end();
    }
}