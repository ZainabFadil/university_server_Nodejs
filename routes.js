const express = require('express');
const Student = require('./models/Student');
const Instructor = require('./models/Instructor');
const YearLevel = require('./models/YearLevel');
const Specialization = require('./models/Specialization');
const Subject = require('./models/Subject');
const multer = require('multer');
const router = express.Router();


///////////////////////-> endpoints for students <- \\\\\\\\\\\\\\\\\\\\\\\\\\\
// Initialize Multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });


// Create a new student
router.post('/student/create', upload.any(), async (req, res) => {
    const { name, specialization, yearLevel } = req.body;
    const photo = req.file ? req.file.path : undefined;

    try {
        const student = new Student({
            name,
            photo,
            specialization,
            yearLevel,
        });

        await student.save();
        res.status(201).jsObjectIdon(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//fech all students in system
router.get('/students/fetch', async (req, res) => {
    try {
        const students = await Student.find().populate('specialization yearLevel');
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/student/update/:id', upload.any(), async (req, res) => {
    const { name, specialization, yearLevel } = req.body;
    const photo = req.file ? req.file.path : undefined;

    try {
        const student = await Student.findById(req.params.id);
        if (student) {
            student.name = name || student.name;
            student.specialization = specialization || student.specialization;
            student.yearLevel = yearLevel || student.yearLevel;
            student.photo = photo || student.photo;
            await student.save();
            res.status(200).json(student);
        } else {
            res.status(404).json({ error: 'Student not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//delete student by Id 
router.delete('/student/delete/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (student) {
            res.status(200).json({ message: 'Student deleted' });
        } else {
            res.status(404).json({ error: 'Student not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

///////////////////////-> endpoints of instructors <- \\\\\\\\\\\\\\\\\\\\\\\\\\\
//create new instructor
router.post('/instructor/create', upload.any(), async (req, res) => {
    const { name, specialization } = req.body;
    const photo = req.file ? req.file.path : undefined;

    try {
        const instructor = new Student({
            name,
            photo,
            specialization,
        });

        await instructor.save();
        res.status(201).json(instructor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//fetch all instructors
router.get('/instructors/getall', async (req, res) => {
    try {
        const instructors = await Instructor.find();
        res.status(200).json(instructors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
//update instructor's information
router.put('/instructor/update/:id', upload.any(), async (req, res) => {
    const { name, specialization} = req.body;
    const photo = req.file ? req.file.path : undefined;

    try {
        const instructor = await Instructor.findById(req.params.id);
        if (instructor) {
            instructor.name = name || instructor.name;
            instructor.specialization = specialization || instructor.specialization;
            instructor.photo = photo || instructor.photo;
            await instructor.save();
            res.status(200).json(student);
        } else {
            res.status(404).json({ error: 'Student not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


///////////////////specialization endpoints


// Create a new specialization
router.post('/specializations/create', async (req, res) => {
    const { name, yearLevel} = req.body;

    try {
        const specialization = new Specialization({
            name,
            yearLevel
        });

        await specialization.save();
        res.status(201).json(specialization);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Read all specializations
router.get('/specializations/getall', async (req, res) => {
    try {
        const specializations = await Specialization.find().populate('yearLevel instructors');
        res.status(200).json(specializations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Read a specific specialization by ID
router.get('/specializations/getone/:id', async (req, res) => {
    try {
        const specialization = await Specialization.findById(req.params.id).populate('yearLevel instructors');
        if (specialization) {
            res.status(200).json(specialization);
        } else {
            res.status(404).json({ error: 'Specialization not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a specialization
router.put('/specializations/update/:id', async (req, res) => {
    const { name, yearLevel} = req.body;

    try {
        const specialization = await Specialization.findById(req.params.id);
        if (specialization) {
            specialization.name = name || specialization.name;
            specialization.yearLevel = yearLevel || specialization.yearLevel;
            //specialization.instructors = instructors || specialization.instructors;

            await specialization.save();
            res.status(200).json(specialization);
        } else {
            res.status(404).json({ error: 'Specialization not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a specialization
router.delete('/specializations/delete/:id', async (req, res) => {
    try {
        const specialization = await Specialization.findByIdAndDelete(req.params.id);
        if (specialization) {
            res.status(200).json({ message: 'Specialization deleted' });
        } else {
            res.status(404).json({ error: 'Specialization not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

////////////////// -> subject endpoints <-\\\\\\\\\\\\\\\\\\\\\\\\
// Create a new subject

router.post('/subjects/create', async (req, res) => {
    const { name, yearLevel, specialization, instructor } = req.body;

    try {
        const subject = new Subject({
            name,
            yearLevel,
            specialization,
            instructor,
        });

        await subject.save();
        res.status(201).json(subject);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Read all subjects
router.get('/subjects/getall', async (req, res) => {
    try {
        const subjects = await Subject.find().populate('yearLevel specialization instructor');
        res.status(200).json(subjects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Read a specific subject by ID
router.get('/subjects/getone/:id', async (req, res) => {
    try {
        const subject = await Subject.findById(req.params.id).populate('yearLevel specialization instructor');
        if (subject) {
            res.status(200).json(subject);
        } else {
            res.status(404).json({ error: 'Subject not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a subject
router.put('/subjects/update/:id', async (req, res) => {
    const { name, yearLevel, specialization, instructor } = req.body;

    try {
        const subject = await Subject.findById(req.params.id);
        if (subject) {
            subject.name = name || subject.name;
            subject.yearLevel = yearLevel || subject.yearLevel;
            subject.specialization = specialization || subject.specialization;
            subject.instructor = instructor || subject.instructor;

            await subject.save();
            res.status(200).json(subject);
        } else {
            res.status(404).json({ error: 'Subject not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a subject
router.delete('/subjects/delete/:id', async (req, res) => {
    try {
        const subject = await Subject.findByIdAndDelete(req.params.id);
        if (subject) {
            res.status(200).json({ message: 'Subject deleted' });
        } else {
            res.status(404).json({ error: 'Subject not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
///////////////////////////-> yearlevel <-\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// Create a new year level
router.post('/year-levels/create', async (req, res) => {
    const { name } = req.body;

    try {
        const yearLevel = new YearLevel({
            name,
        });

        await yearLevel.save();
        res.status(201).json(yearLevel);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Read all year levels
router.get('/year-levels/getall', async (req, res) => {
    try {
        const yearLevels = await YearLevel.find();
        res.status(200).json(yearLevels);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Read a specific year level by ID
router.get('/year-levels/getone/:id', async (req, res) => {
    try {
        const yearLevel = await YearLevel.findById(req.params.id);
        if (yearLevel) {
            res.status(200).json(yearLevel);
        } else {
            res.status(404).json({ error: 'Year Level not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a year level
router.put('/year-levels/update/:id', async (req, res) => {
    const {name} = req.body;

    try {
        const yearLevel = await YearLevel.findById(req.params.id);
        if (yearLevel) {
            yearLevel.name = name || yearLevel.name;
            await yearLevel.save();
            res.status(200).json(yearLevel);
        } else {
            res.status(404).json({ error: 'Year Level not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a year level
router.delete('/year-levels/delete/:id', async (req, res) => {
    try {
        const yearLevel = await YearLevel.findByIdAndDelete(req.params.id);
        if (yearLevel) {
            res.status(200).json({ message: 'Year Level deleted' });
        } else {
            res.status(404).json({ error: 'Year Level not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
module.exports = router;
