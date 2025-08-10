const User = require("../../models/users");

const searchUsers = async (req, res) => {
  try {
    const { query } = req.query;
    const userId = req.user._id;

    if (!query) return res.json([]);

    const results = await User.find({
      _id: { $ne: userId },
      username: { $regex: query, $options: "i" }
    }).select("_id username profilePic");

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: "Search failed" });
  }
};

module.exports = searchUsers;
