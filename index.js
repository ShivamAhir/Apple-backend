const fs=require('fs');
const mongoose = require('mongoose');
const url=require('url');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 5500;

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/ecomerce-website', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const UserSchema=new mongoose.Schema({
    email:String,
    password:String,
    username:String
});
const User= mongoose.model('users', UserSchema);


const buySchema=new mongoose.Schema({
    id:Number,
    bool:Boolean,
    name:String,
    size:String,
    display:String,
    link:String,
    userLog:String,
    price:String
});
const Buy= mongoose.model('buys', buySchema);

const homeSchema=new mongoose.Schema({
    name:String,
    link:String,
});
const Home= mongoose.model('homes', homeSchema);

const airpordsSchema = new mongoose.Schema({
    id:Number,
    bool:Boolean,
    name:String,
    size:String,
    display:String,
    link:String,
    price:String
});
const Airpords = mongoose.model('airpords', airpordsSchema);

const ipadSchema = new mongoose.Schema({
    id:Number,
    bool:Boolean,
    name:String,
    size:String,
    display:String,
    link:String,
    price:String
});
const Ipad = mongoose.model('ipads', ipadSchema);

const iphoneSchema = new mongoose.Schema({
    id:Number,
    bool:Boolean,
    name:String,
    size:String,
    display:String,
    link:String,
    price:String
});
const Iphone = mongoose.model('iphones', iphoneSchema);

const iwatchSchema = new mongoose.Schema({
    id:Number,
    bool:Boolean,
    name:String,
    size:String,
    display:String,
    link:String,
    price:String
});
const Iwatch = mongoose.model('iwatches', iwatchSchema);

const macSchema = new mongoose.Schema({
    id: Number,
    bool: Boolean,
    name: String,
    size: String,
    display: String,
    link: String,
    price: String
});

const Mac = mongoose.model('macs', macSchema);

const bodyParser = require('body-parser');
const { log } = require('console');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));


app.get('/api/', async(req, res) => {   
    let home = await Home.find({});
    res.status(200).send(home);
});

app.get('/api/iphone', async(req, res) => {   
    let iphone = await Iphone.find({});
    res.status(200).send(iphone);
});
app.get('/api/iphone/:item', async(req, res) => {
    try {
      let itemId = req.params.item; 
      let num=0;

      for(let i=0;i<itemId.length;i++)
      {
        if(itemId[i]=='=')
        {
            num=itemId[i+1];
            break;
        }
      }
      num=num*1;
      num--;
      let iphone = await Iphone.find({});
  
      res.status(200).json(iphone[num]);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
app.post('/api/iphone/:item', async (req, res) => {
    console.log('clicked')
    try {
      let itemId = req.params.item;
      let num = 0;
  
      for (let i = 0; i < itemId.length; i++) {
        if (itemId[i] == '=') {
          num = itemId[i + 1];
          break;
        }
      }
      num = num * 1;
      num--;
      console.log(num)
      console.log(log_userEmail)
      if (log_userEmail == "") {
        res.status(500).json({ error: 'User not logged in' });
      } else {
        let iphone = await Iphone.find({id:num});
        const newBuy = new Buy({
          id: iphone[0].id,
          bool: iphone[0].bool,
          name: iphone[0].name,
          size: iphone[0].size,
          display: iphone[0].display,
          link: iphone[0].link,
          userLog: log_userEmail,
          price: iphone[0].price
        });
        newBuy.save();
        res.status(201).json({ message: 'Successfuly product added to cart' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});  

app.get('/api/ipad', async(req, res) => {
    let ipad = await Ipad.find({});
    res.status(200).send(ipad);
});
app.get('/api/ipad/:item', async(req, res) => {
    try {
      let itemId = req.params.item; 
      let num=0;

      for(let i=0;i<itemId.length;i++)
      {
        if(itemId[i]=='=')
        {
            num=itemId[i+1];
            break;
        }
      }
      num=num*1;
      num--;
      let ipad = await Ipad.find({});
  
      res.status(200).json(ipad[num]);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  app.post('/api/ipad/:item', async (req, res) => {
    console.log('clicked')
    try {
      let itemId = req.params.item;
      let num = 0;
  
      for (let i = 0; i < itemId.length; i++) {
        if (itemId[i] == '=') {
          num = itemId[i + 1];
          break;
        }
      }
      num = num * 1;
      num--;
      console.log(num)
      console.log(log_userEmail)
      if (log_userEmail == "") {
        res.status(500).json({ error: 'User not logged in' });
      } else {
        let ipad = await Ipad.find({id:num});
        const newBuy = new Buy({
          id: ipad[0].id,
          bool: ipad[0].bool,
          name: ipad[0].name,
          size: ipad[0].size,
          display: ipad[0].display,
          link: ipad[0].link,
          userLog: log_userEmail,
          price: ipad[0].price
        });
        newBuy.save();
        res.status(201).json({ message: 'Successfuly product added to cart' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/imac', async(req, res) => {
    let macs = await Mac.find({});
    res.status(200).send(macs);
});
app.get('/api/imac/:item', async(req, res) => {
    try {
      let itemId = req.params.item; 
      let num=0;

      for(let i=0;i<itemId.length;i++)
      {
        if(itemId[i]=='=')
        {
            num=itemId[i+1];
            break;
        }
      }
      num=num*1;
      num--;
      let macs = await Mac.find({});
  
      res.status(200).json(macs[num]);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});
app.post('/api/imac/:item', async (req, res) => {
    console.log('clicked')
    try {
      let itemId = req.params.item;
      let num = 0;
  
      for (let i = 0; i < itemId.length; i++) {
        if (itemId[i] == '=') {
          num = itemId[i + 1];
          break;
        }
      }
      num = num * 1;
      num--;
      console.log(num)
      console.log(log_userEmail)
      if (log_userEmail == "") {
        res.status(500).json({ error: 'User not logged in' });
      } else {
        let macs = await Mac.find({id:num});
        const newBuy = new Buy({
          id: macs[0].id,
          bool: macs[0].bool,
          name: macs[0].name,
          size: macs[0].size,
          display: macs[0].display,
          link: macs[0].link,
          userLog: log_userEmail,
          price: macs[0].price
        });
        newBuy.save();
        res.status(201).json({ message: 'Successfuly product added to cart' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/iwatch', async(req, res) => {
    let iwatch = await Iwatch.find({});
    res.status(200).send(iwatch);
});
app.get('/api/iwatch/:item', async(req, res) => {
    try {
      let itemId = req.params.item; 
      let num=0;

      for(let i=0;i<itemId.length;i++)
      {
        if(itemId[i]=='=')
        {
            num=itemId[i+1];
            break;
        }
      }
      num=num*1;
      num--;
      let iwatch = await Iwatch.find({});
  
      res.status(200).json(iwatch[num]);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});
app.post('/api/iwatch/:item', async (req, res) => {
    console.log('clicked')
    try {
      let itemId = req.params.item;
      let num = 0;
  
      for (let i = 0; i < itemId.length; i++) {
        if (itemId[i] == '=') {
          num = itemId[i + 1];
          break;
        }
      }
      num = num * 1;
      num--;
      console.log(num)
      console.log(log_userEmail)
      if (log_userEmail == "") {
        res.status(500).json({ error: 'User not logged in' });
      } else {
        let iwatch = await Iwatch.find({id:num});
        const newBuy = new Buy({
          id: iwatch[0].id,
          bool: iwatch[0].bool,
          name: iwatch[0].name,
          size: iwatch[0].size,
          display: iwatch[0].display,
          link: iwatch[0].link,
          userLog: log_userEmail,
          price: iwatch[0].price
        });
        newBuy.save();
        res.status(201).json({ message: 'Successfuly product added to cart' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});
  
app.get('/api/airpords', async(req, res) => {
    let airpords = await Airpords.find({});
    res.status(200).send(airpords);
});
app.get('/api/airpod/:item', async(req, res) => {
    try {
      let itemId = req.params.item; 
      let num=0;

      for(let i=0;i<itemId.length;i++)
      {
        if(itemId[i]=='=')
        {
            num=itemId[i+1];
            break;
        }
      }
      num=num*1;
      num--;
      let airpords = await Airpords.find({});
  
      res.status(200).json(airpords[num]);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});
app.post('/api/airpod/:item', async (req, res) => {
    console.log('clicked')
    try {
      let itemId = req.params.item;
      let num = 0;
  
      for (let i = 0; i < itemId.length; i++) {
        if (itemId[i] == '=') {
          num = itemId[i + 1];
          break;
        }
      }
      num = num * 1;
      num--;
      console.log(num)
      console.log(log_userEmail)
      if (log_userEmail == "") {
        res.status(500).json({ error: 'User not logged in' });
      } else {
        let airpords = await Airpords.find({ id:num });
        const newBuy = new Buy({
          id: airpords[0].id,
          bool: airpords[0].bool,
          name: airpords[0].name,
          size: airpords[0].size,
          display: airpords[0].display,
          link: airpords[0].link,
          userLog: log_userEmail,
          price: airpords[0].price
        });
        newBuy.save();
        res.status(201).json({ message: 'Successfuly product added to cart' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});
  
app.post('/api/signup', (req, res) => {
    const { username, email, password } = req.body;

    if (username && email && password) {

        console.log('Signup successful');
        const newUser = new User({
            email:email,
            password:password,
            username:username
        });
        newUser.save();
        res.status(201).json({ message: 'Signup successful' });

    } else {
        console.log('Invalid signup data');
        res.status(400).json({ message: 'Invalid signup data' });
    }
});
var log_userEmail="";
var log_userName="";

app.post('/api/login', async(req, res) => {
    try {
        const { email, password } = req.body;
        const userdata = await User.find({ email: email });

        if (!userdata) {
          console.log('User not found');
          res.status(404).json({ message: 'User not found' });
        }
        else{ 
            if(email==userdata[0].email && password==userdata[0].password)
            {
                log_userEmail=userdata[0].email;
                log_userName=userdata[0].username;
                console.log(log_userEmail);
                console.log(log_userName);

                res.status(201).json({ message: 'Log in Succesfull' });
            }
            else
            {
                res.status(201).json({ message: 'Invalid Credential' });
            }

        }
      } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Server error' });
      }

});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
