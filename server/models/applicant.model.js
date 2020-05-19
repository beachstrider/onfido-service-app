import bookshelf from '../config/bookshelf';

const TABLE_NAME = 'applicants';

/**
 * User model.
 */
class Applicant extends bookshelf.Model {
    get tableName() {
        return TABLE_NAME;
    }

    verifyToken(token) {
        return this.get('token') === token;
    }
}

export default Applicant;