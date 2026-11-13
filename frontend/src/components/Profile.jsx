import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { API_BASE_URL } from '../apiConfig';

const Profile = () => {
  const { register, handleSubmit, setValue, formState: { isSubmitting } } = useForm();
  const [previewImg, setPreviewImg] = useState("https://placeholder.com");
  const token = localStorage.getItem("basicToken");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/user/profile`, {
          headers: { 'Authorization': `Basic ${token}` }
        });
        if (res.ok) {
          const user = await res.json();
          setValue("name", user.name);
          setValue("email", user.email);
          setValue("about", user.about);
          if (user.imageUrl) setPreviewImg(user.imageUrl);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, [setValue, token]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("about", data.about || "");
    if (data.profileImage && data.profileImage[0]) {
      formData.append("profileImage", data.profileImage[0]);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/user/update-profile`, {
        method: 'PUT',
        headers: { 'Authorization': `Basic ${token}` },
        body: formData
      });

      if (response.ok) {
        localStorage.setItem("userName", data.name);
        Swal.fire('Updated!', 'Your profile has been updated.', 'success');
      } else {
        Swal.fire('Error', 'Failed to update profile.', 'error');
      }
    } catch (error) {
      Swal.fire('Server Error', 'Cannot connect to server.', 'error');
    }
  };

  return (
    <div className="dash-card">
      <h1>Your Profile</h1>
      <div className="profile-header">
        <img src={previewImg} alt="Profile" className="profile-avatar" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="dash-form">
        <label>Your Name</label>
        <input type="text" {...register("name", { required: true })} />

        <label>Email (Cannot be changed)</label>
        <input type="email" disabled {...register("email")} style={{ backgroundColor: '#e2e8f0' }} />

        <label>About Yourself</label>
        <textarea rows="4" {...register("about")}></textarea>

        <label>Update Profile Picture</label>
        <input 
          type="file" 
          accept="image/*" 
          {...register("profileImage")} 
          onChange={(e) => {
            if (e.target.files[0]) setPreviewImg(URL.createObjectURL(e.target.files[0]));
          }}
        />

        <div className="btns">
          <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Updating...' : 'Update Profile'}</button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
