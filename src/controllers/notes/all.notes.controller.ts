import { Request, Response } from 'express';
import { Note } from '../../models/Note.js';

export const allNotesController = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    const notes = await Note.find({ userId });

    return res.status(200).json({
      data: notes,
      length: notes.length,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
