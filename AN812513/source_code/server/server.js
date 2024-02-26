const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 5001;
const path = require("path");
app.use(express.static(path.join(__dirname,"public")));

app.use((req,res,next)=>
{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
    next();
});
app.use(bodyParser.json());

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