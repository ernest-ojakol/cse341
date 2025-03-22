const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDatabase().db().collection('cse341_week1').find();
    const users = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
};

const getSingle = async (req, res) => {
  try {
    const userIdParam = req.params.id;

    if (!ObjectId.isValid(userIdParam)) {
      return res.status(400).json({ message: 'Invalid user ID format. Must be a 24-character hex string.' });
    }

    const userId = new ObjectId(userIdParam);
    const result = await mongodb.getDatabase().db().collection('cse341_week1').find({ _id: userId });
    const users = await result.toArray();

    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(users[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user', error: err.message });
  }
};

const createUser = async(req,res)=>{
  const user = {
    username: req.body.username,
    email: req.body.email,
    name: req.body.name,
    ipaddress: req.body.ipaddress
  }

  const response = await mongodb.getDatabase().db().collection().insertOne(user);
  if(response.acknowledged>0){
    req.status(204).send();
  }else{
    req.status(500).json(response.error || "Some error while updating the user");
  }
}

const updateUser = async(req,res)=>{
  const userId=new ObjectId(req.params.id);
  const user = {
    username: req.body.username,
    email: req.body.email,
    name: req.body.name,
    ipaddress: req.body.ipaddress
  }

  const response = await mongodb.getDatabase().db().collection().replaceOne({_id:userId},user);
  if(response.modifiedCount>0){
    req.status(204).send();
  }else{
    req.status(500).json(response.error || "Some error while updating the user");
  }
}

const deleteUser = async(req,res)=>{
  const userId=new ObjectId(req.params.id);

  const response = await mongodb.getDatabase().db().collection().removeOne({_id:userId},user);
  if(response.deletedCount>0){
    req.status(204).send();
  }else{
    req.status(500).json(response.error || "Some error while updating the user");
  }
}

module.exports = { getAll, getSingle, createUser, updateUser,deleteUser };