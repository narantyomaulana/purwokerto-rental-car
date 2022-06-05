const carsRepository = require("../repositories/cars");

module.exports = {
    create(requestBody) {
        return carsRepository.create(requestBody);
    },
    getOne(key) {
        return carsRepository.findOne(key);
    },
    async listAll(args) {
        try {
          const cars = await carsRepository.findAll(args);
          const carCount = await carsRepository.getTotalCar(args);
    
          return {
            data: cars,
            count: carCount,
          };
        } catch (err) {
          throw err;
        }
    },
    get(id) {
        return carsRepository.find(id);
    },
    update(id, requestBody) {
        return carsRepository.update(id, requestBody);
    },
    isDeletedCar(id, requestBody) {
        return carsRepository.isDeletedCar(id, requestBody);
    },   
}