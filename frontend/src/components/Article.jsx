import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../components/NotFound";

const Article = () => {
  const { id } = useParams();
  const [article, setArticle] = useState({});

  useEffect(() => {
    let ignore = false;
    async function getData() {
      try {
        const response = await fetch(
          `http://localhost:3000/article/${String(id)}`
        );
        const obj = await response.json();
        setArticle(obj);
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

  if (article.article === null) {
    return <NotFound />;
  }

  if (Object.keys(article).length == 0) {
    return (
      <>
        <div className="absolute inset-0 z-30 bg-black/90"></div>
        <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center inset-0">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-100"></div>
        </div>
      </>
    );
  }
  const { title, description, coverImgUrl } = article.article;

  return (
    <>
      <section style={{backgroundImage: `url(${coverImgUrl})`}} className={`relative h-[80vh] bg-cover bg-fixed bg-center sm:h-[70vh]`}>
        <div className="absolute inset-0 z-10 bg-black/60"></div>
        <nav className="relative z-30 flex flex-wrap justify-between gap-2 py-2 text-[#ECECEC] sm:gap-0 sm:p-4">
          <p className="cursor-pointer py-1 text-2xl uppercase sm:text-3xl">
            Blog
          </p>
          <div className="flex flex-wrap items-center gap-1 text-lg">
            <div className="flex cursor-pointer items-center hover:opacity-90">
              {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="pointer-events-none h-6 w-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        </svg> */}

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
        <p className="relative z-30 mx-auto mt-32 w-4/5 break-words border-b-2 border-b-gray-400 p-1 text-center text-xl text-[#edebeb] sm:mt-2 sm:w-1/3 sm:text-2xl md:mt-6">
          {title}
        </p>
      </section>

      <article className="relative z-10 mx-auto -mt-14 h-full w-[90%] rounded-sm bg-[#1f2424] text-[#EEEEEE]/80 sm:-mt-36 sm:w-2/3">
        <p className="mx-auto w-5/6 py-8 px-4 leading-7 whitespace-pre-line text-sm md:text-base md:leading-8  first-letter:float-left first-letter:px-2 first-letter:text-5xl sm:px-8 sm:py-24 2xl:text-lg">
          {description}
        </p>
      </article>

      {/* Comments Section  */}
      <section className="mx-auto h-auto w-3/4 border-red-700 bg-[#10161d] px-4 py-20 sm:px-0">
        <div className="flex flex-col py-20 text-center text-xl lg:text-2xl">
          <p className="uppercase text-[#ECECEC]">Leave a Comment</p>
          <p className="text-base lg:text-lg uppercase leading-9 tracking-tighter text-[#ECECEC]">
            and Join the conversation
          </p>

          <form>
            <fieldset className="mx-auto flex w-2/3 flex-col gap-2 sm:w-1/3">
              <input
                className="mx-auto  border-0 rounded-sm w-52 p-1 text-base 2xl:text-lg  placeholder:text-base placeholder:text-[#ECECEC]/30 tracking-wide sm:w-auto lg:w-80 bg-[#1f2424] "
                maxlength="10"
                type="text"
                placeholder="Username: "
              />
              <input
                className="mx-auto  border-0 rounded-sm w-52 p-1 text-base 2xl:text-lg  placeholder:text-base placeholder:text-[#ECECEC]/30 tracking-wide sm:w-auto lg:w-80 bg-[#1f2424]"
                maxlength="80"
                type="text"
                placeholder="Comment: "
              />
            </fieldset>

            <button
              type="submit"
              className="my-6 rounded-sm border-4 border-gray-400 py-2 px-4 text-base xl:text-lg text-gray-300 transition-all duration-1000 hover:bg-gray-200/10"
            >
              Comment
            </button>
          </form>

          {/* For A Comment  */}
          <div className="mx-auto my-4 flex h-auto w-full flex-col border-sky-500 bg-[#0d1217] shadow-lg sm:w-[70%]">
            <div className="flex flex-wrap items-center gap-1 py-2">
              <svg
                className="row-span-2 h-full w-10 text-[#CECECE]"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,6A2,2 0 0,0 10,8A2,2 0 0,0 12,10A2,2 0 0,0 14,8A2,2 0 0,0 12,6M12,13C14.67,13 20,14.33 20,17V20H4V17C4,14.33 9.33,13 12,13M12,14.9C9.03,14.9 5.9,16.36 5.9,17V18.1H18.1V17C18.1,16.36 14.97,14.9 12,14.9Z"
                />
              </svg>
              <p className="text-base text-[#CECECE]">Hammad</p>
            </div>
            <p className="px-1 text-left text-base text-[#CECECE]">
              Dude your subjective opinion is objectively wrong, haha!
            </p>
            <p className="py-2 px-1 text-left text-base text-[#CECECE]">
              15 Jan, 2022
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Article;