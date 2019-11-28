import express = require('express')
import { MetricsHandler } from './metrics'
import path = require('path')
import encoding from 'encoding-down'
import leveldown from 'leveldown'
import levelup from 'levelup'
import bodyparser from 'body-parser'


const app = express()
app.set('views', __dirname + "/View");
app.set('view engine', 'ejs');

app.use(bodyparser.json())
app.use(bodyparser.urlencoded()) 
app.use(express.static(path.join( __dirname, 'public')))


const port: string = process.env.PORT || '8080'
const dbMet: MetricsHandler = new MetricsHandler('./db/metrics')
const db = levelup(encoding(
  leveldown("path"),  
  { valueEncoding: 'json' })
)



app.post('/metrics/:id', (req: any, res: any) => {
  dbMet.save(req.params.id, req.body, (err: Error | null) => {
    if (err) throw err
    res.status(200).send("Done")
  })
})

app.get('/metrics/:id', (req: any, res: any) => {
  dbMet.getOne(req.params.id, (err: Error | null, result?: any) => {
    if (err) {
      throw err
    }
    res.json(result);
    res.end();
  })
})

app.get('/metrics/delete/:key', (req: any, res: any) => {
  
  dbMet.deleteOne(req.params.key, (err: Error | null, result?: any) => {
    if (err) {
      throw err
    }
    res.json(result);
    res.end();
  })
})

app.get('/metrics', (req: any, res: any) => {
  dbMet.getAll((err: Error | null, result?: any) => {
    if (err) {
      throw err
    }
    res.json(result)
    res.end();
  })
  
})

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
  dbMet.getAll((err: Error | null, result?: any) => {
    if (err) {
      throw err
    }
    res.json(result)
    res.end();
  })
})

app.listen(port, (err: Error) => {
  if (err) {
    throw err
  }
  console.log(`server is listening on port ${port}`)
})