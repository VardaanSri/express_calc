const express = require('express');
const math = require('mathjs');
const app = express();
const PORT = 9000;

app.use(express.json());

let history = [];

app.get('/', (req, res) => {
    res.send('<h1>BODMAS Calculator/p>');
});

app.post('/calculate/:expression', (req, res) => {
    const { expression } = req.body;
    const result = math.evaluate`{expression}`;
    res.json({ result });
    history.push(result);

    if (history.length > 20){
        history.shift();
    }
    res.json({ result });

});
app.post('/history', (req,res)=>{
    res.json({Calc_history: history});
});

app.listen(PORT, () => {
    console.log("Server is running on port ",  {PORT});
})