'use client';
import React from 'react';
import { FormEvent } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

export default function Register () {
    async function handleSubmit (e) {
        e.preventDefault();
        const form = new FormData(e.target);
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: form.get('name'),
                email: form.get('email'),
                password: form.get('password'),
            }),
        });
        const data = await res.json();

        if (!data.user) return null;
        await signIn('credentials', {
            email: data.user.email,
            password: form.get('password'),
            callbackUrl: '/',
        });
    }
    return (
        <div className='grid place-items-center h-screen'>
            <div className='p-10 border border-slate-200 rounded-xl shadow-2xl'>
                <form onSubmit={handleSubmit} method='POST' className='flex flex-col justify-center'>
                    <div className='my-5'>
                        <h2 className='text-center font-medium text-xl'>Create an account</h2>
                    </div>
                    <div className='flex mb-3 justify-between items-center'>
                        <label htmlFor='name' className='mr-4'>Full Name:</label>
                        <input type='text' className='border border-slate-300 rounded-lg py-2 px-3' id='name' name='name' required />
                    </div>
                    <div className='flex mb-3 justify-between items-center'>
                        <label htmlFor='email' className='mr-4'>Email:</label>
                        <input type='text' className='border border-slate-300 rounded-lg py-2 px-3' id='email' name='email' required />
                    </div>
                    <div className='flex mb-4 justify-between items-center'>
                        <label htmlFor='password' className='mr-4'>Password:</label>
                        <input type='password' className='border border-slate-300 rounded-lg py-2 px-3' id='password' name='password' required />
                    </div>
                    <button type='submit' className='px-5 py-2 text-white bg-green-900 rounded-md'>Submit</button>
                </form>
                <p className='text-center py-2text-center py-2'>
                    Already registered? <Link href='/login' className='underline italic text-[12px]'>Login here</Link>
                </p>
            </div>
        </div>
    );
}
