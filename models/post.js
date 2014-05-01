

module.exports = function(mongoose, PostSchema) {
	var PostModel = mongoose.model('post', PostSchema);

	return PostModel;
};
