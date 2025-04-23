const Tasks = require("./../models/tasks");
const Blacklist = require("./../models/blacklist");
const mailer = require("./../utils/index");
const validator = require("validator");
const { v4: uuidv4 } = require("uuid");

const getAll = async (req, res) => {
  const tasks = await Tasks.find().populate("user");
  res.json(tasks);
};

const findOne = async (req, res) => {
  const { token } = req.params;

  const isBlacklisted = await Blacklist.find({ token });
  if (isBlacklisted.length) {
    return res.status(403).json({ message: "Link has expired." });
  }

  const task = await Tasks.findOne({ token });
  if (!task) {
    return res.status(404).json({ message: "No task was found." });
  }

  res.json(task);
};

const create = async (req, res) => {
  const { title, description, status, email } = req.body;
  const task = new Tasks({
    title,
    description,
    status,
    token: uuidv4(),
    created_by: req.currentUser._id,
  });

  if (email && validator.isEmail(email)) {
    task.user = email;
    sendMail(task.title, task.token, email);
  }

  const newTask = await task.save();
  if (!newTask) {
    res.status(500).json({ message: "An error occured in creating new task." });
  }

  res.json(newTask);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(401).json({ message: "Missing id." });
  }

  const task = await Tasks.findById(id);
  if (!task) {
    res.status(404).json({ message: "Unable to find task." });
  }

  task.set(req.body);
  const { user } = req.body;
  if (user && validator.isEmail(user)) {
    sendMail(task.title, task.token, user);
  }

  const updatedTask = await task.save();
  if (!updatedTask) {
    res.json({ message: "Unable to update task." });
  }

  res.json(updatedTask);
};

const removeById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(401).json({ message: "Missing id." });
  }

  const removedTask = await Tasks.deleteOne({ _id: id });
  if (!removedTask) {
    res.status(500).json({ message: "An error occured in deleting task." });
  }

  res.json({ message: "Task removed successfully." });
};

const updateStatusByToken = async (req, res) => {
  const { token } = req.params;
  const { status } = req.body;
  if (!token) {
    return res.status(401).json({ message: "Missing token." });
  }

  if (!status) {
    return res.status(401).json({ message: "Missing status." });
  }

  const task = await Tasks.findOne({ token });
  if (!task) {
    res.status(404).json({ message: "Unable to find task." });
  }

  const blacklist = await Blacklist.findOne({ token });
  if (blacklist) {
    return res
      .status(403)
      .json({ message: "This task's status has already been updated once." });
  }

  // blacklist token once ticket's status is either approved or rejected
  if (req.body.status) {
    const token = new Blacklist({
      token: task.token,
    });
    await Blacklist.create(token);
  }

  task.set(req.body);
  const updatedTask = await task.save();
  if (!updatedTask) {
    return res.status(500).json({ message: "Unable to update task." });
  }

  res.json(updatedTask);
};

const assignTaskByEmail = async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;

  if (!id || !email || !validator.isEmail(email)) {
    return res.status(401).json({ message: "Invalid request." });
  }

  const task = await Tasks.findOne({ _id: id });
  if (!task) {
    res.status(404).json({ message: "No task was found." });
  }

  task.set({ user: email });
  const updatedTask = await task.save();
  if (!updatedTask) {
    res.status(500).json({ message: "Unable to update task." });
  }

  sendMail(task.title, task.token, email);
  res.json({
    message: "Task assigned and an email for task approval request was sent.",
  });
};

const sendMail = (title, token, receiver) => {
  console.log(title, token, receiver);
  const subject = "Task Approval Request";
  const body = `You have a new task: <b>${title}</b>. <br>Please review and respond using the link below: ${process.env.WEB_URL}/task?token=${token}`;
  const opt = {
    subject,
    body,
    receiver,
  };
  mailer.send(opt);
};

module.exports = {
  getAll,
  findOne,
  create,
  updateById,
  removeById,
  updateStatusByToken,
  assignTaskByEmail,
};
