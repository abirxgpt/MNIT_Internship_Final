import TabVisibility from "../models/tabVisibilityModel.js";

export const updateTabVisibility = async (req, res) => {
  try {
    const updates = req.body; // Array of { fieldName, enabled }
    
    for (const update of updates) {
      await TabVisibility.findOneAndUpdate(
        { fieldName: update.fieldName },
        { enabled: update.enabled },
        { upsert: true, new: true }
      );
    }

    res.status(200).json({ message: "Tab visibility updated." });
  } catch (error) {
    res.status(500).json({ message: "Failed to update tab visibility.", error });
  }
};

export const getVisibleTabs = async (req, res) => {
  try {
    const tabs = await TabVisibility.find({ enabled: true });
    const tabNames = tabs.map(tab => tab.fieldName);
    res.status(200).json({ tabs: tabNames });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch visible tabs.", error });
  }
};

export const getAllTabs = async (req, res) => {
  try {
    const tabs = await TabVisibility.find(); // ✅ returns array
    res.status(200).json(tabs); // ✅ return array directly
  } catch (error) {
    res.status(500).json({ message: "Error fetching tab visibility" });
  }
};

// export const getTabVisibility = async (req, res) => {
//     try {
//         const settings = await TabVisibility.findOne(); // or however you're storing it
//         res.json({ tabs: settings?.enabledTabs || [] }); // return as { tabs: [...] }
//     } catch (err) {
//         res.status(500).json({ error: "Failed to fetch tab visibility" });
//     }
// };
