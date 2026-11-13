import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { API_BASE_URL } from '../apiConfig';

const Settings = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const token = localStorage.getItem("basicToken");

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${token}`
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok) {
        const email = localStorage.getItem("userEmail");
        localStorage.setItem("basicToken", btoa(`${email}:${data.newPassword}`));
        reset();
        Swal.fire('Success!', 'Password changed successfully!', 'success');
      } else {
        Swal.fire('Error', result.error || 'Old password is incorrect.', 'error');
      }
    } catch (error) {
      Swal.fire('Server Error', 'Cannot connect to server.', 'error');
    }
  };

  return (
    <div className="dash-card" style={{ maxWidth: '550px' }}>
      <h1>Account Settings</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Change your account password</p>

      <form onSubmit={handleSubmit(onSubmit)} className="dash-form">
        <label>Old Password</label>
        <input type="password" placeholder="Enter old password" {...register("oldPassword", { required: "Old password is required" })} />
        <p className="err">{errors.oldPassword?.message}</p>

        <label>New Password</label>
        <input type="password" placeholder="Enter new password (min 8 chars)" {...register("newPassword", { required: "New password is required", minLength: { value: 8, message: "Minimum 8 characters" } })} />
        <p className="err">{errors.newPassword?.message}</p>

        <div className="btns">
          <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Updating...' : 'Change Password'}</button>
          <button type="button" className="reset" onClick={() => reset()}>Reset</button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
