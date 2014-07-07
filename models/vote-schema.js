
/**
 * Schema for VoteSchema table
 * @param mongoose
 * @returns {Mongoose.Schema}
 */
module.exports = function(mongoose) {

	var VoteSchema = new mongoose.Schema({
		userId: {
			type: String,
			index: true
		},
		postId: {
			type: String,
			index: true
		},
		userPostId: {
			type: String,
			unique: true
		},
		score: {
			type: Number,
			enum: [-1, 0, 1]
		}
	});

	VoteSchema.methods.setUserPostId = function(cb) {
		var userId = this.userId,
			postId = this.postId;

		this.userPostId = userId + '-' + postId;
		cb();
	}

	return VoteSchema;
}