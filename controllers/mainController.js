import Student from '../models/Student.js';
import StudentClass from '../models/Class.js';

export const home = async (req, res) => {
  res.redirect('/students/1')
};

export const displayStudents = async (req, res) => {
  const page = parseInt(req.params.page);
  const totalStudents = await Student.countDocuments();
  const lastPage = Math.ceil(totalStudents / 10);
  
  const students = await Student.find()
    .sort({name: 1})
    .limit(10)
    .skip((page - 1) * 10)
    .populate('classes');
  
  res.render('students', {title: 'Student List', students, page, lastPage});
  //res.json(students);
}

export const displayClass = async (req, res) => {
  console.log(req.params);
  
  const selectedClass = await StudentClass.findById(req.params.id).populate('students');
  
  // Check if students were populated
  if (selectedClass && selectedClass.students) {
    // Sort the students array by name
    selectedClass.students.sort((a, b) => a.name.localeCompare(b.name));
  }
  
  res.render('class', {selectedClass});
  //res.json(selectedClass);
}

export const setSchedules = async (req, res) => {
  try {
    const students = await Student.find(); // Fetch all students

    for (let student of students) {
      if (student.classes.length < 4) {
        // For each block, find a class and add it to the student's classes array
        for (let block of ['A', 'B', 'C', 'D']) {
          const availableClasses = await Class.find({ blocks: block }); // Find all classes for this block
          if (availableClasses.length > 0) {
            const randomClassIndex = Math.floor(Math.random() * availableClasses.length);
            const selectedClass = availableClasses[randomClassIndex];
            student.classes.push(selectedClass); // Add the selected class to the student's classes
            selectedClass.students.push(student);
            selectedClass.save();
          }
        }
        await student.save(); // Save the student with the updated classes array
      }
    }

    res.send('Student schedules populated');
  } catch (error) {
    console.error(error);
    res.send('Error populating student schedules');
  }
};

export const clearSchedules = async (req, res) => {
  try {
    // Update all student documents by setting the 'classes' array to an empty array
    const result = await Student.updateMany({}, { $set: { classes: [] } });

    res.send('Student schedules cleared');
  } catch (error) {
    // If an error occurs, log it to the console
    console.error(error);
    res.send('Error clearing student schedules');
  }
};
