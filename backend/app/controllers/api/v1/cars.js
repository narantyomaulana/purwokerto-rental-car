const carsService = require("../../../services/cars")

module.exports = {
	async createCars(req, res) {
		req.body.createdBy = req.user.email;
		carsService.create(req.body)
			.then((createdCar) => {
				res.status(201).json({
					status: "Success",
					message: `Car Success Created by ${req.user.email}`,
					data: createdCar,
				});
			}).catch((err) => {
				res.status(400).json({
					status: "FAIL",
					message: err.message,
				});
			});
	},

	listAllCars(req, res) {
		carsService
			.listAll({
				where: {
					isDeleted: false
				},
			})
			.then(({data,count}) => {
				res.status(200).json({
					status: "OK",
					data: {
						cars: data
					},
					detail: {
						total: count
					},
				});
			})
			.catch((err) => {
				res.status(400).json({
					status: "FAIL",
					message: err.message,
				});
		});
	},

	getCarOne(req, res) {
		carsService
			.get(req.params.id)
			.then((post) => {
				res.status(200).json({
					status: "OK",
					data: post,
				});
			})
			.catch((err) => {
				res.status(422).json({
					status: "FAIL",
					message: err.message,
				});
		});
	},

	updateCars(req, res) {
    req.body.updatedBy = req.user.email;
    carsService
      .update(req.params.id, req.body)
      .then(() => {
        res.status(200).json({
          status: "OK",
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
    	});
  },

	deletedCar(req, res) {
    carsService
      .isDeletedCar(req.params.id, { isDeleted: true, deletedBy: req.user.email })
      .then((car) => {
        res.status(200).json({
					deletedBy: req.user.email,
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },



};