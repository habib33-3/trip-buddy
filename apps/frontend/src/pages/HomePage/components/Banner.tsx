import AuthModal from "./modal/AuthModal";

const Banner = () => {
  return (
    <section className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-6 px-6 py-16 text-center">
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-5xl font-extrabold text-primary">
          Plan Your Next Trip
        </h2>
        <p className="max-w-xl text-lg text-muted-foreground">
          Plan your next trip with ease and find the perfect destination for
          your adventure.
        </p>
        <AuthModal buttonText="Get Started" />
      </div>
    </section>
  );
};

export default Banner;
