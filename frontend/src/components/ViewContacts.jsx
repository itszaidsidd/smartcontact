import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { API_BASE_URL } from '../apiConfig';

const ViewContacts = () => {
    const [contacts, setContacts] = useState([]);
    const [search, setSearch] = useState("");
    const token = localStorage.getItem("basicToken");

    const fetchContacts = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/user/contacts`, {
                headers: { 'Authorization': `Basic ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setContacts(data);
            }
        } catch (error) {
            console.error("Error fetching contacts:", error);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    const handleDelete = async (cid) => {
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!'
        });

        if (confirm.isConfirmed) {
            try {
                const response = await fetch(`${API_BASE_URL}/user/contact/${cid}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Basic ${token}` }
                });
                if (response.ok) {
                    setContacts(contacts.filter(c => c.cid !== cid));
                    Swal.fire('Deleted!', 'Contact has been deleted.', 'success');
                }
            } catch (error) {
                Swal.fire('Error', 'Could not delete contact.', 'error');
            }
        }
    };

    const filteredContacts = contacts.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.phone.includes(search)
    );

    return (
        <div className="dash-card">
            <div className="table-header">
                <h1>Your Contacts</h1>
                <input
                    type="text"
                    placeholder="Search by name or phone..."
                    className="search-input"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="table-responsive">
                <table className="contact-table">
                    <thead>
                        <tr>
                            <th>#ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Work</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredContacts.length > 0 ? (
                            filteredContacts.map((contact) => (
                                <tr key={contact.cid}>
                                    <td>SCM{contact.cid}</td>
                                    <td>
                                        <div className="contact-name-cell">
                                            <img
                                                src={contact.image || "https://placeholder.com"}
                                                alt={contact.name}
                                                className="contact-mini-avatar"
                                            />
                                            <span>{contact.name} {contact.secondName && `(${contact.secondName})`}</span>
                                        </div>
                                    </td>
                                    <td>
                                        {/* Email par click karne par poori profile khulegi */}
                                        <Link to={`/dashboard/contact/${contact.cid}`} className="email-link">
                                            {contact.email}
                                        </Link>
                                    </td>

                                    <td>{contact.phone}</td>
                                    <td>{contact.work || '-'}</td>
                                    <td>
                                        <div className="action-btns">
                                            <Link to={`/dashboard/update-contact/${contact.cid}`} className="btn-edit">
                                                Edit
                                            </Link>
                                            <button onClick={() => handleDelete(contact.cid)} className="btn-delete">
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>No contacts found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewContacts;
