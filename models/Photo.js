/**
 * Photo Model
 */

module.exports = (bookshelf) => {
	return bookshelf.model('Photo', {
		tableName: 'photos',
		album() {
			return this.belongsToMany('Album');
		},
		user() {
			return this.belongsTo('User');
		}
	}, {
		async fetchById(id, fetchOptions = {}) {
			return new this({ id }).fetch(fetchOptions);
		},
	});
}
