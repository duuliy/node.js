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



//3.多异步之间的合作

var count = 0;
var results = {};
var done = function (key, value) {
    results[key] = value;
    count++;
    if (count === 3) { // 渲染面     render(results);   }
    };

    fs.readFile(template_path, "utf8", function (err, template) {
        done("template", template);
    });
    db.query(sql, function (err, data) {
        done("data", data);
    });
    l10n.get(function (err, resources) {
        done("resources", resources);
    });
}

//哨兵
var after = function (times, callback) {
    var count = 0,
        results = {};
    return function (key, value) {
        results[key] = value;
        count++;
        if (count === times) {
            callback(results);
        }
    };
};

var done = after(times, render);


//发布订阅
var emitter = new events.Emitter();
var done = after(times, render);

emitter.on("done", done);
emitter.on("done", other);

fs.readFile(template_path, "utf8", function (err, template) {
    emitter.emit("done", "template", template);
});
db.query(sql, function (err, data) {
    emitter.emit("done", "data", data);
});
l10n.get(function (err, resources) {
    emitter.emit("done", "resources", resources);
});



//组合
var proxy = new EventProxy();

proxy.all("template", "data", "resources", function (template, data, resources) { // TODO }); 

    fs.readFile(template_path, "utf8", function (err, template) {
        proxy.emit("template", template);
    });
    db.query(sql, function (err, data) {
        proxy.emit("data", data);
    });
    l10n.get(function (err, resources) {
        proxy.emit("resources", resources);
    });
})
