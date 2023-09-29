'use client';

import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Login () {
    const { status } = useSession();
    async function handleSubmit (e) {
        e.preventDefault();
        const form = new FormData(e.target);

        await signIn('credentials', {
            email: form.get('email'),
            password: form.get('password'),
            callbackUrl: '/dashboard',
        });
    }
    return (
        <div className='grid place-items-center h-screen'>
            <div className='p-10 border border-slate-200 rounded-xl shadow-2xl'>
                <form method='POST' onSubmit={handleSubmit} className='flex flex-col justify-center'>
                    <div className='my-5'>
                        <h2 className='text-center font-medium text-xl'>Sign in to continue</h2>
                    </div>
                    <div className='flex mb-3 justify-between items-center'>
                        <label htmlFor='email' className='mr-4'>Email Address:</label>
                        <input type='text' className='border border-slate-300 rounded-lg py-2 px-3' id='email' name='email' required />
                    </div>
                    <div className='flex mb-4 justify-between items-center'>
                        <label htmlFor='password' className='mr-4'>Password:</label>
                        <input type='password' className='border border-slate-300 rounded-lg py-2 px-3 form-input' id='password' name='password' required />
                    </div>
                    <button type='submit' className='px-5 py-2 text-white bg-green-900 rounded-md'>
                        {status === 'loading' ? 'Please wait...' : 'Login'}
                    </button>
                </form>
                <p className='text-center py-2'>
                    Not registered yet? <Link href='/register' className='underline italic text-[13px]'>Register here</Link>
                </p>
            </div>
        </div>
    );
}
