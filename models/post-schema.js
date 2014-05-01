

module.exports = function(mongoose, userSchema, pageSchema) {
	var PostSchema = mongoose.Schema({
		title: String,
		type: {
			type: String,
			enum: ['youtube', 'image', 'link']
		},
		score: Number,
		url: String,
		timestamp: Date,
		approved: Boolean,
		pageId: pageSchema,
		userId: userSchema
	});

	return PostSchema;
};
