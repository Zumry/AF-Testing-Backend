/*
* IT 19167442
* author : Nusky
* */
const  UUID = require ('uuid')
//const  posts = new Map();
const {getAll, getById, removeById, save, update} = require('../dal/Conference.dao');

const  createPost = async ({workshopId,creator,conference_title,message,status,postedDate}) =>{
    const post ={
    id: UUID.v4(),
        workshopId,
        creator:creator,
        conference_title:conference_title,
        message:message,
        status:status,
        //postedDate: new Date()
        postedDate:postedDate
    }
   // posts.set(post.id,post);
    //return post;
    return await save(post);

}
//get all data
const getPosts = async () => {
    //Spreading Iterator
    //return [...posts.values()];
    return await getAll();
};
//get data by id
const getPost =async (id) => {
    //return posts.get(id);
    return await getById(id);
}
//delete data
const deletePost  =async (id) => {
    return await removeById(id);
}
//update data
const updatePost  =async (id,{workshopId,creator,conference_title,message,status,postedDate}) => {
    const post ={
        workshopId:workshopId,
        creator:creator,
        conference_title:conference_title,
        message:message,
        status:status,
        //postedDate: new Date()
        postedDate:postedDate
    }
    return await update(id,post);
}

//update conference approvals
const updateConferenceApprovals  =async (id,{workshopId,creator,conference_title,message,status,postedDate}) => {
    return await update(id,
        {
            workshopId,
        creator:creator,
        conference_title:conference_title,
        message:message,
        status:status,
        //postedDate: new Date()
        postedDate:postedDate
        });
}

/**
 *  Approval of conference proposal
 *  this method is used to update a particular conferenceapproval
 *  when the Editor approve or Reject the proposal
 */
const approvalStatus = async (id,{aStatus}) =>{
    let Conference = await getPost(id);
    console.log(Conference);
    Conference.status= aStatus;
    return await updatePost(id,Conference);
}

module.exports = {
    createPost,
    getPost,
    getPosts,
    deletePost,
    updatePost,
    updateConferenceApprovals,
    approvalStatus

};