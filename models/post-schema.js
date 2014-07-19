var url = require('url');

/**
 * The Schema for new posts.
 * @param mongoose
 * @returns {*}
 */
module.exports = function(mongoose) {
	var PostSchema = mongoose.Schema({
		title: String,
		type: {
			type: String,
			enum: ['youtube', 'image', 'link']
		},
		score: Number,
		url: String,
		timestamp: Date,
		approved: {
			type: Boolean,
			default: false
		},
		pageId: {
			type: Number,
			index: true
		},
		userId: String
	});

	PostSchema.methods.updateUrl = function(cb) {
		var type = this.type,
			parsedUrl = url.parse(this.url, true),
			queryParams = parsedUrl.query;

		if (type === 'youtube') {
			this.url = 'www.youtube.com/v/'+queryParams.v;
		} else if (type === 'image') {

		} else if (type === 'link') {

		} else {
			this.approved = false;
		}

		cb();
	};

	return PostSchema;
};
