const express = require("express"), app = express();
const handles = require('./handles')

const metrics = require("./metrics.js");
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    handles.normalPath(req, res);
});

app.get('/hello/:name', (req, res) =>{
    handles.helloPath(req, res);
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