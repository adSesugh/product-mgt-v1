'use client';

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Layout ({ children }) {
    const { status } = useSession();
    if (status !== 'authenticated') {
        return redirect("/");
    }
    return (
        <div className="px-6 py-2">{children}</div>
    );
}
