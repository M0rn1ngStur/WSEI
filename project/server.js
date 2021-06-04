var fs = require("fs");
// var qs = require("querystring")
var http = require("http");

var server = http.createServer(function (req, res) {
    console.log(req.url)
    switch (req.method) {
        case "GET":
            if (req.url == "/") {
                fs.readFile("static/index.html", function (error, data) {
                    if (error) {
                        res.writeHead(404, { 'Content-Type': 'text/html' });
                        res.write("<h1>błąd 404 - nie ma pliku!<h1>");
                        res.end();
                    }

                    else {
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.write(data);
                        res.end();
                    }
                });
            }
            if (req.url.indexOf(".js") != -1) {
                fs.readFile(__dirname + "/static" + decodeURI(req.url), function (error, data) {
                    res.writeHead(200, { "Content-type": "application/javascript" });
                    res.write(data);
                    res.end();
                })
            }
            if (req.url.indexOf(".css") != -1) {
                fs.readFile(__dirname + "/static" + decodeURI(req.url), function (error, data) {
                    res.writeHead(200, { "Content-type": "text/css" });
                    res.write(data);
                    res.end();
                })
            }
            if (req.url.indexOf(".png") != -1) {
                fs.readFile(__dirname + "/static" + decodeURI(req.url), function (error, data) {
                    res.writeHead(200, { "Content-type": "image/png" });
                    res.write(data);
                    res.end();
                })
            }
            if (req.url.indexOf(".jpg") != -1 || req.url.indexOf(".jpeg") != -1) {
                fs.readFile(__dirname + "/static" + decodeURI(req.url), function (error, data) {
                    res.writeHead(200, { "Content-type": "image/jpeg" });
                    res.write(data);
                    res.end();
                })
            }
            if (req.url.indexOf(".mp3") != -1) {
                fs.readFile(__dirname + "/static" + decodeURI(req.url), function (error, data) {
                    res.writeHead(200, { "Content-type": "audio/mpeg" });
                    res.write(data);
                    res.end(__dirname + "/static" + decodeURI(req.url));
                })
            }
            if (req.url.indexOf(".txt") != -1) {
                fs.readFile(__dirname + "/static" + decodeURI(req.url), function (error, data) {
                    res.writeHead(200, { "Content-type": "text/plain" });
                    res.write(data);
                    res.end(__dirname + "/static" + decodeURI(req.url));
                })
            }

            // załaduj pliki html, js, css, jpg, png etc;
            break;
        case "POST":
            if (req.url != "/inspiration") {
                var url = req.url
                if (url == "/") {
                    url = "/about";
                }
                fs.readdir(__dirname + "/static/photos" + url, function (err, imgs) {
                    if (err) {
                        return console.log(err);
                    }
                    var imgArr = []
                    imgs.forEach(function (imgName) {
                        imgArr.push(imgName);
                    });
                    fs.readFile(__dirname + "/static/strings/" + url + ".txt", "utf8", function (err, file) {
                        if (err) {
                            return console.log(err);
                        }
                        res.end(JSON.stringify({ imgs: imgArr, text: file }));
                    })
                });
            } else {
                res.end("KONIEC")
            }
            break;
        default: break;
    }
})

server.listen(3000, function () {
    console.log("serwer startuje na porcie 3000")
});