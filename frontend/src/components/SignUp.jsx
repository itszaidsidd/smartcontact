import React from 'react'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2';
import { API_BASE_URL } from '../apiConfig'

const SignUp = () => {
    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors, isSubmitting },
    } = useForm()

    const onSubmit = async (data) => {
        delete data.agreement;

        try {
            const response = await fetch(`${API_BASE_URL}/public/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.status === 201) {
                reset();
                Swal.fire({
                    title: 'Success!',
                    text: 'Registration successful!',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                });
            }
            else if (response.status === 400 || response.status === 409) {
                Object.keys(result).forEach((field) => {
                    setError(field, {
                        type: "server",
                        message: result[field]
                    });
                });
            }
            else {
                Swal.fire('Error', result.global || "An unknown server error occurred.", 'error');
            }
        } catch (error) {
            console.error('Network Error:', error);
            Swal.fire('Network Error', 'Cannot connect to server.', 'error');
        }
    };

    return (
        <div className='signup'>
            <div className="form">
                <h1>Register Here !!</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    Your Name
                    <input type="text" placeholder='Enter here' className={errors.name ? 'err-border' : ''} {...register("name", { required: "Name is required" })} />
                    <p className='err'>{errors.name?.message}</p>

                    Your Email
                    <input type="email" placeholder='Enter here' className={errors.email ? 'err-border' : ''} {...register("email", { required: "Email is required" })} />
                    <p className='err'>{errors.email?.message}</p>

                    Your Password
                    <input type="password" placeholder='Enter here' className={errors.password ? 'err-border' : ''} {...register("password", { required: "Password is required" })} />
                    <p className='err'>{errors.password?.message}</p>

                    About Yourself
                    <textarea placeholder='Enter something about yourself' {...register("about")} rows="5"></textarea>

                    <span className='agreement'>
                        <input type="checkbox" {...register("agreement", { required: "You must accept terms" })} />
                        Accept terms and conditions
                    </span>
                    <p className='err'>{errors.agreement?.message}</p>

                    <div className="btns">
                        <button type='submit' disabled={isSubmitting}>
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                        </button>
                        <button type='button' className='reset' onClick={() => reset()} disabled={isSubmitting}>Reset</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp;
