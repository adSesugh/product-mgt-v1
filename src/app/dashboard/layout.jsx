'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React from 'react';

export default function Layout ({ children }) {
    const { status } = useSession();
    if (status !== 'authenticated' && status !== 'loading') {
        return redirect('/');
    }
    return (
        <div>{children}</div>
    );
}
