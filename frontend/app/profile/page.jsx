"use client";
import NavBar from "@/components/NavBar";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";

const Profile = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (!user) {
    return (
      <div>
        <NavBar />
        <h1 className="flex items-center justify-center pt-4 lg:pt-8 text-xl font-semibold">
          Login to view your profile.
        </h1>
      </div>
    );
  }
  return (
    <div>
      <NavBar />
      <section className="flex flex-col items-center my-4 md:px-6 md:my-6 lg:px-48 lg:py-10 lg:my-8">
        <h1 className="text-3xl font-bold text-primary-color">My Profile</h1>
        <div className="my-4 md:my-6 lg:my-8">
          <Image
            src={user.picture}
            className="rounded-full w-[140px] md:w-[150px] lg:w-[164px]"
            width={200}
            height={200}
            alt="profile"
          />
        </div>
        <section className="flex flex-col items-start justify-evenly gap-y-4 md:gap-y-6 lg:gap-y-10 my-4 md:my-6 lg:my-8">
          <div>
            <h3 className="text-xl md:text-2xl font-semibold">Name</h3>
            <p>{user.name}</p>
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-semibold">Nick-name</h3>
            <p>{user.nickname}</p>
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-semibold">Email</h3>
            <p>{user.email}</p>
          </div>
        </section>
      </section>
    </div>
  );
};

export default Profile;
