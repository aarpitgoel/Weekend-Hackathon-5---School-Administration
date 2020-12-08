const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
app.use(express.urlencoded());


// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const data=require('./InitialData.js');
// your code goes here
let count=data.length+1;

app.get('/api/student',(req,res)=>{
    res.send(data);
 });

 app.get('/api/student/:id',(req,res)=>{
    const id=req.params.id;
    const student=data.find((stu)=>stu.id===parseInt(id));
    
    if(student){
        res.status(200).send(student);
    }else{
        res.status(404).send('id is invalid');
    }
});

app.post('/api/student',(req,res)=>{
    res.set({'Content-type': 'application/json'});
        
    if(req.body.name && req.body.currentClass && req.body.division){
            const student={id:count++,name:req.body.name, currentClass:Number(req.body.currentClass), division:req.body.division};
            data.push(student);
            res.send({id:parseInt(student.id)});
            return
        }else{
            res.status(400).send("invalid request");
            return
        }
        
    });
    
    app.put('/api/student/:id',(req,res)=>{
        const id=parseInt(req.params.id);
        
        const studentIndex=data.findIndex((stu)=>stu.id===id);
    
        
        if(studentIndex!==-1 && (req.body.name||req.body.currentClass ||req.body.division)){
        res.set({'Content-Type': 'application/x-www-form-urlencoded'});
            if(req.body.name){
                data[studentIndex].name=req.body.name;
            }
    
            if(req.body.currentClass){
                data[studentIndex].currentClass=Number(req.body.currentClass);
            }
    
            if(req.body.division){
                data[studentIndex].division=req.body.division;
            }
    
            res.status(200).send(data[studentIndex]);
        }else{
            res.status(400).send("invalid request");
        }
    
    });
    
    app.delete('/api/student/:id',(req,res)=>{
        const id=parseInt(req.params.id);
    
        const studentIndex=data.findIndex((stu)=>stu.id===id);
    
        if(studentIndex!==-1){
            data.splice(studentIndex,1);
            res.status(200).send({id});
        }else{
            res.status(404).send('id not found');
        }
    });
    

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;      
