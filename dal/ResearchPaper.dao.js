const researchPaper = require('./').db('conferenceMT').collection('ResearchPaperColl');
const ObjectId = require("mongodb").ObjectId;

    /**
     * Storing Research paper submission
     */
    const save = async (
        {userID,authorName, paperTitle, email, submittedDate, researchPFileLocation,submissionStatus,payment,paymentStatus}) =>{
        const result = await researchPaper.insertOne(
            {
                userID,authorName, paperTitle, email, submittedDate, researchPFileLocation,submissionStatus,payment,paymentStatus
            });
        return  result.ops[0];
    }

    /**
     * Getting All Research paper submission
     */
    const getAll = async () =>{
        const courser =  await researchPaper.find({});
        return courser.toArray();
    }

    /**
     * Getting Research paper submission of specific Researcher
     */
    const getByUserId = async (userID) =>{
        const courser =  await researchPaper.find({userID:userID});
        return courser.toArray();
    }
    /**
     * Getting Research paper submission by ID
     */
    const getById = async (id) =>{
        return await researchPaper.findOne({_id:ObjectId(id)});
    }

    /**
     * Removing Existing Research paper submission
     */
    const removeById = async (id) =>{
        return await researchPaper.deleteOne({_id:ObjectId(id)});
    }

    /**
     * Updating Existing Research paper submission
     */
    const update = async (id ,{userID, authorName, paperTitle, email, submittedDate, researchPFileLocation,submissionStatus,payment,paymentStatus}) =>{
        const result = await researchPaper.replaceOne({_id:ObjectId(id)},{
            userID, authorName, paperTitle, email, submittedDate, researchPFileLocation,submissionStatus,payment,paymentStatus});
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