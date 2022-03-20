const request = require('request')
const geocode = (address,callback)=>{
const geocodingurl = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?&access_token=pk.eyJ1IjoiZW1wdGVkZnVsbCIsImEiOiJjbDB1eDAxenQwMDlnM2VxcXRnYWV6d3NsIn0.Aa69WVhHLcPi6krTwBeqzA"
request({url:geocodingurl,json: true},(error,{body},)=>{
    if (error){
       callback("unable to connect")
    }
    else if (body.features.length === 0){
        callback("Unable to find location")
    }
    else{
    const lat = body.features[0].center[1]
    const long = body.features[0].center[0]
    const name  = body.features[0].place_name
    data = {lat,long,name}
    callback("undefined",data)
    }

})
}

const forecast = (latlong,callback)=>{
    const url  ="http://api.weatherstack.com/current?access_key=5bed4fea91c3fb7c98dbe8bd0167952b&query="+latlong.lat+","+latlong.long
    
    request({url:url,json:true},(error, {body})=>{
        if (error){
            callback("undefined","error"+error)
        }
        else{
        const data = {
            Weather:body.current.weather_descriptions,
            temperature:body.current.temperature,
            Precip:body.current.precip,
        }
        
        callback(data)
    }
    })
}

module.exports.geocode = geocode;
module.exports.forecast = forecast;
