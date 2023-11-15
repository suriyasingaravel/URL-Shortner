const express=require("express");
const { connection } = require("./db");
const { LinkModel } = require("./Model/link.model");
var app = express();
const cors=require("cors");


app.use(express.json())
app.use(cors())

app.get("/get",async(req,res)=>{
    try {
        const Data=await LinkModel.find();
        res.status(200).send(Data)
    } catch (error) {
        res.status(400).send({error})  
    }
})

app.post("/add",async(req,res)=>{
try {
    const newData=new LinkModel(req.body);
    await newData.save()
    res.status(200).send({msg:"Link Generated!"})
} catch (error) {
    res.status(400).send({error})
}
})

app.get("/:url",async(req,res)=>{
    const {url}=req.params;
        const IsPresent=await LinkModel.findOne({ShortenedUrl:url})
     
        if(IsPresent){
            if(IsPresent.createdAt>Date()){
  
                res.status(200).redirect(IsPresent.RedirectedUrl);
            }else{
        
                res.status(200).send( `<img style="margin: auto;text-align: center;display: block;width:60%" src="https://cms.jotform.com/uploads/answers/answer/ejzinnecker/2768610_Unauthorized%20Access%202020-12-15%2015-40-02.png" style="margin: auto;" alt=""></img>`  )
            }
   
        }else{
            res.status(200).send(`<img src="https://i.gifer.com/7iJR.gif" style="margin: auto;text-align: center;display: block;width:100%" alt=""></img>`)
        }
   
})

app.listen(8000,async()=>{
    try {
        await connection;
        console.log("DB is connected")
        console.log("Server is running at PORT-8000")
    } catch (error) {
        console.log(error)
    }
})