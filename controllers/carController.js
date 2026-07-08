const Car = require("../models/Car");


const createCar = async (req, res) => {
    try {
        const car = await Car.create({
            name: req.body.name,
            brand: req.body.brand,
            price: req.body.price,
            year: req.body.year,
            fuelType: req.body.fuelType,
            transmission: req.body.transmission,
            mileage: req.body.mileage,
            description: req.body.description,

            image: req.file
                ? `http://localhost:9000/uploads/${req.file.filename}`
                : "",
        });

        res.status(201).json({
            success: true,
            car,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const getCars = async (req, res) => {
    try {
        const cars = await Car.find();

        res.status(200).json({
            success: true,
            cars,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const getSingleCar = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);

        if (!car) {
            return res.status(404).json({
                success: false,
                message: "Car not found",
            });
        }

        res.status(200).json({
            success: true,
            car,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const updateCar = async (req, res) => {
    try {
        const car = await Car.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Car Updated Successfully",
            car,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const deleteCar = async (req, res) => {
    try {
        await Car.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Car Deleted Successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createCar,
    getCars,
    getSingleCar,
    updateCar,
    deleteCar,
};