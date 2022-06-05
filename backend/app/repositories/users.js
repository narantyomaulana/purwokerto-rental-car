const { users } = require("../models");

module.exports = {
    create(inputData) {
        return users.create(inputData);
    },
    findOne(key) {
        return users.findOne(key);
    },
    
    find(id) {
        return users.findByPk(id);
    },
    
    update(id, updatedData) {
        return users.update(updatedData, {
            where: {
                id,
            },
        });
    },
};