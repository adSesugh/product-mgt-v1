import { prisma } from '@/lib/prisma';
import moment from 'moment';
import Link from 'next/link';
import React, { Fragment } from 'react';

export default async function Employee () {
    const employees = await prisma.employee.findMany({
        include: {
            jobRole: {
                select: { name: true, id: true, salary: true }
            }
        }
    });

    return (
        <div className=''>
            <header className='flex justify-end px-4'>
                <Link className='px-5 py-2 bg-green-600 rounded-md text-white' href={'/employees/create'}>Add Employee</Link>
            </header>
            <div>
                <table className='table table-fixed w-full'>
                    <thead>
                        <tr>
                            <th>Full name</th>
                            <th>Salary</th>
                            <th>CreatedAt</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.length !== 0 ? (
                            <Fragment>
                                {employees.map((employee) => (
                                    <tr key={employee.id.toString()}>
                                        <td>{employee.first_name}, {employee.middle_name} {employee.last_name}</td>
                                        <td>{employee.jobRole.salary.toString()}</td>
                                        <td>{moment(employee.createdAt).format('LL')}</td>
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
        </div>
    );
}
