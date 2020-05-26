/**
 * Photo Model
 */

const bcrypt = require('bcrypt');

module.exports = (bookshelf) => {
	return bookshelf.model('User', {
		tableName: 'users',
		photos() {
			return this.hasMany('Photo');
		},
		album() {
			return this.hasMany('Album');
		}
	}, {
		hashSaltRounds: 10,

		async fetchById(id, fetchOptions = {}) {
			return new this({ id }).fetch(fetchOptions);
		},

		async login(email, password) {
			// check if user exists
			const user = await new this({ email }).fetch({ require: false });

			if (!user) {
				return false;
			}

			// get hashed password from db
			const hash = user.get('password');

			// generate hash of cleartext password
			// compare new hash with hash from db
			const result = await bcrypt.compare(password, hash);
			// return user if hash matches, otherwise fail
			return (result)
				? user
				: false;
		}
	});

}
