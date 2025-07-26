const Notice = require('./notice');

async function createNotice(req, res) {
  const { content } = req.body;
  try {
    const notice = await Notice.create({ content });
    res.status(201).json(notice);
  } catch (err) {
    res.status(500).json({ message: "Failed to create notice", error: err });
  }
}

async function getNotices(req, res) {
  try {
    const notices = await Notice.findAll({ order: [["createdAt", "DESC"]] });
    res.status(200).json(notices);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch notices", error: err });
  }
}

module.exports = { createNotice, getNotices };
