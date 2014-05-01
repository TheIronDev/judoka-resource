

module.exports = function(mongoose) {
	var PageSchema = mongoose.Schema({
		name: String,
		type: String,
		path: String,
		subtype: String,
		description: String
	});

	return PageSchema;
};
