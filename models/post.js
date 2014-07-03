/**
 * Instantiate a new PostModel using our PostSchema
 * @param mongoose
 * @param PostSchema
 * @returns {*|Model}
 */
module.exports = function(mongoose, PostSchema) {
	var PostModel = mongoose.model('post', PostSchema);

	return PostModel;
};
