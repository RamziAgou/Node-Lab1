"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var metrics_1 = require("./metrics");
var path = require("path");
var encoding_down_1 = __importDefault(require("encoding-down"));
var leveldown_1 = __importDefault(require("leveldown"));
var levelup_1 = __importDefault(require("levelup"));
var body_parser_1 = __importDefault(require("body-parser"));
var app = express();
app.set('views', __dirname + "/View");
app.set('view engine', 'ejs');
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));
var port = process.env.PORT || '8080';
var dbMet = new metrics_1.MetricsHandler('./db/metrics');
var db = levelup_1.default(encoding_down_1.default(leveldown_1.default("path"), { valueEncoding: 'json' }));
app.post('/metrics/:id', function (req, res) {
    dbMet.save(req.params.id, req.body, function (err) {
        if (err)
            throw err;
        res.status(200).send("Done");
    });
});
app.get('/metrics/:id', function (req, res) {
    dbMet.getOne(req.params.id, function (err, result) {
        if (err) {
            throw err;
        }
        res.json(result);
        res.end();
    });
});
app.get('/metrics/delete/:key', function (req, res) {
    dbMet.deleteOne(req.params.key, function (err, result) {
        if (err) {
            throw err;
        }
        res.json(result);
        res.end();
    });
});
app.get('/metrics', function (req, res) {
    dbMet.getAll(function (err, result) {
        if (err) {
            throw err;
        }
        res.json(result);
        res.end();
    });
});
app.get('/', function (req, res) {
    res.render("home.ejs");
});
app.get('/hello/:name', function (req, res) {
    res.render('hello.ejs', { name: req.params.name });
});
app.get('/hello', function (req, res) {
    res.render('hello.ejs', { name: "anonymous" });
});
app.get('/metrics.json', function (req, res) {
    dbMet.getAll(function (err, result) {
        if (err) {
            throw err;
        }
        res.json(result);
        res.end();
    });
});
app.listen(port, function (err) {
    if (err) {
        throw err;
    }
    console.log("server is listening on port " + port);
});
