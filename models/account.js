
module.exports = function(mongoose, AccountSchema) {
	var Account = mongoose.model('Account', AccountSchema);

	return Account;
}