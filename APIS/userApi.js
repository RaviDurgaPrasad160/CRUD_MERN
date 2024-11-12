const exp = require('express')
const userApp = exp.Router()

//to extract the body
userApp.use(exp.json())


// creating some fake apis
let users = [
    {
        name:'Prasad',
        age:25,
        city:'Hyderabad',
        email:'ravidurgaprasad876@gmail.com'
    },
    {
        name:'Durga',
        age:22,
        city:'Vizag',
        email:'durga737@gmail.com'
    }
]

userApp.get('/getusers', (req,res)=>{
    res.send({message:`users data`, payload:users})
})


module.exports = userApp