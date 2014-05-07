var url = require('url');

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
		approved: Boolean,
		pageId: Number,
		userId: Number
	});

	PostSchema.methods.updateUrl = function(cb) {
		var type = this.type,
			parsedUrl = url.parse(this.url, true),
			queryParams = parsedUrl.query;

		switch (type) {
			case 'youtube':

				this.url = 'www.youtube.com/embed/'+queryParams.v
				break;
			case 'image':

				// Validation?
				break;
			case 'link':

				break
			default:
				this.approved = false;
		}
		cb();
	}

	return PostSchema;
};
