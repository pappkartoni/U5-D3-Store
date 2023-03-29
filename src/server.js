import Express from "express"
import cors from "cors"
import {pgConnect} from "./db.js"
import productsRouter from "./products/index.js"
import { badRequestErrorHandler, genericErrorHandler, notFoundErrorHandler } from "./errors.js"

const server = Express()
const port = process.env.PORT || 3420

server.use(cors())
server.use(Express.json())
server.use("/products", productsRouter)
server.use(badRequestErrorHandler)
server.use(notFoundErrorHandler)
server.use(genericErrorHandler)

await pgConnect()

server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})