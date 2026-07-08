const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
    createCar,
    getCars,
    getSingleCar,
    updateCar,
    deleteCar,
} = require("../controllers/carController");

router.post(
  "/cars",
  upload.single("image"),
  createCar
);

router.post("/cars", createCar);
router.get("/cars", getCars);
router.get("/cars/:id", getSingleCar);
router.put("/cars/:id", updateCar);
router.delete("/cars/:id", deleteCar);

module.exports = router;