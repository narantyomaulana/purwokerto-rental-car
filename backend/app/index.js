require('dotenv').config()

const cors = require('cors')
const axios = require("axios").default;
const express = require("express");
const morgan = require("morgan");
const router = require("../config/routes");
const port = process.env.PORT;
const { DateCars, filterCars } = require("./controllers/api/v1/filter");
// const path = require("path");

// const publicDir = path.join(__dirname, "../public");
// const viewsDir = path.join(__dirname, "./views");
const app = express();
console.clear();

/** Install JSON request parser */
app.use(express.json());
app.use(cors())

/** Install request logger */
app.use(morgan("dev"));

/** Install View Engine */
// app.set("views", viewsDir);
// app.set("view engine", "ejs");

/** Set Public Directory */
// app.use(express.static(publicDir));

/** Install Router */
app.use(router);

app.get("/", (req, res) => {
    res.send({
      message: "Success",
    });
});

app.post("/api/v1/filter", async (req, res) => {
    const cars = (await axios.get("https://raw.githubusercontent.com/fnurhidayat/probable-garbanzo/main/data/cars.min.json")).data;
    const newCars = await DateCars(cars);
    const filteredCars = await filterCars(newCars, req.body);
    res.send(filteredCars);
});

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`)
    console.log(`Server on at ${Date(Date.now)}`);
})
module.exports = app;
