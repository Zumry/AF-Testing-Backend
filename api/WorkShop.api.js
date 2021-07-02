const { save, getAll, getByUserId, getById, removeById, update} = require('../dal/Workshop.dao');

/**
 * @important  file input should be separated when saving the file i'm only saving the location of the file
 */

    /**
     * Adding Workshop proposal
     */
    const addWorkShopPaper = async ({userID, presenterName, workShopTitle, affiliation,contactNumber,conductorNames,fileLocation}) =>{
        let WorkShop ={
            userID,
            presenterName,
            workShopTitle,
            affiliation,
            contactNumber,
            conductorNames,
            submittedDate: new Date().toISOString().slice(0, 10),
            proposalStatus:"pending",
            fileLocation
        }

        return await save(WorkShop);
    }

    /**
     * Get all Workshop proposal
     */
    const getAllWorkShop = async () =>{
        return await getAll();
    }

    /**
     * Get Workshop proposal by the User
     */
    const getWorkShopByUserId = async (userID) => {
        return await getByUserId(userID);
    }

    /**
     * Get Workshop proposal by ID
     */
    const getWorkShopById = async (id) => {
        return await getById(id);
    }


    /**
     * Update Workshop proposal by Workshop presenter
     */
    const updateWorkShop = async (id,{userID, presenterName, workShopTitle, affiliation,contactNumber,conductorNames,fileLocation}) =>{
        return await update(id,
            {
                userID,
                presenterName,
                workShopTitle,
                affiliation,
                contactNumber,
                conductorNames,
                submittedDate: new Date().toISOString().slice(0, 10),
                proposalStatus:"pending",
                fileLocation
            });
    }

    /**
     *  update Workshop proposal
     *  this method is used to a particular workshop update approval status
     */
    const updateWorkshopApprovals = async (id,{userID, presenterName, workShopTitle,affiliation, contactNumber,conductorNames, submittedDate, proposalStatus, fileLocation}) =>{
        return await update(id,
            {
                userID,
                presenterName,
                workShopTitle,
                affiliation,
                contactNumber,
                conductorNames,
                submittedDate,
                proposalStatus,
                fileLocation
            });
    }

    /**
     *  Approval of Workshop proposal
     *  this method is used to update a particular Research paper approval
     *  when the Reviewer approve or Reject the proposal
     */
    const approvalStatus = async (id,{aStatus}) =>{
        let Workshop = await getWorkShopById(id);
        Workshop.proposalStatus = aStatus;
        return await updateWorkshopApprovals(id,Workshop);
    }

    /**
     * Remove Workshop proposal
     */
    const removeWorkShopById = async (id) => {
        return await removeById(id);
    }

module.exports = {
    addWorkShopPaper,
    getAllWorkShop,
    getWorkShopByUserId,
    getWorkShopById,
    updateWorkShop,
    approvalStatus,
    removeWorkShopById
};