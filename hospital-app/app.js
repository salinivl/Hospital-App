const express = require('express')
const app = express()
const path= require('path')
const fs=require('fs')

const { clear } = require('console')
app.use(express.json());

//GET Method
app.get('/',(req,res)=>{
    fs.readFile(path.join(__dirname,'/data/data.json'),'utf-8', (err,result)=>{
        if (err){
            console.log(err);
            return
        }
        console.log(result);       
        res.send(result)
    })
    
})


//POST Method
app.post('/',(req,res)=>{ 
fs.readFile(path.join(__dirname,'/data/data.json'), 'utf8', (err, data) => {
  if (err) {
    console.error(err);
  } else {
    
    dataArray = JSON.parse(data);  
    const newdata = req.body;   
    dataArray.push(newdata) 
  
    const newData1 = JSON.stringify(dataArray);
    
    fs.writeFile(path.join(__dirname,'/data/data.json'), newData1, 'utf8', (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(newData1);
        console.log('Data appended to file successfully!');
      }
    });
  }
});

})


//PUT Method
app.put('/',(req,res)=>{   
   

fs.readFile(path.join(__dirname,'/data/data.json'), 'utf8', (err, data) => {
  if (err) {
    console.error(err);
  } else {
    
    const dataArray = JSON.parse(data);
    
    const updateData = dataArray.find((obj) => obj.id === req.body.id);
   
    updateData.name = req.body.name;
    updateData.location = req.body.location;
    updateData.patient_count=req.body.patient_count
    
    const newData = JSON.stringify(dataArray);
    
    fs.writeFile(path.join(__dirname,'/data/data.json'), newData, 'utf8', (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('Data updated in file successfully!');
      }
    });
  }
});
})


//DELETE Method
app.delete('/',(req,res)=>{  

fs.readFile(path.join(__dirname,'/data/data.json'), 'utf8', (err, data) => {
  if (err) {
    console.error(err);
  } else {
    const dataArray = JSON.parse(data);
   
    const indexToDelete = dataArray.findIndex((obj) => obj.id === req.body.id);
   
    dataArray.splice(indexToDelete, 1);
    
    const newData = JSON.stringify(dataArray);
   
    fs.writeFile(path.join(__dirname,'/data/data.json'), newData, 'utf8', (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('Item deleted from file successfully!');
      }
    });
  }
});

})



app.listen(3000,(req,res)=>{
    console.log('Server is listening to Port 3000');
    // console.log(dataorg);
    // console.log(JSON.parse(dataorg));
})
