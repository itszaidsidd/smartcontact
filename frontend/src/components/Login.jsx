import React from 'react'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2';
import { API_BASE_URL } from '../apiConfig'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm()

    const navigate = useNavigate()
    const onSubmit = async (data) => {
        try {
            const response = await fetch(`${API_BASE_URL}/public/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.status === 200) {
                localStorage.setItem("userRole", result.role);
                localStorage.setItem("userEmail", result.email);
                localStorage.setItem("userName", result.name);

                // Basic auth header ke liye credentials save kar lena (for future APIs)
                const basicToken = btoa(`${data.email}:${data.password}`);
                localStorage.setItem("basicToken", basicToken);

                reset();
                Swal.fire({
                    title: `Welcome back, ${result.name}!`,
                    text: 'Login successful!',
                    icon: 'success',
                    confirmButtonText: 'Let\'s Go'
                });

                // if(result.role === 'ROLE_ADMIN') { navigate('/admin/dashboard') }

                navigate('/dashboard')
            }
            else if (response.status === 401) {
                Swal.fire('Oops!', result.error || 'Invalid credentials', 'error');
            }
            else {
                Swal.fire('Error', 'An unknown error occurred.', 'error');
            }
        } catch (error) {
            console.error('Network Error:', error);
            Swal.fire('Server Error', 'Cannot connect to backend server.', 'error');
        }
    };

    return (
        <div className='signup login'>
            <div className="form">
                <h1>Login Here !!</h1>
                <form onSubmit={handleSubmit(onSubmit)}>

                    Your Email
                    <input type="email" placeholder='Enter registered email' className={errors.email ? 'err-border' : ''} {...register("email", {
                        required: "Email is required",
                    })} />
                    <p className='err'>{errors.email?.message}</p>

                    Your Password
                    <input type="password" placeholder='Enter password' className={errors.password ? 'err-border' : ''} {...register("password", {
                        required: "Password is required",
                    })} />
                    <p className='err'>{errors.password?.message}</p>

                    <div className="btns">
                        <button type='submit' disabled={isSubmitting}>
                            {isSubmitting ? 'Logging in...' : 'Login'}
                        </button>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default Login;
