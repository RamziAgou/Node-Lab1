const express = require("express"), app = express();
const handles = require('./handles')
path = require('path')


const metrics = require("./metrics.js");
app.use(express.static(path.join(__dirname, 'public')))

app.set('views', __dirname + "/View");
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    handles.normalPath(req, res);
});

app.get('/hello/:name', (req, res) =>{
    res.render('hello.ejs', {name: req.params.name})
    res.end();
});

app.get('/metrics.json', (req, res) => {
    metrics.get((err, data) => {
      if(err) throw err
      res.status(200).json(data)
    })
})

app.listen(8080, () => {
    console.log("Server is now listening on port 8080");
})