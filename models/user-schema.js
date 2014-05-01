
module.exports = function(mongoose) {
	var UserSchema = mongoose.Schema({
		name: String,
		email: String,
		password: String
	});

	return UserSchema;
};
