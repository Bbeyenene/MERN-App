const router = require("express-promise-router")();

const {
  index,
  newUser,
  getUser,
  replaceUser,
  updateUser,
  getUserCars,
  newUserCars,
} = require("../controllers/users");

router.route("/").get(index).post(newUser);

router.route("/:userId").get(getUser).put(replaceUser).patch(updateUser);

router.route("/:userId/cars").get(getUserCars).post(newUserCars);

module.exports = router;
