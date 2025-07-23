import Resource from '../models/resourceModel.js';

// Add a new resource
export const addResource = async (req, res) => {
  try {
    const { title, link, category } = req.body;

    if (!title || !link || !category) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newResource = new Resource({ title, link, category });
    await newResource.save();
    res.status(201).json({ message: 'Resource added successfully.', resource: newResource });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add resource.', error: err.message });
  }
};

// Get all resources
export const getAllResources = async (req, res) => {
  try {
    const resources = await Resource.find();
    res.status(200).json(resources);
  } catch (err) {
    console.error("Error in addResource:", err);
    res.status(500).json({ message: 'Failed to fetch resources.', error: err.message });
  }
};

// (Optional) Get resources by category
// export const getResourcesByCategory = async (req, res) => {
//   try {
//     const { category } = req.params;
//     const resources = await Resource.find({ category });
//     res.status(200).json(resources);
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to fetch category resources.', error: err.message });
//   }
// };
