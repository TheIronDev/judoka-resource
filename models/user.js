
module.exports = function(mongoose, UserSchema) {
	var User = mongoose.model('User', UserSchema);

	return User;
}