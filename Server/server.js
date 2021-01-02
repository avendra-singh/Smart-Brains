const Express =require('express');
const BodyParser = require('body-parser');
const cors = require('cors');
const app=Express();
const bcrypt =require('bcrypt-nodejs')
const knex=require('knex')

const db=knex({
    client: 'pg',
    version: '8.2.1',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '123',
      database : 'facerocognization'
    }
  });

app.use(cors())

app.use(BodyParser.json());

app.post('/signin',(req,res)=>{
  db.select('email','hash').from('login')
  .where('email','=',req.body.email)
  .then(data=>{
      const isvalid = bcrypt.compareSync(req.body.password,data[0].hash)
    if(isvalid){
        return db.select('*').from('users')
        .where('email','=',req.body.email)
        .then(user=>{
            res.json(user[0])
        })
        .catch(err=>res.status(400).json('unable to get user'))
    }
    else{
        res.status(400).json("wrong credintals")
    }    
})
.catch(err=>res.status(400).json('wrong credintals'))
})

app.post('/register',(req,res)=>{
    const{email,username,password}=req.body;
    const hash=bcrypt.hashSync(password);
    db.transaction(trx =>{
            trx.insert({
            hash:hash,
            email:email
        })
        .into('login')
        .returning('email')
        .then(loginemail=>{
            return trx('users')
            .returning('*')
            .insert(
        {
            email:loginemail[0],
            name:username,
            joined:new Date()
        }).then(response=>{
                res.json(response[0]);
        })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err=> res.status(400).json("unable to register"))
    })



app.get('/',(req,res)=>{
        res.send("server runing")
    })
app.put('/image',(req,res)=>{
    const{id}=req.body;
    db('users').where('id','=',id)
    .increment('entries',1)
    .returning('entries')
    .then(entries=>{
        res.json(entries[0]);
    })
    .catch(err=> res.status(400).json("error"))

})

app.listen(3000,(req,res)=>{
    console.log('app runnig')
})