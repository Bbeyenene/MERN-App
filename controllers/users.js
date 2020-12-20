const User = require('../models/user');
const Car = require('../models/car');

module.exports = {
    index: async (req, res, next) => {
        const users = await User.find({});
        res.status(200).json(users);
    },
    newUser: async (req, res, next) => {
        const newUser = new User(req.body);
        const user = await newUser.save();
        res.status(200).json(user)
    },
    getUser: async (req, res, next) => {
        const { userId } = req.params
        const user = await (await User.findById(userId));
        res.status(200).json(user)
    },
    replaceUser: async (req, res, next) => {
        //req.body must contain all fields
        const { userId } = req.params;
        const newUser = req.body;
        const result = await User.findByIdAndUpdate(userId, newUser)
        res.status(200).json(result)
    },
    updateUser: async (req, res, next) => {
        //req.body is not ought to contain all fields
        const { userId } = req.params;
        const newUser = req.body;
        const result = await User.findByIdAndUpdate(userId, newUser)
        res.status(200).json(result)
    },
    getUserCars: async (req, res, next) => {
        const { userId } = req.params;
        // 1. Wait for the user to find the user by id and populate the cars
        const user = await User.findById(userId).populate('cars');
        // 2. If the response is 'OK' sent 200 status and the users info in a json format
        res.status(200).json(user)
    },
    newUserCars: async (req, res, next) => {
        const { userId } = req.params;
        // 1. Create a new car
        const newCar = new Car(req.body);
        // 2. Get the userId that car to append to
        const user = await User.findById(userId);
        // 3. Assign the user as the newCar owner 
        newCar.owner = user;
        // 4. Save car after waitting for owner assignment
        await newCar.save();
        // 5. Push the newCar to the cars array in the User Schema.
        user.cars.push(newCar);
        // 6. Wait untill car is pushed to the user and save the change.
        await user.save();
        // 7. If every thing goes well 'OK' send 200 and the new car.
        res.status(200).json(newCar);
    }
}