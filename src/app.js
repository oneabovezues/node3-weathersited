const express = require('express')
const res = require('express/lib/response')
const hbs = require('hbs')
const path = require('path')
const utils = require('./add.js')

const app = express()
//define paths
const pathpublc  = path.join(__dirname,'../public')
const viewpath = path.join(__dirname,'../templates/views')
const partialspath = path.join(viewpath,'../partials')

//setup static objects
app.use(express.static(pathpublc))

//handlebars setup
app.set('view engine','hbs')
app.set('views',viewpath)
hbs.registerPartials(partialspath)

app.get('',(req,res)=>{
    res.render('index',{title:'Weather',name:'atharv'})
})

app.get('/about',(req,res)=>{
    
    res.render('about',{title:'About',name:'empty'})
})
app.get('/help',(req,res)=>{
    res.render('help',{title:'Help page',helpmessage:'Help:',name:'empty'})
   
})
app.get('/weather',(req,res)=>{
    const address = req.query.address
    if(!req.query.address){
        res.send({Error:'Provide address'})
    }
    else{
        utils.geocode(address,(error,{lat,long,name} = {})=>{
            if (error !== 'undefined'){
                res.send({error})
            }
            else{
                utils.forecast({lat,long},({Weather,temperature,Precip} = {},error)=>{
                    res.send({
                        name,
                        forecast:Weather+".It is currently "+temperature+"C with a " + Precip + "% chance of rain."
                })
            })}
            
        })
    }
})


app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        Errormessage:'Page not found',
        name:'empty'})
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        Errormessage:'Help article not found',
        name:'empty'})
})


app.listen(3000,()=>console.log('server up'))