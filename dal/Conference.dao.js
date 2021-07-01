/*
* IT 19167442
* author : Nusky
* */


//create the DataBase and the Collection
const posts = require('./').db('conferenceMT').collection('conference');
const ObjectId = require("mongodb").ObjectId;

//insert the data into Database
const save = async ({id, workshopId,creator, conference_title,message,status, postedDate}) => {
    const result = await posts.insertOne({id,workshopId, creator, conference_title,message,status, postedDate});
    return result.ops[0];
};
//retrieve all the data from the Database
const getAll = async () => {
    const cursor = await posts.find();
    return cursor.toArray();
};
//retrieve the data By Id
const getById = async id => {
    return await posts.findOne({id});
};
//deleting the data in the database
const removeById = async id => {
    await posts.deleteOne({id});
};

//updates the data in the database
const update = async (id, {workshopId,creator, conference_title,message,status, postedDate}) => {
    const result = await posts.replaceOne({id}, {id,workshopId, creator, conference_title,message,status, postedDate});
    return result.ops[0];
};

module.exports = {getAll,getById,removeById,save,update};