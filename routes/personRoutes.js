const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');

//Post route to add a person
router.post('/',async(req,res)=>{
try{
    const data = req.body//Assuming the request body contains the person data

  //create a new Person document using the Mongooes model
  const newPerson = new Person(data);

  //save the new person to the database
  const response= await newPerson.save();
  console.log("data Saved");
  res.status(200).json(response);
}
catch(err){
console.log(err);
res.status(500).json({error:'Internal Server Error'});
}
})


//Get method to get the person
router.get('/', async(req,res)=>{
  try{
    const data = await Person.find();
    console.log('data fetched');
    res.status(200).json(data);
  }catch(err)
  {
    console.log(err);
    res.status(500).json({error:'Internal Srver error'});
  }
})

//Get a spcific data 
router.get('/:workType', async(req,res)=>{
  try{
const workType= req.params.workType;// Extract the work type from URL parameter
  if(workType=='chef' || workType=='manager' || workType=='waiter'){
    const response = await Person.find({work:workType});
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

router.put('/:id', async (req, res)=>{
  try{
    const personId = req.params.id;//extract the id from the URL parameter
    const updatedPersonData = req.body;//Updated data for the person
    const response = await Person.findByIdAndUpdate(personId,updatedPersonData,{
        new:true, //retrun the updated documant
        runValidators:true,//Run Mongoose Validation
    })

    if(!response)
    {
      return res.status(404).json({error:'Person not Found'});
    }
console.log('data Updated');
res.status(200).json(response);
  }catch(err){
      console.log(err);
      res.status(500).json({error:'Internal Server Error'});
  }
})

// DELETE: Delete person by ID
router.delete('/:id', async (req, res) => {
  try {
    const personId = req.params.id;
    const deletedPerson = await Person.findByIdAndDelete(personId);

    if (!deletedPerson) {
      return res.status(404).json({ error: 'Person not found' });
    }

    console.log('data deleted');
    res.status(200).json({ message: 'person deleted successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
