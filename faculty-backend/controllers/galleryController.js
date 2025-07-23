import Gallery from '../models/galleryModel.js';

export const addGalleryItem = async (req, res) => {
  console.log("Received data:", req.body);

  const { image, caption, category } = req.body;
  const date = new Date(req.body.date);

  if (!image || !date) {
    console.log("Missing field(s)");
    return res.status(400).json({ message: 'Image and Date are required' });
  }

  try {
    const newEntry = new Gallery({ image, caption, category, date });
    await newEntry.save();
    console.log("Saved successfully");
    res.status(201).json({ message: 'Gallery item added successfully' });
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ message: err.message });
  }
};

// Get all gallery items
export const getAllGalleryItems = async (req, res) => {
  try {
    const items = await Gallery.find().sort({ date: -1 });
    res.status(200).json(items);
  } catch (error) {
    console.error('Error fetching gallery items:', error);
    res.status(500).json({ message: 'Failed to fetch gallery items', error: error.message });
  }
};

// (Optional) Delete a gallery item
// export const deleteGalleryItem = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deleted = await Gallery.findByIdAndDelete(id);
//     if (!deleted) return res.status(404).json({ message: 'Gallery item not found' });
//     res.status(200).json({ message: 'Gallery item deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting gallery item:', error);
//     res.status(500).json({ message: 'Failed to delete gallery item', error: error.message });
//   }
// };
