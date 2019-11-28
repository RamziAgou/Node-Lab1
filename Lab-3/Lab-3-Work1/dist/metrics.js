"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var leveldb_1 = require("./leveldb");
var level_ws_1 = __importDefault(require("level-ws"));
var Metric = /** @class */ (function () {
    function Metric(ts, v) {
        this.timestamp = ts;
        this.value = v;
    }
    return Metric;
}());
exports.Metric = Metric;
var MetricsHandler = /** @class */ (function () {
    function MetricsHandler(dbPath) {
        this.db = leveldb_1.LevelDB.open(dbPath);
    }
    MetricsHandler.prototype.getAll = function (callback) {
        var tab = [];
        var buff = { key: "", value: "" };
        var rs = this.db.createReadStream()
            .on('data', function (data) {
            console.log(data.key, '=', data.value);
            buff = { key: data.key, value: data.value };
            tab.push(buff);
        })
            .on('error', function (err) {
            console.log('Oh my!', err);
        })
            .on('close', function () {
            console.log('Stream closed');
        })
            .on('end', function () {
            console.log('Stream ended');
            var result = [];
            tab.forEach(function (t) {
                result.push(t.key + ' = ' + t.value);
            });
            callback(null, result);
        });
    };
    MetricsHandler.prototype.deleteOne = function (key, callback) {
        var tab = [];
        var buff = { key: "", value: "" };
        var db = this.db;
        var rs = this.db.createReadStream()
            .on('data', function (data) {
            if (data.key === 'metric:' + key || key === 'all') {
                db.del(data.key);
                buff = { key: data.key, value: data.value };
                tab.push(buff);
            }
        })
            .on('error', function (err) {
            console.log('Oh my!', err);
        })
            .on('close', function () {
            console.log('Stream closed');
        })
            .on('end', function () {
            console.log('Stream ended');
            callback(null, tab);
        });
    };
    MetricsHandler.prototype.getOne = function (key, callback) {
        var tab = [];
        var buff = { key: "", value: "" };
        var rs = this.db.createReadStream()
            .on('data', function (data) {
            var id = data.key.split(":")[1];
            if (id === key) {
                buff = { key: data.key, value: data.value };
                tab.push(buff);
            }
        })
            .on('error', function (err) {
            console.log('Oh my!', err);
        })
            .on('close', function () {
            console.log('Stream closed');
        })
            .on('end', function () {
            console.log('Stream ended');
            callback(null, tab);
        });
    };
    MetricsHandler.prototype.save = function (key, metrics, callback) {
        var stream = level_ws_1.default(this.db);
        stream.on('error', callback);
        stream.on('close', callback);
        metrics.forEach(function (m) {
            stream.write({ key: "metric:" + key + ":" + m.timestamp, value: m.value });
        });
        stream.end();
    };
    return MetricsHandler;
}());
exports.MetricsHandler = MetricsHandler;
