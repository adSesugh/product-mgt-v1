import React, { Fragment } from 'react';
import JobForm from './components/JobForm';
import { prisma } from '@/lib/prisma';
import moment from 'moment';

export default async function JobRole () {
    const jobRoles = await prisma.jobRole.findMany();

    return (
        <div className='flex justify-between h-full w-full'>
            <div className='w-1/2 bg-slate-400 h-full'>
                <table className='table table-auto w-full'>
                    <thead>
                        <tr>
                            <th>Job Name</th>
                            <th>salary</th>
                            <th>Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobRoles.length !== 0 ? (
                            <Fragment>
                                {jobRoles.map((jobRole) => (
                                    <tr key={jobRole.id.toString()}>
                                        <td>{jobRole.name}</td>
                                        <td>{jobRole.salary.toString()}</td>
                                        <td>{moment(jobRole.createdAt).format('LL')}</td>
                                    </tr>
                                ))}
                            </Fragment>
                        ) : (
                            <Fragment>
                                <tr>
                                    <td colSpan={3}>No record found</td>
                                </tr>
                            </Fragment>
                        )}
                    </tbody>
                </table>
            </div>
            <div className='w-1/2 h-full'>
                <JobForm />
            </div>
        </div>
    );
}
