const express=require('express');
const app= express();
const mongoose=require('mongoose');
const ejs=require('ejs');
const bodyParser=require('body-parser');
const multer=require('multer');
const { profileEnd } = require('console');
var email="";
mongoose.connect('mongodb://localhost:27017/Collab-mate',{useNewUrlParser:true,useUnifiedTopology:true});
const User_profileSchema=({
    // username:String,
    // Techstack:String,
    // Speciality:String,
    // Community:String,
    // Contribution:String,

    username:String,
    email:String,
    Bio:String,
    Roles:String,
    skills:String,
    github:String,
    linkedin:String,
    rewards:Number,
    connection:[String],



})
// const User_profileSchema=
const User_projectSchema=({
    username:String,
    Project_name:String,
    Project_description:String,
    Project_link:String,
    techstack:String,
    contribution:String,
})
const pending_invitation=({
    username:String,
    connection:String,
})
const Profile=mongoose.model('Profile',User_profileSchema);
const Project=mongoose.model('Project',User_projectSchema);
const Pending=mongoose.model('Pending',pending_invitation);



app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.render('Home');
})
app.get('/see',(req,res)=>{
    res.render('projectsubmit');
})
app.post('/details',(req,res)=>{
    var _id=req.body.id;
    Project.findById({_id:_id},(er,data)=>{
console.log(data);
        res.render('page',{data:data});
    })


})
app.get("/project",(req,res)=>{
    Project.find({},(er,data)=>{
      res.render('project',{data:data})
    })
})
app.get('/profile',(req,res)=>{
    res.render('profile');

})
app.get('/contri',(req,res)=>{
  Project.find({},(er,data)=>{
      res.render('contribute',{data:data});
  })
})
app.get('/find',(req,res)=>{
    Profile.find({},(er,data)=>{
        res.render('patner',{data:data});
    })

})
app.post('/submit',(req,res)=>{
    const profile=new Profile({
        username:req.body.username,
        email:req.body.email,
        Bio:req.body.bio,
        // Roles:req.body.Skills,
        skills:req.body.Skills,

        github:req.body.github,
        linkedin:req.body.linkdin,
        connection:req.body.connection,
        rewards:0,
    })
    profile.save();
    res.redirect('/profile');
})

app.get('/community',(req,res)=>{
    res.render('community');
})

app.post('/user_profile',(req,res)=>{
    email=req.body.Username;
    var obj=new Profile({
        username:req.body.Username,
        Techstack:req.body.Techstack,
        Speciality:req.body.Speciality,
        Community:req.body.Community,
    })
    obj.save();
    res.redirect('/');
})
// app.post('/send',(req,res)=>{
//     var username=req.body.id;
//     var obj=new Pending({
//         username:username,
//         connection:req.body.connection,
//     })
//     obj.save();
//     res.redirect('/');

// })
app.get('/project',(req,res)=>{
    res.render('project');
})
app.post('/add',(req,res)=>{
    // console.log("hhheheh")
    console.log(req.body.pame)
    console.log(req.body.piscription)
    console.log(req.body.contribution)
    var obj=new Project({
        username:email,
        Project_name:req.body.pame,
        Project_description:req.body.piscription,
        // Project_link:req.body.Project_link,
        contribution:req.body.contribution,
        techstack:req.body.techstack,
    })
    obj.save();
    res.redirect('/');
})
app.get('/friends',(req,res)=>{
  Profile.find({},(er,data)=>{
        res.render('friends',{data:data});
  })

})
app.post('/send',(req,res)=>{
 var _id=req.body.id;
 console.log(email);
 Profile.findOneAndUpdate({_id:_id},{$push:{connection:email}},(er,data)=>{
    console.log(data)
 })

})
app.get('/leader',(req,res)=>{
  res.render('leader')
})
app.listen('80',(req,res)=>{
 console.log("collabmate has started at 80")
})
