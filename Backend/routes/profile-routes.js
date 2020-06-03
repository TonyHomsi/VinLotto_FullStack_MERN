const express = require("express");
const { check } = require("express-validator");

const profileControllers = require("../controllers/profiles-controller");

const router = express.Router();

router.get("/:pid", profileControllers.getProfileById);

router.get("/user/:uid", profileControllers.getProfilesByUserId);
router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  profileControllers.createProfile
);

router.patch(
  "/:pid",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  profileControllers.updateProfile
);

router.delete("/:pid", profileControllers.deleteProfile);

module.exports = router;
