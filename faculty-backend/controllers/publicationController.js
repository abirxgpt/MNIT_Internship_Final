import Publication from "../models/publicationModel.js";
import { convertToIEEEFormat } from '../utils/ieee-format.js';
import { v4 as uuidv4 } from 'uuid';

export const addPublication = async (req, res) => {
  try {
    console.log("Received payload:", req.body);
    const {
      pType, pTitle, pAuthors,
      journalType, journalName, volume, doiLink, impactFactor, page, isbn,
      conferenceType, conferenceName, place, dateFrom, dateTo,
      year, pPublisher, issn, pubType, bookPublisher
    } = req.body;
    const pId = uuidv4();

    if (
      !pAuthors ||
      (!Array.isArray(pAuthors) && typeof pAuthors !== 'string')
    ) {
      return res.status(400).json({
        message: "Invalid authors format. Authors must be a comma-separated string or an array of strings."
      });
    }

    const existing = await Publication.findOne({ pId });
    if (existing) return res.status(400).json({ message: "Publication ID already exists" });

    const base = {
      pId,
      pType,
      pTitle,
      pAuthors: Array.isArray(pAuthors) ? pAuthors.map(a => a.trim()) : pAuthors.split(',').map(a => a.trim()),
      pPublisher,
      pYear: year,
    };

    if (pType === 'Journal') {
      Object.assign(base, {
        journalType,
        journalName,
        volume,
        doiLink,
        impactFactor,
        // page,
        // isbn,
        ...(page && { page }),
        ...(isbn && { isbn }),
      });
    } else if (pType === 'Conference') {
      Object.assign(base, {
        conferenceType,
        conferenceName,
        place,
        // dateFrom: new Date(dateFrom),
        // dateTo: new Date(dateTo),
        // page,
        // isbn,
        ...(dateFrom && { dateFrom: new Date(dateFrom) }),
        ...(dateTo && { dateTo: new Date(dateTo) }),
        ...(page && { page }),
        ...(isbn && { isbn }),
      });
    } else if (pType === 'Book-Chapter') {
      Object.assign(base, {
        issn,
        pubType,
        bookPublisher,
      });
    }

    const newPub = new Publication(base);
    await newPub.save();

    res.status(201).json({ message: "Publication added successfully", publication: newPub });
  } catch (error) {
    console.error("Error in addPublication:", error);
    res.status(500).json({ message: "Failed to add publication", error });
  }
};

export const getAllPublications = async (req, res) => {
  try {
    // const publications = await Publication.find({});
    const publications = await Publication.find({}).sort({
      pYear: -1,
      createdAt: -1
    });
    const formatted = convertToIEEEFormat(publications);
    res.status(200).json(formatted);
  } catch (error) {
    console.error("Error fetching publications:", error);
    res.status(500).json({ message: "Failed to fetch publications", error });
  }
};