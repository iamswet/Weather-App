console.log("Hey this is to verify")

const weatherpart=document.querySelector('form')
const addlocation=document.querySelector('#input_address')
const messageone=document.querySelector('#message1')
const messagetwo=document.querySelector('#message2')
const messagethree=document.querySelector('#message3')
const messagefour=document.querySelector('#message4')


weatherpart.addEventListener('submit',(e)=>{
    e.preventDefault()
    messageone.textContent='Loading...'

    const location=addlocation.value
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        messageone.textContent=data.place
        messagetwo.textContent='Temperature is '+data.Temperature+' but the apparent temperature is '+data.TemperatureApparent
        messagethree.textContent='Humidity : '+data.Humidity
        messagefour.textContent='Precipitation Probability : '+data.Precipitation+'%'
        console.log(data)
        
    })
})
    console.log(location)


})