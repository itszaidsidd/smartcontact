import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { API_BASE_URL } from '../apiConfig';

const ContactDetail = () => {
  const { cid } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("basicToken");
  const [contact, setContact] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/user/contact/${cid}`, {
          headers: { 'Authorization': `Basic ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setContact(data);
        } else {
          Swal.fire('Error', 'Contact not found or unauthorized!', 'error');
          navigate('/dashboard/contacts');
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchContact();
  }, [cid, token, navigate]);

  const handleDelete = async () => {
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
          Swal.fire('Deleted!', 'Contact has been deleted.', 'success');
          navigate('/dashboard/contacts');
        }
      } catch (error) {
        Swal.fire('Error', 'Could not delete contact.', 'error');
      }
    }
  };

  if (!contact) {
    return <div className="dash-card"><p>Loading contact details...</p></div>;
  }

  return (
    <div className="dash-card detail-card">
      <div className="detail-header">
        <img 
          src={contact.image || "https://placeholder.com"} 
          alt={contact.name} 
          className="detail-avatar" 
        />
        <h2>{contact.name} {contact.secondName && `(${contact.secondName})`}</h2>
        <p className="detail-work">{contact.work || 'No Profession Added'}</p>
      </div>

      <table className="detail-table">
        <tbody>
          <tr>
            <th>#ID</th>
            <td>SCM{contact.cid}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>{contact.email}</td>
          </tr>
          <tr>
            <th>Phone</th>
            <td>{contact.phone}</td>
          </tr>
          <tr>
            <th>Work</th>
            <td>{contact.work || '-'}</td>
          </tr>
        </tbody>
      </table>

      <div className="detail-description">
        <h3>About / Description</h3>
        <p>{contact.description || 'No description available for this contact.'}</p>
      </div>

      <div className="btns">
        <Link to={`/dashboard/update-contact/${contact.cid}`} className="btn-link">
          Update Contact
        </Link>
        <button onClick={handleDelete} className="btn-delete-lg">
          Delete Contact
        </button>
        <button onClick={() => navigate('/dashboard/contacts')} className="reset">
          Back
        </button>
      </div>
    </div>
  );
};

export default ContactDetail;
