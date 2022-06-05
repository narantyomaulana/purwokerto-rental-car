const usersRepository = require("../repositories/users");

module.exports = {
    create(requestBody) {
        return usersRepository.create(requestBody);
    },
    getOne(key) {
        return usersRepository.findOne(key);
    },
    get(id) {
        return usersRepository.find(id);
    },
    update(id, requestBody) {
        return usersRepository.update(id, requestBody);
    },
};