import { useEffect, useState } from "react";
import Form from "./components/Form";

const FeaturedArticleSection = () => {
  return (
    <section className="home mx-auto h-[80vh] bg-cover bg-center shadow-2xl">
      <nav className="flex flex-wrap justify-between p-4 text-[#ECECEC]">
        <p className="cursor-pointer text-3xl uppercase">Blog</p>
        <div className="flex flex-wrap items-center gap-1 text-xl">
          <div className="flex cursor-pointer items-center hover:opacity-90">
            {/* default is dark mode */}
            {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="pointer-events-none h-6 w-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
          />
        </svg> */}

            {/* svg for sun (light mode) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="pointer-events-none h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
              />
            </svg>
          </div>

          <p className="ml-3 w-32 cursor-pointer rounded-sm border-2 border-[#ECECEC] p-1 text-center shadow-xl transition-all duration-1000 hover:bg-[#ECECEC]/25">
            Admin
          </p>
        </div>
      </nav>
      <main className="flex h-5/6 flex-col justify-end gap-3 border-sky-500 xl:mr-20 xl:gap-6">
        <header className="mx-auto h-auto w-fit cursor-pointer border-green-500 text-2xl text-white/95 hover:underline sm:h-36">
          <div className="pointer-events-none flex flex-col gap-3 rounded-sm border-l-4 border-l-rose-900 bg-black/30 p-4 h-4/5 justify-center">
            <p className="text-lg text-[E5E5CB]">Featured Article:</p>
            <p className="text-lg text-[#E5E5CB]">
              The Last of Us: HBO's post apocalyptic series met with
              near-perfect score
            </p>
          </div>
        </header>
      </main>
    </section>
  );
};

const App = () => {
  const [articles, setArticles] = useState([]);

  // useEffect(() => {
  //   let ignore = false;
  //   async function getData() {
  //     try {
  //       const response = await fetch("http://localhost:3000/api");
  //       const obj = await response.json();
  //       setData(obj);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }
  //   if (!ignore) {
  //     getData();
  //   }
  //   return () => {
  //     ignore = true;
  //   };
  // }, []);

  const deleteBtn = async (id) => {
    const response = await fetch(`http://localhost:3000/api/${String(id)}`, {
      method: "DELETE",
    });
    const obj = await response.json();
    setData(obj);
  };

  const sendPostReq = async () => {
    const req = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "Ali@gmail.com",
        password: "Hammad",
      }),
    });
    const res = await req.json();
    console.log("res", res);
  };

  let tags;

  if (articles.length == 0) {
    tags = <p>Loading</p>;
  } else {
    tags = articles.map((s, i) => (
      <li key={i}>
        {s.title}
        <button type="submit" onClick={() => deleteBtn(s.id)}>
          Delete
        </button>
        <br />
      </li>
    ));
  }

  return (
    <div className="App">
      <FeaturedArticleSection />
    </div>
  );
};

export default App;
