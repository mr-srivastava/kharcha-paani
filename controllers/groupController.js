const mongoose = require('mongoose');
const Group = require('../models/group');

exports.createGroup = async (req, res) => {
  try {
    const { body } = req;
    const group = await Group.create(body);
    return res.status(200).json({
      id: group._id,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

exports.getGroups = async (req, res) => {
  try {
    const groups = await Group.find();
    return res.status(200).json({
      groups,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

exports.getGroupById = async (req, res) => {
  try {
    const id = mongoose.Types.ObjectId(req.params);
    const [group] = await Group.find({ _id: id });
    return res.status(200).json(group);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

exports.updateGroup = async (req, res) => {
  try {
    const id = mongoose.Types.ObjectId(req.params);
    const { body } = req;
    const group = await Group.findOneAndUpdate({ _id: id }, body);
    return res.status(200).json(group);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
