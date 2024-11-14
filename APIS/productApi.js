const exp = require('express')
const productApp = exp.Router()

// importing expressAsyncHandler
const expressAsyncHandler = require('express-async-handler')

//to extract the body
productApp.use(exp.json())

// to get all products
productApp.get('/getproducts', expressAsyncHandler(async(req,res)=>{
    // to get productCollectionObj
    let productCollectionObj = req.app.get("productCollectionObj")
    // getting all products
    let products = await productCollectionObj.find().toArray()
    if(products == null){
        res.send({message:"No products exists"})
    }
    else{
        res.send({message:"List of products", payload:products})
    }

}))


// to get selected products
productApp.get('/getproduct/:id', expressAsyncHandler(async(req,res)=>{
    //to get productCOllectionObj
    let productCOllectionObj = req.app.get('productCollectionObj')
    // getting productId
    let productId = (+req.params.id)
    //getting product with Id
    let product = await productCOllectionObj.findOne({productId:productId})
    if(product == null){
        res.send({message:"No product exist with that Id"})
    }
    else{
        res.send({message:`product with id ${productId}`, payload:product})
    }

}))

productApp.post('/create-product', async(req, res)=>{
    
    // get productCollectionObj
    let productCollectionObj = req.app.get("productCollectionObj")

    // get product obj from req
    let productObj = req.body
    
    //inserting productObj into database
    let result = await productCollectionObj.insertOne(productObj)
    
    res.send({message:"New product created successfully"})
})

// to update product
productApp.put('/update-product', expressAsyncHandler(async(req,res)=>{
    //get productCollectonObj
    let productCollectionObj = req.app.get('productCollectionObj')
    let updatedProduct = req.body
    //updating the product
    await productCollectionObj.updateOne({productId:updatedProduct.productId},{$set:{...updatedProduct}})
}))

// deleting the product
productApp.delete('/remove-product/:id', expressAsyncHandler(async(req,res)=>{
    //get productCollectionObj
    let productCOllectionObj = req.app.get('productCollectionObj')
    //getting product ID
    let productId = (+req.params.id)
    await productCOllectionObj.deleteOne({productId:productId})
    res.send({message:'product deleted successfully'})
}))
module.exports = productApp