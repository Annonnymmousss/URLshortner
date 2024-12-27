const express = require("express")
const urlRoute = require("./routes/url")
const URL = require("./models/url")
const { connectToMonoDB } = require("./connect")
const { timeStamp } = require("console")

const app = express()
const PORT = 8000


connectToMonoDB("mongodb://localhost:27017/short-url")
.then(()=>console.log("mongo connected"))
app.use(express.json())
app.use('/url',urlRoute)

app.get("/:shortId",async(req,res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndReplace({
        shortId,
    },
    {
        $push:{
            visitHistory: {
                timeStamp: Date.now()
            }
        }
    });
    res.redirect(entry.redirectURL)
})
app.listen(PORT , ()=> console.log("server started"))