var url = require('url'),
	http = require('http'),
	path = require('path'),
	knox = require('knox'),
	md5 = require('MD5');

var knoxClient = knox.createClient({
	key: process.env.AWS_ACCESS_KEY_ID,
	secret: process.env.AWS_SECRET_ACCESS_KEY,
	bucket: process.env.S3_BUCKET
});

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
			queryParams = parsedUrl.query,
			postReference = this,
			fileName = md5(this.url),
			headers;

		if (type === 'youtube') {
			this.url = 'www.youtube.com/v/'+queryParams.v;
			cb();
		} else if (type === 'image') {

			http.get(this.url, function(resp) {

				headers = {
					'Content-Length': resp.headers['content-length'],
					'Content-Type': resp.headers['content-type'],
					'x-amz-acl': 'public-read'
				};

				// Make the AWS3 Call, and update the post with a url pointing to Amazon
				knoxClient.putStream(resp, fileName, headers, function(err, res){

					if (err) {
						return console.log(err);
					}

					postReference.url = res.req.url;

					cb();
				});
			});

		} else if (type === 'link') {
			cb();
		} else {
			this.approved = false;
			cb();
		}
	};

	return PostSchema;
};
