/**
 *  Suck in all the Mongoose models and return a JSON set of all of them.
 * @param mongoose
 * @returns a JSON set of models
 */
module.exports = function(mongoose) {
	var UserSchema = require('./user-schema')(mongoose),
		PageSchema = require('./page-schema')(mongoose),
		PostSchema = require('./post-schema')(mongoose, UserSchema, PageSchema);

	var PostModel = require('./post')(mongoose, PostSchema);

	return {
		PostModel: PostModel
	};
};