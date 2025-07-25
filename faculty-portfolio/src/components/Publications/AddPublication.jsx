import React, { useState } from 'react';
import { toast } from 'react-toastify';
import './AddPublication.css';

function AddPublicationForm() {
    const [pType, setPubType] = useState('');

    // Common fields & type-specific fields state
    const [formData, setFormData] = useState({
        typeOfJournal: '',
        year: '',
        publisherName: '',
        journalName: '',
        volume: '',
        paperTitle: '',
        doiLink: '',
        impactFactor: '',
        page: '',
        isbn: '',
        authors: '',
        // Conference fields
        typeOfConference: '',
        conferenceName: '',
        place: '',
        dateFrom: '',
        dateTo: '',
        // Book Chapter fields
        title: '',
        bookPublisher: '',
        issn: '',
        publicationType: '',
    });

    // Handle form input changes dynamically
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Year options for select dropdown
    const years = [];
    const currentYear = new Date().getFullYear();
    for (let y = currentYear; y >= 1950; y--) {
        years.push(y);
    }

    const handleAdd = async () => {
        // Validation depends on pType
        if (!pType) {
            toast.error('Please select publication type');
            return;
        }

        // Basic required fields check per type
        let requiredFields = [];
        if (pType === 'Journal') {
            requiredFields = [
                'typeOfJournal',
                'year',
                'publisherName',
                'journalName',
                'volume',
                'paperTitle',
                // 'doiLink',
                // 'impactFactor',
                // 'page',
                // 'isbn',
                'authors',
            ];
        } else if (pType === 'Conference') {
            requiredFields = [
                'typeOfConference',
                'year',
                'publisherName',
                'conferenceName',
                'paperTitle',
                'place',
                // 'dateFrom',
                // 'dateTo',
                // 'page',
                // 'isbn',
                'authors',
            ];
        } else if (pType === 'Book-Chapter') {
            requiredFields = [
                'title',
                'bookPublisher',
                'authors',
                'issn',
                'year',
                'publicationType',
            ];
        }

        for (const field of requiredFields) {
            if (!formData[field] || formData[field].trim() === '') {
                toast.warn('Please fill all required fields', { toastId: 'empty-publication-fields' });
                return;
            }
        }

        // Prepare payload
        const payload = {
            pType,
            ...formData,
            pTitle: formData.title || formData.paperTitle,
            pAuthors: formData.authors
                .split(',')
                .map((author) => author.trim())
                .filter((a) => a.length > 0),
        };
        // delete payload.authors; // optional: remove old key to avoid confusion
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/publications/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            console.log(payload);

            const data = await response.json();
            if (response.ok) {
                toast.success('Publication added successfully!');
                setPubType('');
                setFormData({
                    typeOfJournal: '',
                    year: '',
                    publisherName: '',
                    journalName: '',
                    volume: '',
                    paperTitle: '',
                    doiLink: '',
                    impactFactor: '',
                    page: '',
                    isbn: '',
                    authors: '',
                    typeOfConference: '',
                    conferenceName: '',
                    place: '',
                    dateFrom: '',
                    dateTo: '',
                    title: '',
                    bookPublisher: '',
                    issn: '',
                    publicationType: '',
                });
            } else {
                toast.error(data.message || 'Something went wrong.');
            }
        } catch (err) {
            toast.error('Error connecting to server.');
            console.error(err);
        }
    };

    return (
        <div className="add-publication-wrapper">
            <h2 className="heading">Add New Publication</h2>

            {/* Select publication type */}
            <div className="row">
                <div className="input-group">
                    <select value={pType} onChange={(e) => setPubType(e.target.value)}>
                        <option value="">--Select-Type--</option>
                        <option value="Journal">Journal</option>
                        <option value="Conference">Conference</option>
                        <option value="Book-Chapter">Book Chapter</option>
                    </select>
                </div>
            </div>

            {/* Conditionally render fields based on pType */}

            {pType === 'Journal' && (
                <>
                    <div className="row">
                        <div className="input-group">
                            <select
                                name="typeOfJournal"
                                value={formData.typeOfJournal}
                                onChange={handleChange}
                            >
                                <option value="">--Type of Journal--</option>
                                <option value="International">International</option>
                                <option value="National">National</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <select name="year" value={formData.year} onChange={handleChange}>
                                <option value="">--Year--</option>
                                {years.map((y) => (
                                    <option key={y} value={y}>
                                        {y}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-group">
                            <input
                                name="publisherName"
                                type="text"
                                placeholder="Publisher Name"
                                value={formData.publisherName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-group">
                            <input
                                name="journalName"
                                type="text"
                                placeholder="Journal Name"
                                value={formData.journalName}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-group">
                            <input
                                name="volume"
                                type="text"
                                placeholder="Volume"
                                value={formData.volume}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-group">
                            <input
                                name="paperTitle"
                                type="text"
                                placeholder="Paper Title"
                                value={formData.paperTitle}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-group">
                            <input
                                name="doiLink"
                                type="text"
                                placeholder="DOI Link"
                                value={formData.doiLink}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-group">
                            <input
                                name="impactFactor"
                                type="text"
                                placeholder="Impact Factor (Int/Float values)"
                                value={formData.impactFactor}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-group">
                            <input
                                name="page"
                                type="text"
                                placeholder="Page"
                                value={formData.page}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-group">
                            <input
                                name="isbn"
                                type="text"
                                placeholder="ISBN"
                                value={formData.isbn}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-group">
                            <input
                                name="authors"
                                type="text"
                                placeholder="Authors"
                                value={formData.authors}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </>
            )}

            {pType === 'Conference' && (
                <>
                    <div className="row">
                        <div className="input-group">
                            <select
                                name="typeOfConference"
                                value={formData.typeOfConference}
                                onChange={handleChange}
                            >
                                <option value="">--Type of Conference--</option>
                                <option value="International">International</option>
                                <option value="National">National</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <select name="year" value={formData.year} onChange={handleChange}>
                                <option value="">--Year--</option>
                                {years.map((y) => (
                                    <option key={y} value={y}>
                                        {y}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-group">
                            <input
                                name="publisherName"
                                type="text"
                                placeholder="Publisher Name"
                                value={formData.publisherName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-group">
                            <input
                                name="conferenceName"
                                type="text"
                                placeholder="Conference Name"
                                value={formData.conferenceName}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-group">
                            <input
                                name="paperTitle"
                                type="text"
                                placeholder="Paper Title"
                                value={formData.paperTitle}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-group">
                            <input
                                name="place"
                                type="text"
                                placeholder="Place"
                                value={formData.place}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-group">
                            <label>Date From</label>
                            <input
                                className="date-font"
                                name="dateFrom"
                                type="date"
                                value={formData.dateFrom}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-group">
                            <label>Date To</label>
                            <input
                                className="date-font"
                                name="dateTo"
                                type="date"
                                value={formData.dateTo}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-group">
                            <input
                                name="page"
                                type="text"
                                placeholder="Page"
                                value={formData.page}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-group">
                            <input
                                name="isbn"
                                type="text"
                                placeholder="ISBN"
                                value={formData.isbn}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-group">
                            <input
                                name="authors"
                                type="text"
                                placeholder="Authors"
                                value={formData.authors}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </>
            )}

            {pType === 'Book-Chapter' && (
                <>
                    <div className="row">
                        <div className="input-group">
                            <input
                                name="title"
                                type="text"
                                placeholder="Title"
                                value={formData.title}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-group">
                            <input
                                name="bookPublisher"
                                type="text"
                                placeholder="Book Publisher"
                                value={formData.bookPublisher}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-group">
                            <input
                                name="authors"
                                type="text"
                                placeholder="Authors"
                                value={formData.authors}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-group">
                            <input
                                name="issn"
                                type="text"
                                placeholder="ISBN/ISSN No."
                                value={formData.issn}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-group">
                            <select name="year" value={formData.year} onChange={handleChange}>
                                <option value="">--Year--</option>
                                {years.map((y) => (
                                    <option key={y} value={y}>
                                        {y}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="input-group">
                            <select
                                name="publicationType"
                                className="select"
                                value={formData.publicationType}
                                onChange={handleChange}
                            >
                                <option value="">--Type of Publication--</option>
                                <option value="Book">Book</option>
                                <option value="Book Chapter">Book Chapter</option>
                            </select>
                        </div>
                    </div>
                </>
            )}

            {pType && (
                <div className="row">
                    <div className="input-group">
                        <button className="add-publication-button" onClick={handleAdd}>
                            Add Publication
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AddPublicationForm;