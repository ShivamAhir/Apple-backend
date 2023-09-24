const mongoose = require('mongoose');
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

app.get('/api/logUser', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.flushHeaders(); // Flush the headers to initiate SSE connection
  
  function sendSSEData() {
    const sseData = {
      UserName: log_userName,       
      UserEmail: log_userEmail,    
    };
    const sseString = `data: ${JSON.stringify(sseData)}\n\n`;
    res.write(sseString);
  }

  // Send initial data
  sendSSEData();

  // Simulate continuous updates (you should replace this with your logic)
  const intervalId = setInterval(() => {
    sendSSEData();
  }, 5000); // Send updates every 5 seconds as an example

  // Handle client disconnect
  req.on('close', () => {
    clearInterval(intervalId); // Stop sending updates when the client disconnects
    res.end(); // End the response
  });
});


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

app.post('/api/delete/:temp', async (req, res) => {
  const temp = req.params.temp; // Retrieve the value of the 'temp' parameter from the URL

  try {
    const result = await Buy.deleteOne({ _id: temp });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'Successfully deleted' });
    } else {
      res.status(404).json({ message: 'Document not found' });
    }
  } catch (error) {
    console.error('Error deleting document:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.post('/api/logout', async(req, res) => {
    log_userEmail="";
    log_userName="";
    res.status(201).json({"message":"Logout Succesfull"});
})


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
                console.log("Log In succesfull")
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
app.get('/api/buy', async (req, res) => {
  if (log_userEmail === "") {
    res.status(200).json({}); 
  } else {
    let buy = await Buy.find({ userLog: log_userEmail });
    res.status(200).json(buy); 
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

