const Volunteer = require("../models/Volunteer");
const { Parser } = require("json2csv");

const registerVolunteer = async (req, res) => {
  try {
    const volunteer = await Volunteer.create(req.body);

    res.status(201).json(volunteer);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find().sort({
      createdAt: -1,
    });

    res.json(volunteers);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const exportVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find().lean();

    const fields = [
      "fullName",
      "email",
      "phone",
      "skills",
      "availability",
      "createdAt",
    ];

    const parser = new Parser({ fields });

    const csv = parser.parse(volunteers);

    res.header(
      "Content-Type",
      "text/csv"
    );

    res.attachment("volunteers-report.csv");

    return res.send(csv);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  registerVolunteer,
  getVolunteers,
  exportVolunteers,
};