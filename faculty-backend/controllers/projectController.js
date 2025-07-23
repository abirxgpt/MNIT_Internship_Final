import Project from '../models/projectModel.js';

// Add a new project
const addProject = async (req, res) => {
    try {
        const {
            role,
            projectLevel,
            projectType,
            projectTitle,
            fundingAgency,
            yearFrom,
            yearTo,
            amount,
            status,
            erpId,
            coInvestigators
        } = req.body;

        const requiredFields = [
            'role',
            'projectLevel',
            'projectType',
            'projectTitle',
            'fundingAgency',
            'yearFrom',
            'yearTo',
            'amount',
            'status',
            'erpId'
        ];

        console.log("Request Body:", req.body);
        const missingFields = requiredFields.filter(field => !req.body[field]);
        if (missingFields.length > 0) {
            return res.status(400).json({
                message: `Missing required fields: ${missingFields.join(', ')}`
            });
        }

        // Optionally convert amount to Number
        const numericAmount = Number(amount);
        if (isNaN(numericAmount)) {
            return res.status(400).json({ message: 'Amount must be a number' });
        }

        if (!role || !projectLevel || !projectTitle || !projectType || !fundingAgency) {
            return res.status(400).json({ message: 'Please fill in all required fields.' });
        }

        const newProject = new Project({
            role,
            projectLevel,
            projectType,
            projectTitle,
            fundingAgency,
            yearFrom,
            yearTo,
            amount: numericAmount,
            status,
            erpId,
            coInvestigators
        });

        await newProject.save();

        res.status(201).json({ message: 'Project added successfully' });
    } catch (err) {
        console.error('Error adding project:', err);
        if (err.code === 11000) {
            return res.status(400).json({ message: 'Project with this title already exists.' });
        }
        res.status(500).json({ message: 'Failed to add project' });
    }
};


// Get all projects
const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (err) {
        console.error('Error fetching projects:', err);
        res.status(500).json({ message: 'Failed to fetch projects' });
    }
};

export { addProject, getAllProjects };
