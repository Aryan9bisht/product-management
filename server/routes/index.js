const express = require('express')
const ItemDetails = require('../models/Item')
const router = express.Router()

router.post('/add', async (req, res) => {

    try{

        console.log("the body", req.body)
        const item = await ItemDetails.create(req.body)
    
        return res.status(200).json({
            data: item,
            message: "Item created successfully!"
        })

    } catch(error) {
        console.log("the error", error)
        return res.status(500).json({
            data: null,
            message: "Error while creating item!"
        })
    }

   

})

router.get('/get', async (req, res) => {
    try {

        const items = await ItemDetails.find()
        return res.status(200).json({
            data: items,
            message: "Items fetched successfully!"
        })

    } catch (error) {
console.log('error in getting all the products', error);
return res.status(500).json({
    data: null,
    message: "Error while creating item!"
})
    }

})
router.delete('/delete/:id', async(req,res) =>{
    try {
        const prod = await ItemDetails.findById(req.params.id);
        if(prod){
            await prod.deleteOne();
          //  await category.deleteMany();
            console.log('product deleted',prod);
            return res.status(200).json({
                data: prod,
                message: "Items deleted successfully!"
            })

        }
      
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: null,
            message: "Error while creating item!"
        })
    }
})
router.put('/update/:id', async (req,res) => {
    try {
        const prod = await ItemDetails.findById(req.params.id);
    if(prod){

        const update = await ItemDetails.findByIdAndUpdate(req.params.id,{$set: req.body});
            update.save();
            return res.status(200).send('product updated',update);
    }
    else{
        console.log('product does not exist');
        return res.status(404).json({
            data: null,
            message: "product not found"
        })
    }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: null,
            message: "Error while creating item!"
        })
    }
    
})
router.get('/search', (req, res) => {
  const { query } = req.query;

  if (!query) {
    
    return res.json(items);
  }

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  res.json(filteredItems);
});


module.exports = router