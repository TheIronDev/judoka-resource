var passportLocalMongoose = require('passport-local-mongoose');

/**
 * Schema for new User Account (as well as passport middleware magic)
 * @param mongoose
 * @returns {Mongoose.Schema}
 */
module.exports = function(mongoose, JudoRanks) {

	var UserSchema = new mongoose.Schema({
		username: {
			type: String,
			unique: true
		},
		password: String,
		email: String,
		gravatarEmail: String,
		gravatarHash: String,
		rank: {
			type: String,
			enum: JudoRanks
		}
	});

	UserSchema.plugin(passportLocalMongoose);

	return UserSchema;
}