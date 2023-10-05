'use client';

import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function Create () {
    const router = useRouter();
    const [jobRoles, setJobRoles] = useState([]);

    useEffect(() => {
        getJobRoles();
    }, []);

    async function getJobRoles () {
        const res = await fetch('/api/jobs/search', {
            method: 'GET'
        });

        const { job_roles } = await res.json();
        if (job_roles) {
            return setJobRoles(job_roles);
        }
    }

    async function handleSubmit (e) {
        e.preventDefault();
        const form = new FormData(e.target);
        const res = await fetch('/api/employees', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                first_name: form.get('first_name'),
                middle_name: form.get('middle_name'),
                last_name: form.get('last_name'),
                jobRoleId: form.get('jobRole')
            }),
        });
        const { employee, message } = await res.json();
        if (employee) {
            toast.success(message);
            return router.push('/employees');
        }
    }

    return (
        <div>
            <header className='flex justify-end px-4'>
                <Link className='px-5 py-2 bg-slate-600 rounded-md text-white' href={'/employees'}>Back to Employee</Link>
            </header>
            <div className='grid place-items-center h-screen'>
                <div className='p-10 border border-slate-200 rounded-xl shadow-2xl'>
                    <form onSubmit={handleSubmit} method='POST' className='flex flex-col justify-center'>
                        <div className='my-5'>
                            <h2 className='text-center font-medium text-xl'>Create an Employee</h2>
                        </div>
                        <div className='flex mb-3 justify-between items-center'>
                            <label htmlFor='first_name' className='mr-4 w-1/3'>First Name:</label>
                            <input type='text' className='border border-slate-300 rounded-lg py-2 px-3 w-2/3' id='first_name' name='first_name' required />
                        </div>
                        <div className='flex mb-3 justify-between items-center'>
                            <label htmlFor='middle_name' className='mr-4 w-1/3'>Middle Name:</label>
                            <input type='text' className='border border-slate-300 rounded-lg py-2 px-3 w-2/3' id='middle_name' name='middle_name' required />
                        </div>
                        <div className='flex mb-3 justify-between items-center'>
                            <label htmlFor='last_name' className='mr-4 w-1/3'>Last Name:</label>
                            <input type='text' className='border border-slate-300 rounded-lg py-2 px-3 w-2/3' id='last_name' name='last_name' required />
                        </div>
                        <div className='flex mb-3 justify-between items-center'>
                            <label htmlFor='Job Role' className='mr-4 w-1/3'>Job Role:</label>
                            <select name='jobRole' className='border border-slate-300 rounded-lg py-2 px-3 w-2/3' required>
                                {jobRoles.map(role => (
                                    <option key={role.id.toString()} value={role.id.toString()}>{role.name}</option>
                                ))}
                            </select>
                        </div>
                        <button type='submit' className='px-5 py-2 text-white bg-green-900 rounded-md'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
