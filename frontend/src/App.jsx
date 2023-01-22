import { useEffect, useState } from "react";
import AddForm from "./components/AddForm";
import EditForm from "./components/EditForm";

const FeaturedArticleSection = ({ title, coverImg }) => {
  return (
    <section
      style={{
        backgroundImage: ` 
      linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)),
      url(${coverImg})`,
      }}
      className="home mx-auto h-[80vh] bg-cover bg-center shadow-2xl"
    >
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
            <p className="text-lg text-[#E5E5CB]">{title}</p>
          </div>
        </header>
      </main>
    </section>
  );
};

const ArticleBox = ({
  coverImg,
  title,
  index,
  showForm,
  deleteArticle,
  id,
}) => {
  if (index % 5 == 0) {
    return (
      <figure
        style={{
          backgroundImage: `url(${coverImg})`,
        }}
        className={`relative z-10 h-72 w-full bg-cover bg-center shadow-2xl sm:col-span-2 sm:w-full lg:col-span-6 lg:row-span-2 lg:h-[26.9rem]`}
      >
        <button
          onClick={showForm}
          className="bg-purple-600 hover:bg-purple-700 transition-all z-50 absolute top-0 py-1 px-3 text-lg text-white rounded-md"
        >
          <p onClick={window.scrollTo(0, 0)}>Edit</p>
        </button>
        <button
          onClick={() => deleteArticle(id)}
          class="bg-red-600 hover:bg-red-700 transition-all z-50 absolute top-0 left-16 py-1 px-3 text-lg text-white rounded-md"
        >
          Delete
        </button>
        <div className="absolute inset-0 z-20 bg-black/20 transition-all"></div>

        <div className="absolute bottom-0 left-1/4 z-30 m-4 h-20 border-l-4 border-l-rose-900 bg-black/30 p-4 sm:justify-center lg:left-2">
          <p className="text-xl text-[#E5E5CB]">{title}</p>
        </div>
      </figure>
    );
  }
  return (
    <figure
      style={{
        backgroundImage: `url(${coverImg})`,
      }}
      className={`relative z-10 h-72 sm:h-52 w-full border-sky-900 bg-cover bg-center shadow-2xl lg:col-span-3`}
    >
      <button
        onClick={showForm}
        className="bg-purple-600 hover:bg-purple-700 transition-all z-50 absolute top-0 py-1 px-3 text-lg text-white rounded-md"
      >
        <p onClick={window.scrollTo(0, 0)}>Edit</p>
      </button>
      <button
        onClick={() => deleteArticle(id)}
        class="bg-red-600 hover:bg-red-700 transition-all z-50 absolute top-0 left-16 py-1 px-3 text-lg text-white rounded-md"
      >
        Delete
      </button>

      <div className="absolute inset-0 z-20 bg-black/20 transition-all"></div>

      <div className="absolute bottom-0 left-1/4 z-30 m-4 h-20 border-l-4 border-l-rose-900 bg-black/30 p-4 sm:justify-center lg:left-2">
        <p className="text-xl text-[#E5E5CB]">{title}</p>
      </div>
    </figure>
  );
};

const App = () => {
  const [articles, setArticles] = useState([]);

  const [displayForm, setDisplayForm] = useState(false);

  const showForm = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setDisplayForm(true);
  };

  const closeForm = () => {
    setDisplayForm(false);
  };

  const deleteArticle = async (id) => {
    // console.log(articles.map((a) => a._id === id));
    // console.log("id", id)

    const response = await fetch(
      `http://localhost:3000/article/${String(id)}`,
      {
        method: "DELETE",
      }
    );
    const res = await response.json();
    window.location.reload(true);

    // setData(obj);
    console.log("res", res);
  };

  useEffect(() => {
    let ignore = false;
    async function getData() {
      try {
        const response = await fetch("http://localhost:3000");
        const obj = await response.json();
        setArticles(obj.data);
      } catch (err) {
        console.error(err);
      }
    }
    if (!ignore) {
      getData();
    }
    return () => {
      ignore = true;
    };
  }, []);

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

  if (articles.length == 0) {
    return (
      <>
        <div class="absolute inset-0 z-30 bg-black/90"></div>
        <div class="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center inset-0">
          <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-100"></div>
        </div>
      </>
    );
  }

  return (
    <div id="top" className={`App`}>
      <FeaturedArticleSection
        title={articles[3].title}
        coverImg={articles[3].coverImgUrl}
      />

      <section class="relative container outline mx-auto flex h-auto grid-cols-1 flex-col items-center justify-center gap-3 border-fuchsia-600 px-2 py-2 sm:grid sm:grid-cols-2 sm:items-center sm:gap-2 sm:px-6 lg:h-auto lg:grid-cols-12 lg:grid-rows-2 lg:gap-3 lg:p-3 lg:py-6">
        {articles.map((article, i) => {
          return (
            <ArticleBox
              showForm={showForm}
              setDisplayForm={setDisplayForm}
              deleteArticle={deleteArticle}
              id={article._id}
              title={article.title}
              description={article.description}
              coverImg={article.coverImgUrl}
              key={article.title}
              index={i}
            />
          );
        })}
        {/* <form class="absolute inset-0 h-[60vh] w-[80vw] z-[60] border-4 border-green-300"></form> */}
      </section>

      {displayForm && <AddForm closeForm={closeForm} />}
    </div>
  );
};

export default App;
