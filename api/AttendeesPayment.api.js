const TicketId = require('uuid')
const {save, getAll, getById, removeById, getTicketsByUserId} = require('../dal/AttendeesPayment.dao');

const createAttendeesPayment = async ({userID, payment}) =>{
    let payments = {
        userID,
        payment,
        payDate: new Date().toISOString().slice(0, 10),
        ticketID: TicketId.v4()
    }
    return await save(payments);
};

const getAllPayment = async () => {
    return await getAll();
};

const getPaymentById = async (id) => {
    return await getById(id);
};

const deletePayment = async(id) =>{
    return await removeById(id);
};

const getTicketsByUser = async (id) => {
    return await getTicketsByUserId(id);
}

module.exports = {
    createAttendeesPayment,
    getAllPayment,
    getPaymentById,
    deletePayment,
    getTicketsByUser
};