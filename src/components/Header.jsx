'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { Fragment } from 'react';

export default function Header () {
    const { data, status } = useSession();
    return (
        <Fragment>
            {status === "authenticated" && data !== null && (
                <div className="flex justify-between h-16 bg-slate-400 px-6 items-center">
                    <div>
                        <ul className='flex list-none gap-x-6'>
                            <li className='text-slate-100'>
                                <Link href={'/dashboard'}>Dashboard</Link>
                            </li>
                            <li className='text-slate-100'>
                                <Link href={'/products'}>Product</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <button
                            onClick={() => signOut({
                                redirect: '/login'
                            })}
                            className="py-1 my-3 px-4 bg-slate-500 text-white rounded-xl"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            )}
        </Fragment>
    );
}
