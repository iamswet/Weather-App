const path=require('path')
const express=require("express")
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const port= 10000

const app=express()
const publicdir=path.join(__dirname,'../public')
const viewpath=path.join(__dirname,'../templates/views')
const partialpath=path.join(__dirname,'../templates/partials')

app.set("view engine","hbs")
app.set("views",viewpath)
hbs.registerPartials(partialpath)

app.use(express.static(publicdir))

app.get('',(req,res)=>{
    res.render('index', {
        title:'Weather App',
        name: 'Swet Singh'
    })
})


app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help",
        message:"Contact me at GitHub @iamswet",
        name:"Swet Singh"
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"send an address"
        })
    }

    geocode(req.query.address,(error,data)=>{
        if(error){
            return res.send({error})
        }forecast(data.longitude, data.latitude, (error, forecastdata) => {
            if (error) {
              return res.send({error});
            }
      
            res.send({
                Temperature: forecastdata.temperature,
                TemperatureApparent:forecastdata.tempapp,
                Humidity:forecastdata.humid,
                Precipitation:forecastdata.preci,
                place: data.place
            });
          });
    })

    console.log(req.query)
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About Page",
        name:"Swet Singh"
    })
})

app.get('/help/*',(req,res)=>{
    res.render('pagenotfound',{
        pagetext:"Help article not found",
        title:"Error Occured"
    })
})

app.get('*',(req,res)=>{
    res.render('pagenotfound',{
        pagetext:"Error 404 incurred",
        title:"Error Occured"
    })
})

app.listen(port,()=>{
    console.log("Server is on port "+port)
})
