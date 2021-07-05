const { save, getAll, getByUserId,getById, removeById, update} = require('../dal/ResearchPaper.dao');


    /**
     *  Adding Research paper submissions
     */
    const addResearchPaper = async ({userID,authorName, paperTitle, email,researchPFileLocation}) =>{
        let ResearchPaper ={
            userID,
            authorName,
            paperTitle,
            email,
            submittedDate: new Date().toISOString().slice(0, 10),
            researchPFileLocation,
            submissionStatus:"pending",
            payment:0,
            paymentStatus:"Not Available"
        }
        return await save(ResearchPaper);
    }

    /**
     *  Get All Research paper submissions
     */
    const getAllResearchPaper = async () => {
        return await getAll();
    }

    /**
     *  Get Research paper submissions By userId
     */
    const getResearchPaperByUserId = async (userID) => {
        return await getByUserId(userID);
    }

    /**
     *  Get Research paper submissions By Id
     */
    const getResearchPaperById = async (id) => {
        return await getById(id);
    }

    /**
     *  update Research paper submissions of researcher
     */
    const updateResearchPaper = async (id,{userID,authorName, paperTitle, email,researchPFileLocation}) =>{
        return await update(id,
            {
                userID,
                authorName,
                paperTitle,
                email,
                submittedDate: new Date().toISOString().slice(0, 10),
                researchPFileLocation,
                submissionStatus:"Pending",
                payment:0,
                paymentStatus:"Not Available"
            });
    }

    /**
     *  update Research paper submissions
     *  this method is used to a particular Research paper update approval status or add payment and update payment status
     */
    const updateResearchApprovals = async (id,{userID,authorName, paperTitle, email,submittedDate, researchPFileLocation, submissionStatus, payment, paymentStatus}) =>{
        return await update(id,
            {
                userID,
                authorName,
                paperTitle,
                email,
                submittedDate,
                researchPFileLocation,
                submissionStatus,
                payment,
                paymentStatus
            });
    }

    /**
     *  Approval of Research paper submissions
     *  this method is used to update a particular Research paper approval
     *  when the Reviewer approve or Reject the submission
     */
    const approvalStatus = async (id,{aStatus}) =>{
        let ResearchPaper = await getResearchPaperById(id);
        ResearchPaper.submissionStatus = aStatus;
        return await updateResearchApprovals(id,ResearchPaper);
    }

    /**
     *  Payment of Research paper submissions
     *  this method is used to update a particular Research paper payment status and add payment amount
     *  when the Researcher submission is approved and Researcher paying to present at conference
     */
    const paymentForSubmission = async (id,{pStatus,amount}) =>{
        let ResearchPaper = await getResearchPaperByUserId(id);
        ResearchPaper.paymentStatus = pStatus
        ResearchPaper.payment = amount;
        return await updateResearchApprovals(ResearchPaper[0]._id,ResearchPaper[0]);

    }

    /**
     *  Remove Research paper submissions
     */
    const removeResearchPaperById = async (id) => {
        return await removeById(id);
    }

module.exports = {
    addResearchPaper,
    getAllResearchPaper,
    getResearchPaperByUserId,
    getResearchPaperById,
    approvalStatus,
    updateResearchPaper,
    paymentForSubmission,
    removeResearchPaperById
};