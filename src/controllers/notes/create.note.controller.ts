import { Request, Response } from 'express';
import { Note } from '../../models/Note.js';

export const createNoteController = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    const userId = req.user?.userId;

    const note = await Note.create({ userId, title, content });

    const { __v, ...formattedNote } = note.toObject();

    return res.status(201).json(formattedNote);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
