import express from 'express';
//node-fetch used to fetch api ut;s a ed6 module
import fetch from 'node-fetch';
import cors from 'cors'
import bodyParser from 'body-parser';
const app = express();
app.use(cors());
//bodyparser used to read content of body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/', async (req, res) => {
    const cityname1 = req.body.cityname;
    //api for weather
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname1}&appid=91ba7ee62b89de064762be7294c62799&units=metric`;
    try {  
        const response = await fetch(url);
        const data = await response.json();
        if (data.cod === '404' || cityname1 === undefined) {
            res.send({
                "message": "sorry",
                "temp": 0,
                "humidity": 0,
                "situation": 0
            })
        } else {
            res.send({
                "temp": data.main.temp,
                "humidity": data.main.humidity,
                "situation": data.weather[0].main,
                "wind_speed": data.wind.speed,
                "city": data.name
            })
        }
    } catch (error) {
        console.log("error");
    }
});

app.listen(8080, () => {
    console.log("listening");
})
// {} []