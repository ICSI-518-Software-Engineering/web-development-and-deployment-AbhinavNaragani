const express=require('express');
const bodyParser = require('body-parser');
const app=express();
const path = require("path");
const cors = require('cors');
const mongoose = require('mongoose');
app.use(express.static(path.join(__dirname,"public")));

app.use((req,res,next)=>
{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
    next();
})

app.use(cors());
app.use(bodyParser.json({ limit:"40mb"}));


app.post('/addnumbers',(req,res,next)=>
{
    res.json({result:(req.body.inp1+req.body.inp2)});

})


mongoose.connect('mongodb+srv://abhinavn221:niEjK9Q1dXqca0o9@cluster0.moffxf2.mongodb.net/Cluster0').then(() => {
  console.log('MongoDB connected');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

const inventorySchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  imageURL: String
});

const InventoryItem = mongoose.model('InventoryItem', inventorySchema);


app.get('/api/inventory', async (req, res) => {
    try {
      const inventory = await InventoryItem.find();
      res.json(inventory);
    } catch (error) {
      console.error('Error fetching inventory:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  app.post('/api/inventory', async (req, res) => {
    try {
      const newItem = new InventoryItem({
        name: req.body.name,
        quantity: req.body.quantity,
        imageURL: req.body.image
      });
      await newItem.save();
      res.status(201).json(newItem);
    } catch (error) {
      console.error('Error adding item to inventory:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  app.put('/api/inventory/:id', async (req, res) => {
    try {
      const updatedItem = await InventoryItem.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        quantity: req.body.quantity
      }, { new: true });
      res.json(updatedItem);
    } catch (error) {
      console.error('Error updating item in inventory:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  app.delete('/api/inventory/:id', async (req, res) => {
    try {
      await InventoryItem.findByIdAndDelete(req.params.id);
      res.json({ message: 'Item deleted successfully' });
    } catch (error) {
      console.error('Error deleting item from inventory:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


app.listen(5001,()=>
{
    console.log("server is running on port 4000");
})










