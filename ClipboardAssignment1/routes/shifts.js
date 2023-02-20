const express = require('express');
const router = express.Router();
const ShiftController = require('../controllers/shifts');

router.get('/:facilityId', ShiftController.getShiftsByFacility);
// router.get('/:facilityId/report', ShiftController.generateReport);
// router.patch('/:facilityId/agents/:agentId', async (req, res) => {
//   await ShiftController.updateFacilityAgentIdForShifts(req.params.facilityId, req.params.agentId, req.body.facility_agent_id);
//   res.sendStatus(200);
// });

module.exports = router;
