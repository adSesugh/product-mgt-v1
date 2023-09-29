"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Fragment } from "react";

export default function Home() {
  const { data, status } = useSession();
  return (
    <div>
      {status === "authenticated" && data !== null ? (
        <Fragment>
          <div className="h-screen">
            <hr />
            <div>
              <h2>Welcome {data.user.username}</h2>
              <p>User ID: {data.user.id}</p>
              <div>{JSON.stringify(data.user)}</div>
            </div>
          </div>
        </Fragment>
      ) : (
        <div className="grid place-items-center h-screen">
          <div>
            <h1 className="text-4xl font-bold">Welcome!</h1>
            <Link href={"/login"} className="underline">
              Login to continue
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
