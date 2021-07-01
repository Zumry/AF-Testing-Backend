const {MongoClient} = require('mongodb');


const client = new MongoClient('mongodb://localhost:27017',{
    useNewUrlParser:true,
    useUnifiedTopology:true

});

client.connect(error => {
    if (error) {
        console.error(error);
        process.exit(-1)

    }

    console.log('Successfully connected to Mongo DB'); });


module.exports = client;