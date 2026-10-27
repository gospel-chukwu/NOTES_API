import express from 'express';
import { allNotesController } from '../controllers/notes/all.notes.controller.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { createNoteController } from '../controllers/notes/create.note.controller.js';
import { singleNoteController } from '../controllers/notes/single.note.controller.js';
import { updateNoteController } from '../controllers/notes/update.note.controller.js';
import { deleteNoteController } from '../controllers/notes/delete.note.controller.js';

const router = express.Router();

router.use(authMiddleware);

// API Routes
router.get('/', allNotesController);

router.post('/', createNoteController);

router.get('/:id', singleNoteController)

router.patch('/:id', updateNoteController)

router.delete('/:id', deleteNoteController)

export default router;
