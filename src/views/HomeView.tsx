import Header from "../components/Header";
import { SearchForm } from "../components/SearchForm";

const HomeView = () => {
  return (
    <>
      <Header />
      <main className="bg-gray-100 py-10 min-h-screen bg-no-repeat bg-right-top lg:bg-[url('/bg.svg')] bg-[length:50%]">
        <div className="max-w-5xl mx-auto mt-10">
          <div className="lg:w-1/2 px-10 lg:p-0 space-y-6">
            <h1 className="text-6xl font-black">
              All your <span className="text-cyan-400">Social Media </span> in
              one place
            </h1>
            <p className="text-slate-800 text-xl">
              Join to the community with more than 200 thousand developers,
              sharing their social media, share your TikTok, Instagram,
              Facebook, Youtube, Github and more
            </p>
            <SearchForm />
          </div>
        </div>
      </main>
    </>
  );
};

export default HomeView;
