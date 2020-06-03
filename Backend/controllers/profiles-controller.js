const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const HttpError = require("../models/http-error");
const Profile = require("../models/profile");
const User = require("../models/user");

let DUMMY_PROFILE = [
  {
    id: "p1",
    title: "Empire State building",
    description: "One of the famous place",
    address: "20 W 34th St, New York, NY 10001",
    creator: "u1",
  },
];

const getProfileById = async (req, res, next) => {
  const profileId = req.params.pid; // {pid: ''p1}

  let profile;
  try {
    profile = await Profile.findById(profileId);
  } catch (err) {
    const error = new HttpError(
      "Somthing went wrong, could not find a profile",
      500
    );
    return next(error);
  }
  if (!profile) {
    const error = new HttpError(
      "Could not find a profile for the provided id",
      404
    );
    return next(error);
  }

  res.json({ profile: profile.toObject({ getters: true }) });
};

const getProfilesByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let userWithProfile;
  try {
    userWithProfile = await User.findById(userId).populate("_profile");
  } catch (err) {
    const error = new HttpError(
      "Fetching Profile failed, please try again later",
      500
    );
    return next(error);
  }
  if (!userWithProfile || userWithProfile._profile.length === 0) {
    return next(new HttpError("Could not find profiles for the user id", 404));
  }

  res.json({
    _profile: userWithProfile._profile.map((prof) =>
      prof.toObject({ getters: true })
    ),
  });
};

const createProfile = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { title, description, address, creator } = req.body;
  // const tittle = req.body.tittle;

  const createdProfile = new Profile({
    title,
    description,
    address,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/400px-Empire_State_Building_%28aerial_view%29.jpg",
    creator,
  });

  let user;
  try {
    user = await User.findById(creator);
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Creating profile failed, please try again",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Could not find user for a provided id", 404);
    return next(error);
  }
  console.log(user);

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdProfile.save({ session: sess });
    user._profile.push(createdProfile);
    await user.save({ session: sess });
    sess.commitTransaction();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Creating profile failed, please try again ",
      500
    );
    return next(error);
  }

  res.status(201).json({ profile: createdProfile });
};

const updateProfile = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { title, description } = req.body;
  const profileId = req.params.pid;

  let profile;
  try {
    profile = await Profile.findById(profileId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update profile",
      500
    );
    return next(error);
  }
  profile.title = title;
  profile.description = description;

  try {
    await profile.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update profile.",
      500
    );
    return next(error);
  }

  res.status(200).json({ profile: profile.toObject({ getters: true }) });
};

const deleteProfile = async (req, res, next) => {
  const profileId = req.params.pid;

  let profile;
  try {
    profile = await Profile.findById(profileId).populate("creator");
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete profile.",
      500
    );
    return next(error);
  }

  if (!profile) {
    const error = new HttpError("could not find profile for this id", 404);
    return next(error);
  }
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await profile.remove({ session: sess });
    profile.creator._profile.pull(profile);
    await profile.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete profile.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted Profile." });
};

exports.getProfileById = getProfileById;
exports.getProfilesByUserId = getProfilesByUserId;
exports.createProfile = createProfile;
exports.updateProfile = updateProfile;
exports.deleteProfile = deleteProfile;
