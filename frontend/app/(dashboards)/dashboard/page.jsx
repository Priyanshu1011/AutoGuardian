"use client";
import NavBar from "@/components/NavBar";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";

const Dashboard = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (!user) {
    return (
      <div>
        <NavBar />
        <h1 className="flex items-center justify-center pt-4 lg:pt-8 text-xl font-semibold">
          Login to get access to your dashboard.
        </h1>
      </div>
    );
  }
  return (
    <div>
      <NavBar />
      <section className="flex flex-col px-4 py-4 md:px-6 lg:px-48 lg:py-10">
        <section className="flex flex-col gap-y-2 mb-4 md:mb-6 lg:mb-10">
          <h1 className="text-3xl font-bold">
            Hello, <span className="text-primary-color">{user.name}</span>
          </h1>
          <h2 className="text-2xl font-semibold">
            Welcome to the AutoGuardian dashboard!
          </h2>
        </section>
        <p className="text-md">
          Here is a list of vehicle metrics you can analyze.
        </p>
        <ul>
          <li>
            <Link href="/dashboard/engine" legacyBehavior>
              <button className="bg-white text-blue-600 py-2 px-4 rounded mr-4">
                Engine
              </button>
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Dashboard;
