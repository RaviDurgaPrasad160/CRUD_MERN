const exp = require('express')
const productApp = exp.Router()

//to extract the body
productApp.use(exp.json())

// to get all products
productApp.get('/getproducts', (req,res)=>{
    res.send({message:'to get all products'})
})


// to get selected products
productApp.get('/getproducts/:id', (req,res)=>{
    res.send({message:`product with id ${req.params.id}`})
})

productApp.post('/create-product', async(req, res)=>{
    
    // get productCollectionObj
    let productCollectionObj = req.app.get("productCollectionObj")

    // get product obj from req
    let productObj = req.body
    
    //inserting productObj into database
    let result = await productCollectionObj.insertOne(productObj)
    
    res.send({message:"New product created successfully"})
})

module.exports = productApp