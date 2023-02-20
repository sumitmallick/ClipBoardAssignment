const Shift = require('../models/shifts');

exports.getAllShifts = (req, res, next) => {
  Shift.find()
    .populate('facility')
    .populate('agent')
    .exec((err, shifts) => {
      if (err) {
        return next(err);
      }
      res.json(shifts);
    });
};

exports.getShiftById = (req, res, next) => {
  Shift.findById(req.params.id)
    .populate('facility')
    .populate('agent')
    .exec((err, shift) => {
      if (err) {
        return next(err);
      }
      res.json(shift);
    });
};

exports.updateShift = (req, res, next) => {
  Shift.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, shift) => {
    if (err) {
      return next(err);
    }
    res.json(shift);
  });
};

exports.deleteShift = (req, res, next) => {
  Shift.findByIdAndDelete(req.params.id, (err, shift) => {
    if (err) {
      return next(err);
    }
    res.json(shift);
  });
};

exports.createShift = async (req, res) => {
    try {
      const { agent, facility, start, end, notes, facilityAgentId } = req.body;
  
      const shift = new Shift({
        agent,
        facility,
        start,
        end,
        notes
      });
  
      const savedShift = await shift.save();
  
      // update the agent's facilityAgentId field
      await Agent.updateOne({ _id: agent }, { facilityAgentId });
  
      res.status(201).json(savedShift);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getShiftsByFacility = async (req, res) => {
    try {
      const { facilityId } = req.params;
  
      const shifts = await Shift.find({ facility: facilityId })
        .populate('agent')
        .select('-facility')
        .lean();
  
      const formattedShifts = shifts.map(shift => {
        return {
          id: shift._id,
          start: shift.start,
          end: shift.end,
          notes: shift.notes,
          agent: {
            id: shift.agent._id,
            firstName: shift.agent.firstName,
            lastName: shift.agent.lastName,
            email: shift.agent.email,
            facilityAgentId: shift.agent.facilityAgentId
          }
        };
      });
  
      res.json(formattedShifts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
};
  