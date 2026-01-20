import React, { useState } from "react";
import { List } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";

const AddVacancy = () => {
    const navigate = useNavigate();

    const [vacancyData, setVacancyData] = useState({
        postName: "",
        noOfVacancy: "",
        keyResponsibilities: "",
        icon: "",
        experience: "",
        date: "",
        status: "Inactive",
    });


    const [editId, setEditId] = useState(null);

    // ================= INPUT HANDLER =================
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setVacancyData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // ================= SUBMIT =================
    const handleSubmit = (e) => {
        e.preventDefault();

        const existing = JSON.parse(localStorage.getItem("vacancies")) || [];

        const formattedVacancy = {
            id: editId ? editId : Date.now(),
            name: vacancyData.postName,
            vacancyCount: vacancyData.noOfVacancy || "-",
            responsibilities: vacancyData.keyResponsibilities.replace(/\n/g, "<br>"),
            experience: vacancyData.experience || "-",
            icon: vacancyData.icon || "-",   // ✅ ADD THIS LINE
            status: vacancyData.status,
        };

        let updatedVacancies;

        if (editId) {
            updatedVacancies = existing.map((item) =>
                item.id === editId ? formattedVacancy : item
            );
        } else {
            updatedVacancies = [formattedVacancy, ...existing];
        }

        localStorage.setItem("vacancies", JSON.stringify(updatedVacancies));

        setEditId(null);
        setVacancyData({
            postName: "",
            noOfVacancy: "",
            icon: "",
            keyResponsibilities: "",
            experience: "",
            date: "",
            status: "Inactive",
        });

        navigate("/vacancy-list");
    };
    // ================= EDIT =================

    const editEvent = (item) => {
        setVacancyData(item);
        setEditId(item.id);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // ================= DELETE =================
    const deleteEvent = (id) => {
        if (window.confirm("Are you sure you want to delete?")) {
            // Logic for deleting vacancy
            const existing = JSON.parse(localStorage.getItem("vacancies")) || [];
            const updated = existing.filter((item) => item.id !== id);
            localStorage.setItem("vacancies", JSON.stringify(updated));
        }
    };

    // ================= TOGGLE STATUS =================
    const toggleStatus = (id) => {
        // Logic for toggling status
        const existing = JSON.parse(localStorage.getItem("vacancies")) || [];
        const updated = existing.map((item) =>
            item.id === id
                ? {
                    ...item,
                    status: item.status === "Active" ? "Inactive" : "Active",
                }
                : item
        );
        localStorage.setItem("vacancies", JSON.stringify(updated));
    };

    return (
        <div className="bg-white shadow-md p-4 md:p-8 mt-6 min-h-[600px]">
            <div className="w-full">
                <header className="mb-6">
                    {/* HEADER */}
                    <PageHeader
                        title="Add Vacancy"
                        description=" Manage your vacancy details"
                        buttonText="Vacancy List"
                        buttonIcon={List}
                        buttonPath="/vacancy-list"
                    />
                    {/* FORM */}
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white rounded-sm shadow-sm border border-gray-200 p-6 md:p-8 space-y-6"
                    >
                        {/* ROW 1 */}
                        <div className="grid md:grid-cols-3 gap-5">
                            {/* POST NAME */}
                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Post Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="postName"
                                    value={vacancyData.postName}
                                    onChange={handleInputChange}
                                    placeholder="Enter post name"
                                    className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>

                            {/* NO. OF VACANCY */}
                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    No. of Vacancy
                                </label>
                                <input
                                    type="number"
                                    name="noOfVacancy"
                                    value={vacancyData.noOfVacancy}
                                    onChange={handleInputChange}
                                    placeholder="Enter number of vacancies"
                                    className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    min="1"
                                />
                            </div>

                            {/* EXPERIENCE */}
                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Experience
                                </label>
                                <input
                                    type="text"
                                    name="experience"
                                    value={vacancyData.experience}
                                    onChange={handleInputChange}
                                    placeholder="e.g., 2-5 years"
                                    className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>


                        {/* ROW 2 */}
                        <div className="grid md:grid-cols-3 gap-5">
                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Date (dd-mm-yyyy)
                                </label>
                                <input
                                    type="text"
                                    name="date"
                                    value={vacancyData.date}
                                    onChange={handleInputChange}
                                    placeholder="dd-mm-yyyy"
                                    pattern="\d{2}-\d{2}-\d{4}"
                                    className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
                                />
                                <p className="text-xs text-gray-500 mt-1">Format: dd-mm-yyyy</p>
                            </div>

                            {/* ICON (TEXT) */}
                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Icon
                                </label>
                                <input
                                    type="text"
                                    name="icon"
                                    value={vacancyData.icon}
                                    onChange={handleInputChange}
                                    placeholder="briefcase / users / file"
                                    className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* STATUS */}
                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Status <span className="text-red-500">*</span>
                                </label>
                                <div className="mt-2 flex gap-4">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="status"
                                            value="Active"
                                            checked={vacancyData.status === "Active"}
                                            onChange={handleInputChange}
                                            className="mr-2 h-4 w-4 text-blue-600"
                                        />
                                        <span className="text-gray-700">Active</span>
                                    </label>

                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="status"
                                            value="Inactive"
                                            checked={vacancyData.status === "Inactive"}
                                            onChange={handleInputChange}
                                            className="mr-2 h-4 w-4 text-blue-600"
                                        />
                                        <span className="text-gray-700">Inactive</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* KEY RESPONSIBILITIES */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Key Responsibilities
                            </label>
                            <textarea
                                name="keyResponsibilities"
                                value={vacancyData.keyResponsibilities}
                                onChange={handleInputChange}
                                placeholder="Describe the key responsibilities..."
                                rows="4"
                                className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                            />
                        </div>

                        {/* SUBMIT BUTTON */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition-colors"
                            >
                                {editId ? "Update Vacancy" : "Add Vacancy"}
                            </button>
                        </div>
                    </form>
                </header>
            </div>
        </div >
    );
};

export default AddVacancy;