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
			filesize,
			headers;

		if (type === 'youtube') {
			this.url = 'www.youtube.com/v/'+queryParams.v;
			cb();
		} else if (type === 'image') {

			http.get(this.url, function(resp) {
				filesize = resp.headers['content-length'];
				headers = {
					'Content-Length': filesize,
					'Content-Type': resp.headers['content-type'],
					'x-amz-acl': 'public-read'
				};

				if (filesize < 2000000) {
					// Make the AWS3 Call, and update the post with a url pointing to Amazon
					knoxClient.putStream(resp, fileName, headers, function(err, res){

						if (err) {
							console.log(err);
							return cb('There was an error uploading the image.');
						}

						postReference.url = res.req.url;

						cb();
					});
				} else {
					cb('Image too large');
				}
			});

		} else if (type === 'link') {
			if (this.url.indexOf('http') !== 0) {
				this.url = 'http://' + this.url;
			}
			cb();
		} else {
			this.approved = false;
			cb('Invalid post type');
		}
	};

	return PostSchema;
};
