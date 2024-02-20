import mongoose from 'mongoose';
const { Schema } = mongoose;

const classSchema = new Schema({
  title: String,
  blocks: [String],
  students: [{ type: Schema.Types.ObjectId, ref: 'Student' }]
});

const Class = mongoose.model('Class', classSchema);
export default Class;