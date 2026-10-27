import { Request, Response } from 'express';
import { Note } from '../../models/Note.js';

export const singleNoteController = async (req: Request, res: Response) => {
  try {
    const { id: _id } = req.params;
    const userId = req.user?.userId;

    const singleNote = await Note.findOne({ _id, userId });

    if (!singleNote) {
      return res.status(404).json({ message: 'Note not found' });
    }

    const { __v, ...formattedSingleNote } = singleNote.toObject();

    return res.status(200).json(formattedSingleNote);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
