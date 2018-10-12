//1. events 
var events = require('events');

function Stream() {
    events.EventEmitter.call(this);
}
util.inherits(Stream, events.EventEmitter);

//2.利用消息队列解决雪崩问题

var select = function (callback) {
    db.select("SQL", function (results) {
        callback(results);
    });
};

//加上状态锁
var status = "ready";
var select = function (callback) {
    if (status === "ready") {
        status = "pending";
        db.select("SQL", function (results) {
            status = "ready";
            callback(results);
        });
    }
};

//once()执行一次
var proxy = new events.EventEmitter();
var status = "ready";
var select = function (callback) {
    proxy.once("selected", callback);
    if (status === "ready") {
        status = "pending";
        db.select("SQL", function (results) {
            proxy.emit("selected", results);
            status = "ready";
        });
    }
};