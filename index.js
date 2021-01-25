const express = require('express');
const cors = require("cors");
const userRouter = require('./routes/user.routes');
const taskRouter = require('./routes/task.routes');
const authRouter = require('./routes/auth.routes');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000

const app = express()

async function start() {
    try {
        await mongoose.connect(
            'mongoDbUrl',
            {
            useNewUrlParser: true,
            useFindAndModify: false
        })
        app.listen(PORT, () => {
         console.log(`server started on port ${PORT}`
        )})
    } catch (e) {
        console.log(e);
    }
}

start()

app.use(express.urlencoded({ extended: true}))
app.use(cors());
app.use(express.json())
app.use('/api', authRouter)
app.use('/api', userRouter)
app.use('/api', taskRouter)
