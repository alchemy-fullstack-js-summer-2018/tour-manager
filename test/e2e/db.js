const connect = require('../../lib/util/connect');
connect('mongodb://localhost:27017/WU_API_KEY=5e1af6276eda1937');
const mongoose = require('mongoose');

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
