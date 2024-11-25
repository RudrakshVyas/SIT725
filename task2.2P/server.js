// Importing the Express for creating the application
const express = require('express');

const app = express();

//The port where my website is running
const PORT = 1414; 

app.use(express.static('public'));

// Rooting the route to render the index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// For Calculating the addition of two numbers which is passed in the url.
app.get('/add', (req, res) => {

    const { num1, num2 } = req.query;
    

    const result = parseFloat(num1) + parseFloat(num2);
    
    // Giving the result.
    res.send(`The total of ${num1} & ${num2} is ${result}`);
});

// Starting the server to assigned port
app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
}); 
