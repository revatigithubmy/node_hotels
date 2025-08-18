const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/MenuItem');

router.post('/',async(req,res)=>{
try{
  const data = req.body
const newMenuItem = new MenuItem(data);
const response= await newMenuItem.save();
  console.log("data Saved");
  res.status(200).json(response);
}catch(err)
{
  console.log(err);
res.status(500).json({error:'Internal Server Error'});
}
})

router.get('/', async(req,res)=>{
  try{
    const data = await MenuItem.find();
    console.log('data fetched');
    res.status(200).json(data);
  }catch(err)
  {
    console.log(err);
    res.status(500).json({error:'Internal Srver error'});
  }
})

//Get a spcific taste 
router.get('/:tasteofDish', async(req,res)=>{
  try{
const tasteofDish= req.params.tasteofDish;// Extract the taste type from URL parameter
  if(tasteofDish=='Spicy' || tasteofDish=='Sweet' || tasteofDish=='Sour'){
    const response = await MenuItem.find({taste:tasteofDish});
    console.log('response fetch');
    res.status(200).json(response);
  }
  else{
    res.status(404).json({error:'Invalid work  type'});
  }

  }catch(err){
    res.status(500).json({error:'Internal Server Error'});
  }
})

module.exports = router;