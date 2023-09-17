const express = require("express");
const {json} = require("express");
const serverless = require("serverless-http");
const {readFileSync, writeFile} = require("fs");
const cors = require("cors");

const app = express();
const router = express.Router();

app.use(cors());
app.use(json());

const dayPath = "./src/DaysOfWeek.json";
const weekPath = "./src/WeeksAvailable.json";


const updateDayData = (daysData) =>{
    writeFile(dayPath,JSON.stringify(daysData),(err)=>{
        if(err){
            console.log("Encountered Error!");
            return;
        }
        console.log("Written Succesfully!");
    })
}

const updateWeekData = (weeksData) =>{
    writeFile(weekPath,JSON.stringify(weeksData),(err)=>{
        if(err){
            console.log("Encountered Error!");
            return;
        }
        console.log("Written Succesfully!");
    })
}

router.get('/days',(req,res)=>{
    const days = JSON.parse(readFileSync(dayPath));
    res.send(days);
});

router.post('/days',(req,res)=>{
    updateDayData(req.body);
    res.send(req.body);
});

router.get('/weeks',(req,res)=>{ 
    const weeks = JSON.parse(readFileSync(weekPath));
    res.send(weeks);
});

router.post('/weeks',(req,res)=>{
    updateWeekData(req.body);
    res.send(req.body);
});


router.get('/hello', (req, res) => res.send('Hello World!'));

router.get('/', (req, res) => {
    res.json({
        hello: "hi"
    })
});

// app.use('/.netlify/functions/api', router);
app.use('/api', router);

module.exports = app;
module.exports.handler = serverless(app);
