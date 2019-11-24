const express = require("express"), app = express();
path = require('path')

const metrics = require("./metrics.js");
app.use(express.static(path.join(__dirname, 'public')))
 
app.set('port', 3030);
app.set('views', __dirname + "/View");
app.set('view engine', 'ejs');
  
app.get('/', (req, res) => {
    res.end("Hello anonymous");
})

app.get('/hello/:name', (req, res) => {
    res.render('hello.ejs', {name: req.params.name})
    res.end("yes");
})

app.get('/metrics.json', (req, res) => {
    metrics.get((err, data) => {
      if(err) throw err
      res.status(200).json(data)
    })
})

app.listen(app.get('port'), () => {
    console.log(`the server is now listening on ${app.get('port')}`);
})