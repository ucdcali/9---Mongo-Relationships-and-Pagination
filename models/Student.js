import mongoose from 'mongoose';
const { Schema } = mongoose;

const studentSchema = new Schema({
  name: String,
  classes: [{ type: Schema.Types.ObjectId, ref: 'Class' }]
});

const Student = mongoose.model('Student', studentSchema);
export default Student;