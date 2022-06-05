const express = require("express");
const controllers = require("../app/controllers");
const middlewares = require("../app/middlewares");
const appRoute = express.Router();

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../data/swagger.json");

// API ROUTES USER
 appRoute.post("/api/v1/register",
 middlewares.checkCondition.checkCondition,
 controllers.api.v1.users.createUser
);

appRoute.post("/api/v1/login",
    middlewares.checkValidation.checkData,
    controllers.api.v1.users.login
);

appRoute.get("/api/v1/whoami",
    middlewares.authorization.authorize,
    controllers.api.v1.users.whoAmI
);

appRoute.put("/api/v1/users/:id/update-admin",
    middlewares.authorization.checkSuperAdmin,
    controllers.api.v1.users.intoAdmin
);

// API ROUTES CARS
appRoute.post("/api/v1/cars",
    middlewares.authorization.checkAdmin,
    controllers.api.v1.cars.createCars
);
appRoute.get("/api/v1/cars",
    middlewares.authorization.authorize,
    controllers.api.v1.cars.listAllCars
);

appRoute.get("/api/v1/cars/:id",
    middlewares.authorization.authorize,
    controllers.api.v1.cars.getCarOne
);

appRoute.put("/api/v1/cars/:id",
    middlewares.authorization.checkAdmin,
    controllers.api.v1.cars.updateCars
);

appRoute.delete("/api/v1/cars/:id",
    middlewares.authorization.checkAdmin,
    controllers.api.v1.cars.deletedCar
);

// SWAGGER ROUTES
appRoute.use("/api-docs", swaggerUi.serve);
appRoute.get("/api-docs", swaggerUi.setup(swaggerDocument));

module.exports = appRoute