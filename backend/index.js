const express=require("express");
const app=express();
const port=5000;
const mongoDB=require("./db");
const cors=require("cors")

app.use(cors());


app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})


app.use(express.json());
mongoDB();

app.get("/",(req,res)=>{
   res.redirect("home")
});

app.use("/api",require("../backend/Routes/CreateUser.js"));
app.use("/api",require("../backend/Routes/DisplayData"));
app.use("/api",require("../backend/Routes/OrderData"));

app.listen(port,()=>{
    console.log(`APP started on port ${port}`);
}) 