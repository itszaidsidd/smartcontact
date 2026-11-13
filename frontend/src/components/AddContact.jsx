import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { API_BASE_URL } from '../apiConfig';

const AddContact = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    const token = localStorage.getItem("basicToken");
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("secondName", data.secondName || "");
    formData.append("work", data.work || "");
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("description", data.description || "");
    if (data.image && data.image[0]) {
      formData.append("profileImage", data.image[0]);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/user/add-contact`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${token}`
        },
        body: formData
      });

      if (response.ok) {
        reset();
        Swal.fire('Saved!', 'Contact added successfully!', 'success');
      } else {
        Swal.fire('Error', 'Failed to add contact.', 'error');
      }
    } catch (error) {
      Swal.fire('Server Error', 'Cannot connect to backend.', 'error');
    }
  };

  return (
    <div className="dash-card">
      <h1>Add New Contact</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="dash-form">
        <div className="form-grid">
          <div>
            <label>First Name *</label>
            <input type="text" placeholder="Enter first name" className={errors.name ? 'err-border' : ''} {...register("name", { required: "Name is required" })} />
            <p className="err">{errors.name?.message}</p>
          </div>

          <div>
            <label>Second Name (Nick Name)</label>
            <input type="text" placeholder="Enter second name" {...register("secondName")} />
          </div>

          <div>
            <label>Phone Number *</label>
            <input type="text" placeholder="Enter phone number" className={errors.phone ? 'err-border' : ''} {...register("phone", { required: "Phone is required" })} />
            <p className="err">{errors.phone?.message}</p>
          </div>

          <div>
            <label>Email Address *</label>
            <input type="email" placeholder="Enter email" className={errors.email ? 'err-border' : ''} {...register("email", { required: "Email is required" })} />
            <p className="err">{errors.email?.message}</p>
          </div>
        </div>

        <label>Work / Profession</label>
        <input type="text" placeholder="e.g. Software Engineer" {...register("work")} />

        <label>Contact Description</label>
        <textarea rows="4" placeholder="Enter contact details..." {...register("description")}></textarea>

        <label>Contact Image</label>
        <input type="file" accept="image/*" {...register("image")} />

        <div className="btns">
          <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Save Contact'}</button>
          <button type="button" className="reset" onClick={() => reset()}>Reset</button>
        </div>
      </form>
    </div>
  );
};

export default AddContact;
