const randomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
};

const DateCars = (cars) => {
    let newCar = cars.map((car) => {
        let availableAt = randomDate(new Date(new Date().getTime()), new Date(2029, 11, 31));
        return { ...car, availableAt };
      });
    return newCar;
}

const filterCars = (cars, { typeDriver, date, pickupTime, pass }) => {
    return cars
      .filter((car) => car.available === true) // Filter the available attribute
      .filter((car) => {
        // Filter  typeDriver
        if (typeDriver === "Keyless Entry") {
          if (car.options.includes(typeDriver)) {
            return car;
          }
        } else {
          return !car.options.includes("Keyless Entry");
        }
      })
      .filter((car) => {
        // Filter date
        const dateCar = new Date(car.availableAt);
        const datePicked = new Date(date);
        if (dateCar >= datePicked) {
          return car;
        }
      })
      .filter((car) => {
        // Filter time
        let dateCar = new Date(car.availableAt).getHours();
        if (dateCar >= Number(pickupTime)) {
          return car;
        }
      })
      .filter((car) => car.capacity >= pass);
};

module.exports = { DateCars, filterCars };