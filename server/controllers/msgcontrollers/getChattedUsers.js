const Message = require("../../models/messages");
const User = require("../../models/users");

const getChattedUsers = async (req, res) => {
  try {
    const userId = req.user._id;

    const messages = await Message.find({
      $or: [{ senderId: userId }, { receiverId: userId }]
    });

    const userIds = new Set();
    messages.forEach(msg => {
      if (msg.senderId.toString() !== userId.toString()) {
        userIds.add(msg.senderId.toString());
      }
      if (msg.receiverId.toString() !== userId.toString()) {
        userIds.add(msg.receiverId.toString());
      }
    });

    const users = await User.find({ _id: { $in: [...userIds] } })
      .select("_id username profilePic");

    res.status(200).json(users);
  } catch {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = getChattedUsers;
