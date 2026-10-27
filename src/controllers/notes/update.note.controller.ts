import { Request, Response } from 'express';
import { Note } from '../../models/Note.js';
import { Update } from '../../types/notes.types.js';

export const updateNoteController = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    const { id: _id } = req.params;
    const userId = req.user?.userId;

    const query = { _id, userId };
    let update: Update = {};

    if (title !== undefined) {
      if (typeof title !== 'string') {
        return res.status(400).json({ message: 'Title must be a string.' });
      }
      update.title = title;
    }

    if (content !== undefined) {
      if (typeof content !== 'string') {
        return res.status(400).json({ message: 'Content must be a string.' });
      }
      update.content = content;
    }

    if (Object.keys(update).length === 0) {
      return res.status(400).json({ message: 'No update data provided.' });
    }

    const updatedNote = await Note.findOneAndUpdate(query, update, {
      new: true,
    });

    if (!updatedNote) {
      return res
        .status(404)
        .json({ message: 'Note not found or unauthorized to update' });
    }

    const { __v, ...formattedUpdatedNote } = updatedNote.toObject();

    return res.status(200).json(formattedUpdatedNote);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
