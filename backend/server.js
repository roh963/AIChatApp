import http from "http"
import app from "./app.js"
import { PORT } from "./const.js"

const port = PORT || 3000

const server = http.createServer(app)

server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
