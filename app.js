'use strict'

var http = require('http')
var url = require('url')
var fs = require('fs')
var path = require('path')
var baseDirectory = __dirname + '/dist'
var port = 8080

http.createServer(function(req, res) {
  var requestUrl = url.parse(req.url)
  var fsPath = baseDirectory+path.normalize(requestUrl.pathname)
  var fileStream = fs.createReadStream(fsPath)

  try {
    res.writeHead(200)
    fileStream.pipe(res)

    fileStream.on('error',function(e) {
      res.writeHead(404)
      res.end()
    })
  } catch(e) {
    res.writeHead(500)
    res.end()
    console.log(e.stack)
  }
}).listen(port)

console.log('Listening on port: ' + port)
