var http = require('http'),
    request = require('request'),
    httpProxy = require('http-proxy');

var proxy = httpProxy.createProxyServer({});

var options = {
    url: 'http://localhost:5070',
    header: {
        'User-Agent': 'request'
    }
};

proxy.on('proxyReq', function(proxyReq, req, res, options) {
  proxyReq.setHeader('X-Special-Proxy-Header', 'splitter');
});

var server = http.createServer(function(req, res) {

  proxy.web(req, res, {
    target: 'http://127.0.0.1:5060'
  });
  request(options, (err, resp, body) => {
    console.log('Piped to secondary server');
  })

});

console.log("listening on port 5050")
server.listen(5050);

http.createServer((req, res) => {
    console.log("Primary Request");
    // console.log(req);
    res.writeHead(200, { 'Content-Type': 'text/plain'});
    res.write('proxied!' + '\n' + JSON.stringify(req.headers, true, 2));
    res.end(); 
}).listen(5060);

http.createServer((req, res) => {
    console.log("Secondary Request");
    // console.log(req);

    res.end(); 
}).listen(5070);

