const express = require("express");
const router = express.Router();
const { createNotice, getNotices } = require("./noticeController");
const { protect } = require("./authMiddleware");

// public route
router.get("/", getNotices);

// only for admin route
router.post("/", protect, createNotice);

module.exports = router;
