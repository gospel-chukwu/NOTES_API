import { Request, Response } from 'express';
import { Note } from '../../models/Note.js';

export const deleteNoteController = async (req: Request, res: Response) => {
  try {
    const { id: _id } = req.params;
    const userId = req.user?.userId;
    const query = { _id, userId };

    const deletedNote = await Note.findOneAndDelete(query);

    if (!deletedNote) {
      return res.status(404).json({ error: 'Note not found' });
    }

    return res.sendStatus(204);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
