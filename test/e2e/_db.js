const connect = require('../../lib/utils/connect');
connect('mongodb://localhost:27017/circus');
const mongoose = require('mongoose');
//don't forget api key when ready

after(() => {
    return mongoose.connection.close();
});

module.exports = {
    dropCollection(name) {
        return mongoose.connection.dropCollection(name)
            .catch(err => {
                if(err.codeName !== 'NamespaceNotFound') throw err;
            });
    }
};