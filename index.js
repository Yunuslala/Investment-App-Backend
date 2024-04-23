const express=require('express');
const { connection } = require('./config/db');
const {UserRouter}=require("./routers/User.Router");
const errorMiddleware=require("./middlewares/Error");
const app=express();
const cors=require("cors");
const { CategoryRouter } = require('./routers/Category.Router');
const { InvestmentOptionsRouter } = require('./routers/Investment.Router');
const { MessageRouter } = require('./routers/Message.Router');
const { portfollioRouter } = require('./routers/Portfollio.Router');
const { TicketRouter } = require('./routers/Ticket.Router');
const { PayoutDetailsRouter } = require('./routers/User.PayoutDetails.Router');
const { PayoutOptionsRouter } = require('./routers/User.PayoutOptions');
const { FaqRouter } = require('./routers/Faq.Router');
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`)
    console.log("shutting down server due to Uncaught Exception");
    process.exit(1);
})
// app.use(express.static('public'));

app.use(express.json());
app.use(cors());
app.use('/api/v1',UserRouter);
app.use('/api/v1',CategoryRouter);
app.use('/api/v1',InvestmentOptionsRouter);
app.use('/api/v1',MessageRouter);
app.use('/api/v1',portfollioRouter);
app.use('/api/v1',TicketRouter);
app.use('/api/v1',PayoutDetailsRouter);
app.use('/api/v1',PayoutOptionsRouter);
app.use('/api/v1',FaqRouter);


app.use(errorMiddleware)
const server=app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("db is connected")
    } catch (error) {
        console.log("db is not connected",error)
    }
    console.log(`http://localhost:${process.env.port}`)
})

process.on('unhandledRejection',(err)=>{
    console.log(`Error: ${err.message}`)
    console.log("shutting down server due to unhandled promise rejection")

    server.close(()=>{
        process.exit(1)
    })
})