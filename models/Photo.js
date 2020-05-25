/**
 * Photo Model
 */

module.exports = (bookshelf) => {
	return bookshelf.model('Photo', {
		tableName: 'photos',
		album() {
			return this.belongsTo('Album');
		}
	});
}
