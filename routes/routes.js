import express from 'express';
import * as ctrl from '../controllers/mainController.js';

const router = express.Router();

// Define routes
router.get('/', ctrl.home);
router.get('/students/:page', ctrl.displayStudents);
router.get('/class/:id', ctrl.displayClass);
router.get('/populateStudentSchedules', ctrl.setSchedules);
router.get('/clearStudentSchedules', ctrl.clearSchedules);
            
export default router;
