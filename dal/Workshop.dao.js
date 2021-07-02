let workShop;
setTimeout(() =>{ workShop = require('./').db('conferenceMT').collection('WorkshopColl')},1000)
const ObjectId = require("mongodb").ObjectId;

    /**
     * Storing Workshop proposal
     */
    const save = async ({userID, presenterName, workShopTitle, affiliation, contactNumber, conductorNames, submittedDate, proposalStatus, fileLocation}) =>{
        const result = await workShop.insertOne({userID, presenterName, workShopTitle, affiliation, contactNumber, conductorNames, submittedDate, proposalStatus, fileLocation});
        return  result.ops[0];
    }

    /**
     * Get All Stored Workshop proposal
     */
    const getAll = async () =>{
        const courser = await workShop.find({});
        return courser.toArray();
    }

    /**
     * Getting Workshop proposal of specific Workshop presenter
     */
    const getByUserId = async (userId) =>{
        const courser = await workShop.find({userID:userId});
        return courser.toArray();
    }

    /**
     * Getting Workshop proposal by it's ID
     */
    const getById = async (id) =>{
        return await workShop.findOne({_id:ObjectId(id)});
    }

    /**
     * Removing Existing Workshop proposal
     */
    const removeById = async (id) =>{
        return await workShop.deleteOne({_id:ObjectId(id)});
    }

    const update = async (id ,{userID, presenterName, workShopTitle, affiliation,contactNumber, conductorNames, submittedDate,proposalStatus, fileLocation}) =>{
        const result = await workShop.replaceOne({_id:ObjectId(id)},{userID, presenterName, workShopTitle, affiliation, contactNumber, conductorNames, submittedDate,proposalStatus, fileLocation});
        return  result.ops[0];
    }

module.exports = {
    save,
    getAll,
    getByUserId,
    getById,
    removeById,
    update
};