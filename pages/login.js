import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';

import Layout from "../components/Layout";
import { getError } from '../utils/error';

const LoginScreen = () => {
    const { handleSubmit, register, formState: { errors } } = useForm();

    const submitHandler = async ({ email, password }) => {
        try {
            const result = await signIn('credentials',{
                redirect: false,
                email,
                password
            });

            if(result.error) {
                toast.error(result.error);
            }

        } catch(err) {
            toast.error(getError(err));
        }
    };

    return (
        <Layout>
            <form onSubmit={handleSubmit(submitHandler)}>
                <h3>Login</h3>
                <div>
                    <label htmlFor="email"> Email:
                        <input
                            type='email'
                            autoFocus
                            {...register('email', {
                                required: 'Please, enter email', pattern: {
                                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                                    message: 'Please enter valid email'
                                }
                            })}>
                        </input>

                        {errors.email && <div style={{ color: 'red' }}>{errors.email.message}</div>}
                    </label>

                    <label htmlFor="password"> Password:
                        <input
                            type='password'
                            autoFocus
                            {...register('password', {
                                required: 'Please, enter password',
                                minLength: {
                                    value: 3,
                                    message: 'Password must be at least 3 chars'
                                }
                            })}>
                        </input>

                        {errors.password && <div style={{ color: 'red' }}>{errors.password.message}</div>}
                    </label>
                </div>
                <div>
                    <button>Login</button>
                </div>
                <div>
                    <i>
                        Don't have an account?
                    </i>
                    <Link href='/register'>
                        <i>
                            <b> Register</b>
                        </i>
                    </Link>
                </div>
            </form>
        </Layout>
    )
}

export default LoginScreen;