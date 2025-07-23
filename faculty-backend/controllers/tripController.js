import Trip from "../models/tripModel.js";
import fetch from 'node-fetch';

const GEOCODING_API_KEY = '09242258db45441b87a67d64f9f668a4';

export const addTrip = async (req, res) => {
  const { location, year, purpose, description, photoUrl } = req.body;

  try {
    // Step 1: Fetch coordinates from OpenCage
    const geoRes = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=${GEOCODING_API_KEY}`);
    const geoData = await geoRes.json();

    if (!geoData.results.length) {
      return res.status(400).json({ message: 'Invalid location for geocoding.' });
    }

    const { latitude, longitude } = geoData.results[0].geometry;

    const { lat, lng } = geoData.results[0].geometry;

    console.log(`Geocoded ${location}: ${lat}, ${lng}`);
    const newTrip = new Trip({
      location,
      year,
      purpose,
      description,
      photoUrl,
      coordinates: { latitude: lat, longitude: lng }
    });

    await newTrip.save();
    res.status(201).json(newTrip);
  } catch (error) {
    console.error('Error adding trip:', error);
    res.status(500).json({ message: 'Failed to add trip' });
  }
};

export const getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find();
    res.json(trips);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
