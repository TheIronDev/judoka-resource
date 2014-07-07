
module.exports = function(mongoose, VoteSchema) {
	var Vote = mongoose.model('Vote', VoteSchema);

	return Vote;
}