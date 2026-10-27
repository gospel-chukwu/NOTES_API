import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const NoteSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
    },
    content: {
      type: String,
    },
  },
  { timestamps: true },
);

export const Note = mongoose.model('Note', NoteSchema);
