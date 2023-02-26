// TODO: routes call controllers and the controllers call the models
const express = require('express')
const app = express()

const userRouter = require('./routers/user')
const port = process.env.PORT || 3000 

app.use(express.json())

app.use(userRouter)
app.listen(port,()=>{
    console.log('sever is up on port '+port)
})


