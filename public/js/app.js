

console.log('js loadeds')



const form = document.querySelector('form')
const search = document.querySelector('input')
const result1 = document.querySelector('#Forecast1')
const result2 = document.querySelector('#Forecast2')
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    fetch("http://localhost:3000/weather?address="+ location).then((response)=>{
        response.json().then((data)=>{
            console.log(data)
            result1.textContent = data.name
            result2.textContent = data.forecast 
            
        })
    })
})
