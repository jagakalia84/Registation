const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  registerVolunteer,
  getVolunteers,
  exportVolunteers,
} = require("../controllers/volunteerController");

router.post("/", registerVolunteer);

router.get("/", authMiddleware, getVolunteers);

router.get(
  "/export",
  authMiddleware,
  exportVolunteers
);

module.exports = router;