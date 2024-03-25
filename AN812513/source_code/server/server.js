const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require("path");
const cors = require('cors');

const app = express();
const port = 5001;

app.use(express.static(path.join(__dirname,"public")));

app.use((req,res,next)=>
{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
    next();
});
app.use(bodyParser.json());

// Body parser middleware
app.use(bodyParser.json({ limit:"10mb" }));

// MongoDB connection
mongoose.connect('mongodb+srv://abhinavn221:niEjK9Q1dXqca0o9@cluster0.moffxf2.mongodb.net/Cluster0')
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

// Inventory Schema
const inventorySchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    imageURL: String
});

// Inventory Model
const InventoryItem = mongoose.model('InventoryItem', inventorySchema);

// POST endpoint to add an inventory item
app.get('/api/inventory', async (req, res) => {
    try {
        res.status(201).json(await InventoryItem.find({}));
    } catch (error) {
        console.error('Error adding item to inventory:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/inventory', async (req, res) => {
    try {
        const newItem = new InventoryItem(req.body);
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        console.error('Error adding item to inventory:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/api/inventory/:id', async (req, res) => {
    try {
        const newItem = await InventoryItem.findByIdAndUpdate(req.params.id, req.body);
        res.status(201).json(newItem);
    } catch (error) {
        console.error('Error adding item to inventory:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/api/inventory/:id', async (req, res) => {
    try {
        res.status(201).json(await InventoryItem.findByIdAndDelete(req.params.id));
    } catch (error) {
        console.error('Error adding item to inventory:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


console.log("resylt");

// POST endpoint for addition operation
app.post('/addition', (req, res) => {

    
    const { num1, num2 } = req.body;
 
    const result = parseFloat(num1) + parseFloat(num2);
    console.log(result);
    res.json({ result })
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



















