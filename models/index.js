/**
 *  Suck in all the Mongoose models and return a JSON set of all of them.
 * @param mongoose
 * @returns a JSON set of models
 */
module.exports = function(mongoose, passport) {
	var PostSchema = require('./post-schema')(mongoose),
		AccountSchema = require('./account-schema')(mongoose),
		LocalStrategy = require('passport-local').Strategy;

	var PostModel = require('./post')(mongoose, PostSchema),
		AccountModel = require('./account')(mongoose, AccountSchema);

	passport.use(new LocalStrategy(AccountModel.authenticate()));
	passport.serializeUser(AccountModel.serializeUser());
	passport.deserializeUser(AccountModel.deserializeUser());

	return {
		PostModel: PostModel,
		AccountModel: AccountModel
	};
};