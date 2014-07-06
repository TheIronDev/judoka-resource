var passportLocalMongoose = require('passport-local-mongoose');

/**
 * Schema for new User Account (as well as passport middleware magic)
 * @param mongoose
 * @returns {Mongoose.Schema}
 */
module.exports = function(mongoose) {

	var UserSchema = new mongoose.Schema({
		username: {
			type: String,
			unique: true
		},
		password: String
	});

	UserSchema.plugin(passportLocalMongoose);

	return UserSchema;
}