import express = require('express')
import { MetricsHandler } from './metrics'
import path = require('path')

const ejsLint = require('ejs-lint');
const app = express()
const port: string = process.env.PORT || '8080'

app.use(express.static(path.join( __dirname, 'public')))

app.set('views', __dirname + "/View");
app.set('view engine', 'ejs');


app.get('/', (req: any, res: any) => {
  res.render("home.ejs");
})

app.get('/hello/:name', (req, res) => {
  res.render('hello.ejs', {name: req.params.name})
})

app.get('/hello', (req, res) => {
  res.render('hello.ejs', {name: "anonymous"})
})

app.get('/metrics.json', (req: any, res: any) => {
  MetricsHandler.get((err: Error | null, result?: any) => {
    if (err) {
      throw err
    }
    res.json(result)
  })
  res.end();
})

app.listen(port, (err: Error) => {
  if (err) {
    throw err
  }
  console.log(`server is listening on port ${port}`)
})