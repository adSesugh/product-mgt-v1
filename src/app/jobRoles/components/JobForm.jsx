'use client';
import { toast } from 'react-toastify';

export default function JobForm () {
    async function handleSubmit (e) {
        e.preventDefault();
        const form = new FormData(e.target);
        try {
            const res = await fetch('/api/jobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: form.get('name'),
                    salary: form.get('salary'),
                    description: form.get('description'),
                }),
            });
            const { message, job_role } = await res.json();

            if (job_role) {
                form.forEach(el => {
                    form.delete(el.name);
                });
            }
            return toast.success(message);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='grid place-items-center h-full'>
            <div className='p-10 border border-slate-200 rounded-xl shadow-2xl'>
                <form onSubmit={handleSubmit} method='POST' className='flex flex-col justify-center'>
                    <div className='my-5'>
                        <h2 className='text-center font-medium text-xl'>Create a Job Role</h2>
                    </div>
                    <div className='flex mb-3 justify-between items-center'>
                        <label htmlFor='name' className='mr-4'>Name:</label>
                        <input type='text' className='border border-slate-300 rounded-lg py-2 px-3' id='name' name='name' required />
                    </div>
                    <div className='flex mb-3 justify-between items-center'>
                        <label htmlFor='salary' className='mr-4'>Standary Salary:</label>
                        <input type='text' className='border border-slate-300 rounded-lg py-2 px-3' id='salary' name='salary' required />
                    </div>
                    <div className='flex mb-4 justify-between items-center'>
                        <label htmlFor='description' className='mr-4'>Description:</label>
                        <textarea placeholder='Job description' cols={22} name='description' id='description' className='border border-slate-300 rounded-lg py-2 px-3' />
                    </div>
                    <button type='submit' className='px-5 py-2 text-white bg-green-900 rounded-md'>Submit</button>
                </form>
            </div>
        </div>
    );
}
