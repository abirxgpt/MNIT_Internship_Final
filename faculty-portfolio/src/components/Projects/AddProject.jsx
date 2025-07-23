import { useState, useEffect } from 'react';
import { toast } from 'react-toastify'
import './AddProject.css';

function AddProject() {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let y = currentYear; y >= 1950; y--) years.push(y);

    // In your formData state:
    const [formData, setFormData] = useState({
        role: '',
        projectLevel: '',
        projectType: '',
        projectTitle: '',
        fundingAgency: '',
        yearFrom: '',
        yearTo: '',
        amount: '',
        status: '',
        erpId: '',
        coInvestigators: ['', '', '', '', ''],
    });

    const [facultyList, setFacultyList] = useState([]);

    useEffect(() => {
        async function fetchFaculty() {
            try {
                const res = await fetch('https://faculty-backend-koz0.onrender.com/api/faculty/all'); // example URL
                const data = await res.json();
                setFacultyList(data);
            } catch (error) {
                console.error('Error fetching faculty:', error);
            }
        }
        fetchFaculty();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // if (name.startsWith('coInvestigator')) {
        //     const index = parseInt(name.slice(-1)) - 1;
        //     const updatedCoInvestigators = [...formData.coInvestigators];
        //     updatedCoInvestigators[index] = value;
        //     setFormData({ ...formData, coInvestigators: updatedCoInvestigators });
        // } else {
        //     setFormData({ ...formData, [name]: value });
        // }
    };

    const handleCoInvestigatorChange = (index, value) => {
        const updatedCoInvestigators = [...formData.coInvestigators];
        updatedCoInvestigators[index] = value;
        setFormData({ ...formData, coInvestigators: updatedCoInvestigators });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const requiredFields = ['role', 'projectLevel', 'projectType', 'projectTitle', 'fundingAgency', 'yearFrom', 'yearTo', 'amount', 'status', 'erpId'];

        for (let field of requiredFields) {
            if (!formData[field]) {
                toast.warn("Please fill all the required fields.");
                return;
            }
        }
        try {
            const response = await fetch('https://faculty-backend-koz0.onrender.com/api/projects/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    coInvestigators: formData.coInvestigators.filter(name => name.trim() !== ''),
                }),
                // body: JSON.stringify({
                //     role,
                //     projectTitle,
                //     fundingAgency,
                //     projectLevel,
                //     startDate,
                //     endDate,
                //     amount,
                //     status,
                //     erpId,
                //     coInvestigators, // should be an array
                // }),
            });

            if (response.ok) {
                toast.success('Project added successfully!');
                setFormData({
                    role: '',
                    projectLevel: '',
                    projectType: '',
                    projectTitle: '',
                    fundingAgency: '',
                    yearFrom: '',
                    yearTo: '',
                    amount: '',
                    status: '',
                    erpId: '',
                    coInvestigators: ['', '', '', '', ''],
                });
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || 'Error adding project.');
            }
        } catch (err) {
            console.error('Submit error:', err);
            toast.error('Error connecting to server.');
        }
    };

    return (
        <div className="add-project-wrapper">
            <h2 className="h2Head">Add Project</h2>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="input-group">
                        {/* <label>Project Type</label> */}
                        <select className="select" name="projectType" value={formData.projectType} onChange={handleChange}>
                            <option value="">--Project-Type--</option>
                            <option value="Research">Research</option>
                            <option value="Consultancy">Consultancy</option>
                        </select>
                    </div>
                    <div className="input-group">
                        {/* <label>Project Level</label> */}
                        <select className="select" name="projectLevel" value={formData.projectLevel} onChange={handleChange}>
                            <option value="">--Project-Level--</option>
                            <option value="Institute">Institute</option>
                            <option value="National">National</option>
                            <option value="International">International</option>
                        </select>
                    </div>
                    <div className="input-group">
                        {/* <label>Role</label> */}
                        <select className="select" name="role" value={formData.role} onChange={handleChange}>
                            <option value="">--Role--</option>
                            <option value="PI">Principal Investigator</option>
                            <option value="Co-PI">Co-Principal Investigator</option>
                        </select>
                    </div>
                </div>

                <div className="row">
                    <div className="input-group">
                        {/* <label>Project Title</label> */}
                        <input
                            type="text"
                            className="input"
                            name="projectTitle"
                            value={formData.projectTitle}
                            placeholder="Project Title"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-group">
                        {/* <label>Funding Agency</label> */}
                        <input
                            type="text"
                            placeholder="Funding Agency"
                            className="input"
                            name="fundingAgency"
                            value={formData.fundingAgency}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="input-group">
                        <select className="select" name="yearFrom" value={formData.yearFrom} onChange={handleChange}>
                            <option value="">--Year From--</option>
                            {years.map((y) => (
                                <option key={y} value={y}>{y}</option>
                            ))}
                        </select>
                    </div>
                    <div className="input-group">
                        <select className="select" name="yearTo" value={formData.yearTo} onChange={handleChange}>
                            <option value="">--Year To--</option>
                            {years.map((y) => (
                                <option key={y} value={y}>{y}</option>
                            ))}
                        </select>
                    </div>
                </div>


                <div className="row">
                    <div className="input-group">
                        {/* <label>Amount (in Lacs)</label> */}
                        <input
                            type="number"
                            placeholder="Amount (in Lacs)"
                            className="input"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-group">
                        {/* <label>MNIT ERP Project ID</label> */}
                        <input
                            type="text"
                            placeholder="MNIT ERP Project ID"
                            className="input"
                            name="erpId"
                            value={formData.erpId}
                            onChange={handleChange}
                        />
                    </div>

                </div>

                <div className="row">
                    <div className="input-group">
                        {/* <label>Status</label> */}
                        <select
                            className="select"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <option value="">--Status--</option>
                            <option value="Ongoing">Ongoing</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                </div>

                <div className="row">
                    {/* {formData.coInvestigators.map((coInv, index) => (
                        <div className="input-group" key={index}>
                            <label>Co-Investigator-{index + 1} (if any)</label>
                            <input
                                type="text"
                                className="input"
                                placeholder="Enter name"
                                value={coInv}
                                onChange={(e) => handleCoInvestigatorChange(index, e.target.value)}
                            />
                        </div>
                    ))} */}
                    {formData.coInvestigators.map((coInv, index) => (
                        <div className="input-group" key={index}>
                            {/* <label>Co-Investigator-{index + 1} (if any)</label> */}
                            <input
                                type="text"
                                className="text-input"
                                value={coInv}
                                onChange={(e) => handleCoInvestigatorChange(index, e.target.value)}
                                placeholder={`Co-Investigator-${index + 1}`}
                            />

                            {/* {coInv === 'Other' && (
                                <input
                                    type="text"
                                    className="inputOther"
                                    placeholder="Enter name"
                                    onChange={(e) => handleCoInvestigatorChange(index, e.target.value)}
                                />
                            )} */}
                        </div>
                    ))}
                </div>

                <button type="submit" className="add-project-button">Add Project</button>
            </form>
        </div>
    );
}

export default AddProject;
