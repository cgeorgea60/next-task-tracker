import { Schema, model, models } from 'mongoose';

const taskSchema = new Schema({
  text: { type: String, required: true },
  day: { type: String, default: Date().substring(0, 21) },
  reminder: { type: Boolean, default: false },
});


const taskModel = models.Task ||  model('Task', taskSchema);

export default taskModel;