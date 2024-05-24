//CRUD BIRTHDAYS

const express = require('express');
const router = express.Router();
const { connectToDatabase } = require('./db'); //connect database
const { ObjectId } = require('mongodb');
const { calculateAge, upcoming_birthdays } = require('./functions');
router.use(async (req, res, next) => {
    try {
      const { client, collection } = await connectToDatabase();
      req.dbClient = client;
      req.collection = collection;
      next();
    } catch (error) {
      res.status(500).send('Internal server error');
    }
  });


//get list of birthdays 
router.get('/list_birthdays',async (req, res) => {
    try {
        const birthdays = await req.collection.find({}).toArray();
        res.json(birthdays);
      } catch (error) {
        res.status(500).send('Internal server error');
      }
  });

//new birthday
router.post('/new_birthday',async(req,res)=>{
    try{
        let newBirthday = req.body;
        newBirthday =  calculateAge(newBirthday);
        console.log(newBirthday)
        const result = await req.collection.insertOne(newBirthday);
        res.status(201).json({message: 'Birthday Added Successfully ',insertedId: result.insertedId})

    }catch(error){
        console.error('Error when trying to insert a new birthday:', error);
        res.status(500).send('Internal server error')
    }
});

//delete birthday
router.delete("/delete_birthday/:id",async(req,res)=> {
    try{
        const birthdayId = req.params.id;
        const objectId = new ObjectId(birthdayId);
        const result = await req.collection.deleteOne({ _id: objectId });

        if (result.deletedCount === 1) {
            res.json({ message: 'Birthday deleted successfully ' });
          } else {
            res.status(404).json({ message: 'birthday was not found' });
          }

    }catch(error){
        console.error('Error when trying to delete birthday:', error);
        res.status(500).send('Internal server error');
    }
})

//upcoming_birthdays
router.get('/upcoming_birthdays',async (req, res) => {
  try {
      const birthdays = await req.collection.find({}).toArray();
      const upcoming = upcoming_birthdays(birthdays)
      res.json(upcoming);
    } catch (error) {
      res.status(500).send('Internal server error');
    }
});

module.exports = router;