let PaymentColl;
setTimeout(() =>{PaymentColl = require('./').db('conferenceMT').collection('attendeesPaymentCollection')},1000)

const save = async ({userID, payment, payDate, ticketID}) => {
    const result = await PaymentColl.insertOne({userID, payment, payDate, ticketID});
    return result.ops[0];
};

const getAll = async () => {
    const cursor = await PaymentColl.find();
    return cursor.toArray();
};

const getById = async (id) => {
    return await PaymentColl.findOne({id});
};

const removeById = async (id) => {
    return await PaymentColl.deleteOne({id});
};

const getTicketsByUserId = async id => {
    const result = await PaymentColl.find({userID:id});
    return result.toArray();
}


module.exports = {
    save,
    getAll,
    getById,
    removeById,
    getTicketsByUserId
};