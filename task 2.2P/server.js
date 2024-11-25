const express = require('express');
const app = express();
const PORT = 1414; // or process.env.PORT || 3000

// Root route
app.use(express.static('public'));

// Root route to serve the index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Add route
app.get('/add', (req, res) => {
    const { num1, num2 } = req.query;
    // if (!num1 || !num2) {
    //     return res.status(400).json({ error: 'Provide num1 and num2 as query parameters.' });
    // }
    const result = parseFloat(num1) + parseFloat(num2);
    // res.json({ result });
    res.send(`The total of ${num1} & ${num2} is ${result}`)
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
