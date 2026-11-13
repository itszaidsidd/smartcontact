// import React from 'react'
// import { useForm } from 'react-hook-form'
// import { API_BASE_URL } from '../apiConfig'

// const SignUp = () => {
//     const {
//         register,
//         handleSubmit,
//         reset,
//         formState: { errors, isSubmitting },
//     } = useForm()

//     const onSubmit = async (data) => {
//         delete data.agreement; 
//         try {
//             const response = await fetch(`${API_BASE_URL}/user`, { 
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(data),
//             })

//             const result = await response.json()

//             if (response.ok) {
//                 console.log("Success:", result)
//                 reset() 
//             } else {
//                 console.log("Backend error:", result)
//             }
//         } catch (error) {
//             console.error('Network Error:', error)
//         }
//     }

//     return (
//         <div className='signup'>
//             <div className="form">
//                 <h1>Register Here !!</h1>
                
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     Your Name
//                     <input type="text" placeholder='Enter here' className={errors.name ? 'err-border' : ''} {...register("name", {
//                         required: "Name is required",
//                         minLength: { value: 2, message: "Min length is 2" },
//                     })} />
//                     <p className='err'>{errors.name?.message}</p>
                    
//                     Your Email
//                     <input type="email" placeholder='Enter here' className={errors.email ? 'err-border' : ''} {...register("email", {
//                         required: "Email is required",
//                         pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid Email" },
//                     })} />
//                     <p className='err'>{errors.email?.message}</p>
                    
//                     Your Password
//                     <input type="password" placeholder='Enter here' className={errors.password ? 'err-border' : ''} {...register("password", {
//                         required: "Password is required",
//                         minLength: { value: 8, message: "Min length is 8" },
//                     })} />
//                     <p className='err'>{errors.password?.message}</p>
                    
//                     About Yourself
//                     <textarea placeholder='Enter something about yourself' {...register("about")} rows="5"></textarea>
                    
//                     <span className='agreement'>
//                         <input type="checkbox" {...register("agreement", {
//                             required: "You must accept the terms and conditions"
//                         })} />
//                         Accept terms and conditions
//                     </span>
//                     <p className='err'>{errors.agreement?.message}</p>
                    
//                     <div className="btns">
//                         <button type='submit' disabled={isSubmitting}>
//                             {isSubmitting ? 'Submitting...' : 'Submit'}
//                         </button>
//                         <button type='button' className='reset' onClick={() => reset()} disabled={isSubmitting}>Reset</button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default SignUp
