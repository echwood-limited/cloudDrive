const http = require('http')
const server =  http.createServer()


server.listen(10000, () => {
    console.log("server running @ 10000")
})