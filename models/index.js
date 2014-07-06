/**
 *  Suck in all the Mongoose models and return a JSON set of all of them.
 * @param mongoose
 * @returns a JSON set of models
 */
module.exports = function(mongoose, passport) {
	var PostSchema = require('./post-schema')(mongoose),
		JudoRanks = require('../collections/judoRanks'),
		UserSchema = require('./user-schema')(mongoose, JudoRanks),
		LocalStrategy = require('passport-local').Strategy;

	var PostModel = require('./post')(mongoose, PostSchema),
		UserModel = require('./user')(mongoose, UserSchema);

	passport.use(new LocalStrategy(UserModel.authenticate()));
	passport.serializeUser(UserModel.serializeUser());
	passport.deserializeUser(UserModel.deserializeUser());

	return {
		PostModel: PostModel,
		UserModel: UserModel,
		JudoRanks: JudoRanks
	};
};