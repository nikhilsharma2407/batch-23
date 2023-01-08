const express = require('express');
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path")

dotenv.config();
const port = process.env.PORT || 5000;

const cookieParser = require("cookie-parser");
const router = require("./routes/router");
const userRouter = require("./routes/userRouter");

const errorController = require("./controllers/errorController")

const dbConnection = require("./dbConnection");
// const adminRouter = require("./routes/adminRouter");

// enabled for all incoming requests;

app.use(cors({
    origin: "http://localhost:3000",
    credentials:true
}))
app.use(express.json());
app.use(cookieParser());

app.use("/",express.static("./build/"));
// use router only for path "/route"
app.use('/route', router);
// app.use('/user',userRouter);
// app.use('/admin',adminRouter);

app.use('/user', userRouter);

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"./build/index.html"));
});
app.use(errorController);

// Middlewares;
// app.post('/api', (req, res) => {
//     console.log(req.path, req.method);
//     console.log("request body data", req.body);
//     res.status(200);
//     res.send({ success: true, message: "server data" });
// })


app.listen(port, () => {
    console.clear();
    console.log(`server started on port ${port}!`)
})