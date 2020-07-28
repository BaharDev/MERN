const mongoose = require('mongoose');
const config = require('config');

const dbURI = config.get("mongoURI");

const db = async () => {
	try {
		await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("db has connected");
	} catch (err) {
        console.log(`Some error happened while trying connection to db ${err.message}`);
        //to end server
        process.exit(1);
	}
};


module.exports = db;
