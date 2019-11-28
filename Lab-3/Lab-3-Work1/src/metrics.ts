import { LevelDB } from './leveldb'
import WriteStream from 'level-ws'

export class Metric {
  public timestamp: string
  public value: number

  constructor(ts: string, v: number) {
    this.timestamp = ts
    this.value = v
  }
}

export class MetricsHandler {

  private db: any

  constructor(dbPath: string) {
    this.db = LevelDB.open(dbPath);
  }

  public getAll(callback: (error: Error | null, result?: any) => void) {

    let tab : { key : string, value : string}[] = [];
    let buff = { key : "", value : ""};

    const rs = this.db.createReadStream()
      .on('data', function (data) {
        console.log(data.key, '=', data.value)
        buff = { key : data.key, value : data.value};
        tab.push(buff);
      })
      .on('error', function (err) {
        console.log('Oh my!', err)
      })
      .on('close', function () {
        console.log('Stream closed')
      })
      .on('end', function () {
        console.log('Stream ended')
        let result : {}[] = [];
        tab.forEach( (t : {key : string, value: string}) => {
          result.push(t.key + ' = '+ t.value);
        })
        callback(null, result);
      })
      
  }

  public deleteOne(key: any, callback: (error : Error | null, result?: any) => void) {

    let tab : { key : string, value : string}[] = [];
    let buff = { key : "", value : ""};
    let db = this.db;

    const rs = this.db.createReadStream()
      .on('data', function (data) {
        if(data.key === 'metric:'+key || key ==='all'){
          console.log("je trouve le metric");
          db.del(data.key);
          buff = { key : data.key, value : data.value};
          tab.push(buff);
        }
      })
      .on('error', function (err) {
        console.log('Oh my!', err)
      })
      .on('close', function () {
        console.log('Stream closed')
      })
      .on('end', function () {
        console.log('Stream ended')
        callback(null, tab);
      })    
  }

  public getOne(key: any, callback: (error: Error | null, result?: any) => void) {

    let tab : { key : string, value : string}[] = [];
    let buff = { key : "", value : ""};

    const rs = this.db.createReadStream()
      .on('data', function (data) {
        let id = data.key.split(":")[1];
        if(id === key){
          buff = { key : data.key, value : data.value};
          tab.push(buff);
        }
      })
      .on('error', function (err) {
        console.log('Oh my!', err)
      })
      .on('close', function () {
        console.log('Stream closed')
      })
      .on('end', function () {
        console.log('Stream ended')
        callback(null, tab);
      })
  }

  public save(key: number, metrics: Metric[], callback: (error: Error | null) => void) {
    const stream = WriteStream(this.db)
    stream.on('error', callback)
    stream.on('close', callback)
    metrics.forEach((m: Metric) => {
      stream.write({ key: `metric:${key}:${m.timestamp}`, value: m.value })
    })
    stream.end()
  }

}