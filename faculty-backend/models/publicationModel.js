import { Schema, model } from "mongoose";

const publicationSchema = new Schema({
    pId: { type: String, required: true, unique: true },
    pType: { type: String, required: true }, // Journal, Conference, Book-Chapter
    pTitle: { type: String, required: true },
    pAuthors: { type: [String], required: true },

    // Common
    pDate: { type: Date }, // Use for conference dateFrom, book year, etc.
    pYear: { type: String },
    pPublisher: { type: String },
    pVenue: { type: String }, // Optional backup

    // Journal-specific
    journalType: { type: String },
    journalName: { type: String },
    volume: { type: String },
    doiLink: { type: String, required: false },
    impactFactor: { type: String },
    page: { type: String, required: false },
    isbn: { type: String, required: false },

    // Conference-specific
    conferenceType: { type: String },
    conferenceName: { type: String },
    place: { type: String },
    dateFrom: { type: Date, required: false },
    dateTo: { type: Date, required: false },

    // Book-Chapter-specific
    issn: { type: String },
    pubType: { type: String },
    bookPublisher: { type: String },
}, { timestamps: true });

export default model("Publication", publicationSchema);
