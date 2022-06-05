const { cars } = require("../models");

module.exports = {
    create(inputData) {
        return cars.create(inputData);
    },

    findOne(key) {
        return cars.findOne(key);
    },
    findAll(args) {
        return cars.findAll(args);
    },
    
    getTotalCar(args) {
        return cars.count(args);
    },

    find(id) {
        return cars.findByPk(id);
    },
    update(id, updateArgs) {
        return cars.update(updateArgs, {
          where: {
            id,
          },
        });
    },
    
    isDeletedCar(id, updateArgs) {
        return cars.update(updateArgs, {
          where: {
            id,
          },
        });
      },
    
    
}