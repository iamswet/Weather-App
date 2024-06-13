const request=require("request")

const forecast=(longitude,latituide,callback)=>{
    const url='https://api.tomorrow.io/v4/weather/realtime?location='+encodeURIComponent(latituide)+','+encodeURIComponent(longitude) +'&apikey=lfaXlJ9GsxW3cnvU7rPERXisCT4ZgwQy'

    request({url:url,json:true},(error,response)=>{
        if(error){
            callback("Error in fetching weather",undefined)
        }else if(response.body.type){
            callback("Invalid location",undefined)
        }
        else{
            callback(undefined,{
                temperature:response.body.data.values.temperature,
                tempapp:response.body.data.values.temperatureApparent,
                humid:response.body.data.values.humidity,
                preci:response.body.data.values.precipitationProbability
            })
        }

    })
}

module.exports=forecast