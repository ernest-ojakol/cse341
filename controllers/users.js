const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDatabase().db().collection('cse341_week2').find();
    const users = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching Contacts', error: err.message });
  }
};

const getSingle = async (req, res) => {
  try {
    const userIdParam = req.params.id;

    if (!ObjectId.isValid(userIdParam)) {
      return res.status(400).json({ message: 'Invalid user ID format. Must be a 24-character hex string.' });
    }

    const userId = new ObjectId(userIdParam);
    const result = await mongodb.getDatabase().db().collection('cse341_week2').find({ _id: userId });
    const users = await result.toArray();

    if (users.length === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(users[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching Contact', error: err.message });
  }
};

const createUser = async(req,res)=>{
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday:  req.body.birthday
  }

  const response = await mongodb.getDatabase().db().collection('cse341_week2').insertOne(user);
  if(response.acknowledged>0){
    res.status(204).send();
  }else{
    res.status(500).json(response.error || "Some error while updating the contact");
  }
}

const updateUser = async(req,res)=>{
  const userId=new ObjectId(req.params.id);
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday:  req.body.birthday
  }

  const response = await mongodb.getDatabase().db().collection('cse341_week2').replaceOne({_id:userId},user);
  if(response.modifiedCount>0){
    res.status(204).send();
  }else{
    res.status(500).json(response.error || "Some error while updating the contact");
  }
}

const deleteUser = async(req,res)=>{
  const userId=new ObjectId(req.params.id);

  const response = await mongodb.getDatabase().db().collection('cse341_week2').deleteOne({_id:userId});
  if(response.deletedCount>0){
    res.status(204).send();
  }else{
    res.status(500).json(response.error || "Some error while updating the contact");
  }
}

module.exports = { getAll, getSingle, createUser, updateUser,deleteUser };