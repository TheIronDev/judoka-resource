var passportLocalMongoose = require('passport-local-mongoose');

/**
 * Schema for new User Accounts (as well as passport middleware magic)
 * @param mongoose
 * @returns {Mongoose.Schema}
 */
module.exports = function(mongoose) {

	var AccountSchema = new mongoose.Schema({
		username: String,
		password: String
	});

	AccountSchema.plugin(passportLocalMongoose);

	return AccountSchema;
}