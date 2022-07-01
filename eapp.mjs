/////'use strict';

import express from 'express'
import { inspect } from 'util'
import os from 'os'
import process from 'node:process'

// Constants
const PORT = 1111;
const HOST = '0.0.0.0';

process.on('SIGINT', (p) => {
  console.log('signal',p);
  process.exit(2)
});

// App
const app = express();
app.use('/', (req, res) => {
    //console.log(req.socket.server.close())
    let n=parseInt(req.query.n)
    let o=n
    for(;--n>0;){
        Math.atan(n) * Math.tan(n) + Math.hypot(n, Math.sqrt(n))
    }
    res.send(
        req.socket.remoteAddress+' '+o+' '+os.hostname()
        +(req.query.h?`\n`+JSON.stringify(req.headers,null,4)+`\n`:'')
    );
//    res.send('asdasd')
    req.query.a == 'close' && req.socket.server.close()
});

app.listen(PORT, HOST,function(){console.log(arguments)});
console.log(`Running on http://${HOST}:${PORT}`);
