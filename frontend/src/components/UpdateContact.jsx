import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { API_BASE_URL } from '../apiConfig';

const UpdateContact = () => {
  const { cid } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("basicToken");

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm();
  const [previewImg, setPreviewImg] = useState("https://placeholder.com");

  
  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/user/contact/${cid}`, {
          headers: { 'Authorization': `Basic ${token}` }
        });
        if (res.ok) {
          const contact = await res.json();
          setValue("name", contact.name);
          setValue("secondName", contact.secondName);
          setValue("work", contact.work);
          setValue("email", contact.email);
          setValue("phone", contact.phone);
          setValue("description", contact.description);
          if (contact.image) setPreviewImg(contact.image);
        } else {
          Swal.fire('Error', 'Contact not found or unauthorized!', 'error');
          navigate('/dashboard/contacts');
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchContactDetails();
  }, [cid, setValue, token, navigate]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("secondName", data.secondName || "");
    formData.append("work", data.work || "");
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("description", data.description || "");
    
    if (data.image && data.image.length > 0) {
      formData.append("profileImage", data.image[0]);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/user/update-contact/${cid}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Basic ${token}`
        },
        body: formData
      });

      if (response.ok) {
        Swal.fire('Updated!', 'Contact updated successfully!', 'success');
        navigate('/dashboard/contacts');
      } else {
        Swal.fire('Error', 'Failed to update contact.', 'error');
      }
    } catch (error) {
      Swal.fire('Server Error', 'Cannot connect to backend.', 'error');
    }
  };

  return (
    <div className="dash-card">
      <h1>Update Contact</h1>

      <div className="profile-header">
        <img src={previewImg} alt="Contact" className="profile-avatar" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="dash-form">
        <div className="form-grid">
          <div>
            <label>First Name *</label>
            <input type="text" className={errors.name ? 'err-border' : ''} {...register("name", { required: "Name is required" })} />
            <p className="err">{errors.name?.message}</p>
          </div>

          <div>
            <label>Second Name (Nick Name)</label>
            <input type="text" {...register("secondName")} />
          </div>

          <div>
            <label>Phone Number *</label>
            <input type="text" className={errors.phone ? 'err-border' : ''} {...register("phone", { required: "Phone is required" })} />
            <p className="err">{errors.phone?.message}</p>
          </div>

          <div>
            <label>Email Address *</label>
            <input type="email" className={errors.email ? 'err-border' : ''} {...register("email", { required: "Email is required" })} />
            <p className="err">{errors.email?.message}</p>
          </div>
        </div>

        <label>Work / Profession</label>
        <input type="text" {...register("work")} />

        <label>Contact Description</label>
        <textarea rows="4" {...register("description")}></textarea>

        <label>Change Contact Image</label>
        <input 
          type="file" 
          accept="image/*" 
          {...register("image")} 
          onChange={(e) => {
            if (e.target.files[0]) setPreviewImg(URL.createObjectURL(e.target.files[0]));
          }}
        />

        <div className="btns">
          <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Updating...' : 'Save Changes'}</button>
          <button type="button" className="reset" onClick={() => navigate('/dashboard/contacts')}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateContact;
