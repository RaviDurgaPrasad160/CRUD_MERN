const exp = require('express')
const app = exp()
const mclient = require('mongodb').MongoClient

// importing userApi
const userApp = require('./APIS/userApi')
// importing productApi
const productApp = require('./APIS/productApi')

//Database connection url
const DBurl = "mongodb+srv://ravi2024:ravi2024@cluster0.psgg2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

// connect with mongodb server
mclient.connect(DBurl)
.then((client)=>{

// get DB object
    let dbObj = client.db("ravi2024")

    // create collection object
    let userCollectionObj = dbObj.collection('userCollection')
    let productCollectionObj = dbObj.collection('productCollection')

    // sharing collection objects to apis
    app.set("userCollectionObj", userCollectionObj)
    app.set("productCollectionObj", productCollectionObj)

    
    console.log("DB connection is succuss")
})
.catch(err=>console.log(`error in databsae collection ${err}`))

//middleware to handle user-api path
app.use('/user-api', userApp)

//middleware to handle product-api path
app.use('/product-api', productApp)





// middleware to handle invalid paths
app.use((req, res, next)=>{
    res.send({message:`path ${req.url} is invalid`})
})

// middleware to handle errors
app.use((error,req,res,next)=>{
    res.send({message:error.message})
})


app.listen(4000,()=>{
    console.log('server has started on port no 4000')
})


