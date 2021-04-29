//npm init vytvoris package.json
//npm install express --save nainstalujes expres kniznicu
//node index.js spustis server
//ctrl+c vypnes server
//npm install nodemon --save 
//spusta sa takto teraz a po zmene nemusis restartovat nodemon index.js
//npm install mongodb --save
//npx nodemon index.js

const express = require('express');
const mongodb = require('mongodb');

const connectionURL = 'mongodb://localhost:27017';
const databaseName = 'Reminder';

const app = express()
const MongoClient = mongodb.MongoClient;

app.use(
    express.urlencoded({
      extended: true
    })
  )
  
  app.use(express.json())

app.get('', (req,res)=>{
    res.send('Hello I am your NODEJS server')
})

app.get('/about', (req,res)=>{
    res.send('<h1>Server</h1>')
})

app.get('/author', (req,res)=>{
    res.send({'first name':'Brano','lastname':'Nebus'})
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
});


//task
//task?done=true
//task?priority=3

/*
//zistime ci ma req parameter done??????
app.get('/taskk',(req,res)=>{
    if(req.query.done){
        res.send(req.query.done)
    }
    else{
        res.send('not')
    }
})


//pripojenie sa do databazy
app.get('/task',(req,res)=>{
    MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) =>{

        if(error){
            res.send('daco zle')
            //return console.log('Unable to connect');
        }
        console.log('Connection ok');
        let filter = '{}';
/*
        if(req.query.done){
            if(req.query.done=='true'){
                filter = {Done:true};
            }else{
                filter = {Done:false};
            }
        }
*/
        //
        /*
        if(req.query.done || req.query.priority){
            if(req.query.done=='true'){
                filter = {Done:true};
            }else if(req.query.done=='false'){
                filter = {Done:false};
            }else if(req.query.priority==1){
                filter = {Priority:1};
            }else if(req.query.priority==2){
                filter = {Priority:2};
            }else if(req.query.priority==3){
                filter = {Priority:3};
            }else if(req.query.priority>4){
                filter = {Priority:3};
            }
        }
        
        if(req.query.done){
            if(req.query.done=='true'){
                filter = {Done:true};
            }else if(req.query.done=='false'){
                filter = {Done:false};
            }
        }
        
        
        const db = client.db(databaseName);

        db.collection('myReminders').find(filter).toArray((err,result)=>{
            if(err) throw err;
            console.log(result);
            res.send(result);
        })
        
    })
})

*/


///////////////////////////////
app.get('/skusanie',(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) =>{

        if(error){
            res.send('daco zle')
        }
        console.log('Connection ok');
        let filter = '{}';

        if(req.query.done){
            if(req.query.done=='true'){
                filter = {Done:true}
            }else if(req.query.done=='false'){
                filter = {Done:false}
            }
        }
        else if(req.query.priority){
            const cislo = parseInt(req.query.priority)
            filter = {Priority:cislo}
        }
        console.log(filter);
        
        const db = client.db(databaseName);

        db.collection('myReminders').find(filter).toArray((err,result)=>{
            if(err) throw err;
            console.log(result);
            res.send(result);
        })
        
    })
})



////////////////////
app.post('/skusanie/insert',(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
        const data = req.body;
        console.log(req.body);
        //res.send(name);

        const name = data.Name;
        const priority = data.Priority;
        let price = undefined;
        if(data.Price){
            price = data.Price;
        }
        console.log(name, ' ', priority,' ', price);
        
        //pridat datum
        //pridat done:false
        //vytvorit dokument
        //zapisat do mongo
        const done = false;
        const currentDate = new Date();
        console.log(currentDate);

        if(price === undefined){
            var myobj = { Date: currentDate, Name: name, Done: done, Priority: priority};
            var MongoClient = require('mongodb').MongoClient;
            var url = "mongodb://localhost:27017/";
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("Reminder");
                dbo.collection("myReminders").insertOne(myobj, function(err, res) {
                  if (err) throw err;
                  console.log("1 document inserted");
                  db.close();
                });
              });
              res.send('{"Result":"OK"}');
        }else{
            var myobj = { Date: currentDate, Name: name, Done: done, Priority: priority, Price: price};
            var MongoClient = require('mongodb').MongoClient;
            var url = "mongodb://localhost:27017/";
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("Reminder");
                dbo.collection("myReminders").insertOne(myobj, function(err, res) {
                  if (err) throw err;
                  console.log("1 document inserted");
                  db.close();
                });
              });
              res.send('{"Result":"OK"}');
        }
        
})

app.patch('/reminder/done',(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    //1 nacitat id
    //2 pripravit update
    //3 update urobit
    //4 vrati 200 alebo 400

    ///1
    const id = req.query._id;
    //console.log(id);
    if(id === null){
        res.status(400).send("ERROR")
    }else{
        const filter={};
        filter._id = new mongodb.ObjectID(id);
        MongoClient.connect(connectionURL, (error, client)=>{
            if(error){
                res.status(400).send("errorrrrrr");
                return;
            }
            const db = client.db(databaseName);
            db.collection('myReminders').updateOne(filter,{$set:{Done:true}},(err,result)=>{
                if(err){
                    res.status(400).send("Error")
                }else{
                    res.status(200).send("Ok")
                }
            })
        })
       
    }


})




//////vyhladavanie podla retazca
app.get('/substring',(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    const pole = [];
    const sub = req.query.sub;
    MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) =>{
        
        const db = client.db(databaseName);

        db.collection('myReminders').find().toArray((err,result)=>{
        if(err) throw err;

        //res.status(200).send(result)
        //return result;
        //console.log(result);
            for(let i = 0; i < result.length; i++){
                //console.log(result[i].Name);
                if(result[i].Name.includes(sub)){
                    console.log(result[i].Name);
                    pole.push(result[i]);
                }
            }
            //console.log(pole);
            res.status(200).send(pole)
        })      
    })
})

