import express from 'express'
import mongoose from 'mongoose'
import wifiName from 'wifi-name'
import User from './models/user.js'
// import Blog from './models/blog.js'
const app=express()
mongoose.connect("mongodb://localhost/egide-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Data base connect!")
})
app.use(express.json())
app.get('/wifiname', function(req,res){
    wifiName().then(name=>{
        console.log(name)
        res.json(`your current wifi is: ${name}`)
    })
})
app.post('/blog',function (req,res){
    const title=req.body.title;
    const body=req.body.body;
    const cotagory=req.body.category;

})
// Blog.create({title,body,category}).then((b)=>{
//     console.log(b)
//     res.status(200).json({message:'blog created'})
// }).catch((err)=>{
//     console.log(err)
//     res.status(500).json({message:'posting failed!'})
// })

app.post('/user',function(req,res){
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    
    User.create({email, name, password}).then((user) => {
        console.log(user)

        res.json({message: 'user created!'})
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ message: "failed to create user"});
    })

})

app.get('/user', function(req,res){
    User.find().then((u)=>{
        res.status(200).json({ message:"users found!", users: u})

    }).catch((err)=>{
        console.log(err)
        res.status(500).json({message:"Failed to find user!"})
    })
})
app.get('/user', function(req,res){
    User.findOneAndDelete({ _id: req.params.userId }).then((us)=>{
        res.status(200).json({message:"user deleted!"})
    }).catch((err)=>{
        console.log(err)
        res.status(500).json({message:"deletion failed"})
    })
})
app.get('/user',function(req,res){
    User.findOneAndUpdate({ _id: req.params.userId }).then((up)=>{
        console/log(up)
        res.status(200).json({message:"user updated!"})
    }).catch((err)=>{
        console.log(err)
        res.status(500).json({message:"failed to update"})
    })
})


app.listen(4001, console.log('sever is running man') )