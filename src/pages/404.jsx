import { Link } from "react-router-dom";

const title = "Error 404!";
const desc = "Oops! The Page You Are Looking For Could Not Be Found";
const btnText = "Go Back To Home";

const ErrorPage = () => {
  return (
    <main class="h-screen w-full flex flex-col justify-center items-center relative z-0 bg-primary">
      <h1 class="xl:text-9xl md:text-7xl text-5xl font-extrabold text-white tracking-widest w-11/12 text-center mx-auto">
        {title}
      </h1>
      <div class="bg-orange-500 px-2 text-sm lg:translate-y-[-2.2rem] translate-y-[-1.2rem]  rounded rotate-12 absolute">
        {desc}
      </div>
      <button class="lg:mt-14 xl:mt-20 mt-12">
        <Link
          to="/"
          class="relative inline-block text-sm font-medium text-orange-500 group active:text-white focus:outline-none focus:ring"
        >
          <span class="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-orange-500 group-hover:translate-y-0 group-hover:translate-x-0"></span>

          <span class="relative block px-8 py-3 bg-[#1A2238] border border-current">
            {btnText}
          </span>
        </Link>
      </button>
    </main>
  );
};

export default ErrorPage;
