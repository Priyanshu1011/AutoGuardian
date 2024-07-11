import NavBar from "@/components/NavBar";

const Home = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <NavBar />
      <section className="flex flex-col items-center justify-center gap-y-4">
        <h1 className="text-3xl font-bold text-blue-700">
          Welcome to AutoGuardian
        </h1>
        <div id="about">about</div>
        <div id="services">services</div>
        <div id="contact">contact</div>
      </section>
    </div>
  );
};

export default Home;
