import PhD from '../models/phdModel.js';

export const addPhD = async (req, res) => {
    const {
        researchTopicTitle,
        scholarId,
        scholarName,
        phdStatus,
        year,
        coSupervisor,
        currentDesignation,
        organization,
        currentEmail,
        currentMobile
    } = req.body;

    // Manual validation for required fields
    if (!researchTopicTitle || !scholarId || !scholarName || !phdStatus || !year) {
        return res.status(400).json({
            message: 'Please fill all required fields.'
        });
    }

    try {
        const newPhD = new PhD({
            researchTopicTitle,
            scholarId,
            scholarName,
            phdStatus,
            year,
            coSupervisor,
            currentDesignation,
            organization,
            currentEmail,
            currentMobile
        });

        await newPhD.save();
        res.status(201).json({ message: 'PhD supervision added successfully', data: newPhD });
    } catch (error) {
        res.status(400).json({ message: 'Failed to add PhD supervision', error: error.message });
    }
};

export const getAllPhDs = async (req, res) => {
    try {
        const phds = await PhD.find().sort({ year: -1 });
        res.status(200).json(phds);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch records', error: error.message });
    }
};
