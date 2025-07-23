import Event from '../models/eventModel.js';

export const addEvent = async (req, res) => {
    try {
        const event = new Event(req.body);
        await event.save();
        res.status(201).json({ message: 'Event added successfully', event });
    } catch (error) {
        console.error('Error adding event:', error);
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Event with this title already exists.' });
        }
        res.status(500).json({ message: 'Failed to add event', error });
    }
};

export const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find().sort({ dateFrom: -1 });
        res.status(200).json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ message: 'Failed to fetch events', error });
    }
};
