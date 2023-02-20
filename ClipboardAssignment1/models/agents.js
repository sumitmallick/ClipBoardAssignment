const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    facility: { type: mongoose.Schema.Types.ObjectId, ref: 'Facility' },
    facilityAgentId: { type: String, required: true }
  },
  { timestamps: true }
);

const Agent = mongoose.model('Agent', agentSchema);

module.exports = Agent;
