const YAML = require('yaml')
const fs = require('fs')
const path = require('path')
const http = require('http');

const startApiServer = (data: any) => {
  const info = YAML.parse(data)

  var app = http.createServer((req: any, res: any) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.end(JSON.stringify(info, null, 2));
  });

  app.on('error', function (error: any) {
    console.error(error);
  });
  
  app.listen(3003);

  console.log('API server listening on port: 3003')
}

fs.readFile(path.resolve(__dirname, './data.yaml'), 'utf8' , (err: any, data: any) => {
  if (err) {
    console.error(err)
    return
  }

  startApiServer(data);
})