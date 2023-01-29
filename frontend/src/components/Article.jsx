import React from "react";
import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import NotFound from "../components/NotFound";

const Comment = ({ username, comment, commentedAt }) => {
  return (
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
        <p className="text-base text-[#CECECE]">{username}</p>
      </div>
      <p className="px-1 text-left text-base text-[#CECECE]">{comment}</p>
      <p className="py-2 px-1 text-left text-base text-[#CECECE]">
        {commentedAt}
      </p>
    </div>
  );
};

const Article = () => {
  const { id } = useParams();
  const [article, setArticle] = useState("");
  // const [comments, setComments] = useState([
  //   { username: "", comment: "", commentedAt: "" },
  // ]);
  const [addedComments, setAddedComments] = useState([]);
  const usernameInput = useRef(null);
  const commentInput = useRef(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    let ignore = false;
    async function getData() {
      try {
        const response = await fetch(`${apiUrl}/article/${String(id)}`);
        const obj = await response.json();
        setArticle(obj.article);
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

  if (article === null) {
    return <NotFound />;
  }

  if (article === "") {
    return (
      <>
        <div className="absolute inset-0 z-30 bg-black/90"></div>
        <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center inset-0">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-100"></div>
        </div>
      </>
    );
  }
  let { title, description, coverImgUrl, comments } = article;
  let { commentedAt } = article.comments;
  // commentedAt = new Date(commentedAt.split("T")).toDateString();
  // commentedAt = commentedAt.slice(4, -5) + ", " + commentedAt.slice(-4);

  const handleSubmit = async (e) => {
    const username = usernameInput.current.value.trim();
    const comment = commentInput.current.value.trim();

    e.preventDefault();
    if (username === "") {
      return usernameInput.current.focus();
    } else if (comment === "") {
      return commentInput.current.focus();
    }

    let date = new Date().toDateString();
    date = date.slice(4, -5) + ", " + date.slice(-4);
    const newComment = {
      username: username,
      comment: comment,
      commentedAt: date,
    };

    const req = await fetch(
      `${apiUrl}/article/comment/${String(id)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newComment),
      }
    );
    const res = await req.json();
    // setComments([ ...comments, newComment ]);
    // setArticle({
    //   ...article.article,
    //   comments: [...article.comments, newComment],
    // });
    setAddedComments([...addedComments, newComment]);
    // console.log("res", res);
    usernameInput.current.value = "";
    commentInput.current.value = "";
  };

  return (
    <>
      <section
        style={{ backgroundImage: `url(${coverImgUrl})` }}
        className={`relative h-[80vh] bg-cover bg-fixed bg-center sm:h-[70vh]`}
      >
        <div className="absolute inset-0 z-10 bg-black/60"></div>
        <nav className="relative z-30 flex flex-wrap justify-between gap-2 py-2 text-[#ECECEC] sm:gap-0 sm:p-4">
          <Link to="/">
            <p className="cursor-pointer py-1 text-2xl uppercase sm:text-3xl">
              Blog
            </p>
          </Link>

          <div className="flex flex-wrap items-center gap-1 text-lg">
            <div className="flex cursor-pointer items-center hover:opacity-90">
          
            </div>
{/* 
            <p className="ml-3 w-32 cursor-pointer rounded-sm border-2 border-[#ECECEC] p-1 text-center shadow-xl transition-all duration-1000 hover:bg-[#ECECEC]/25">
              Admin
            </p> */}
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
                ref={usernameInput}
                className="mx-auto  border-0 rounded-sm w-52 p-1 text-base 2xl:text-lg  placeholder:text-base placeholder:text-[#ECECEC]/30 tracking-wide sm:w-auto lg:w-80 bg-[#1f2424] text-[#ECECEC]"
                maxLength="10"
                type="text"
                placeholder="Username: "
              />
              <input
                ref={commentInput}
                className="mx-auto  border-0 rounded-sm w-52 p-1 text-base 2xl:text-lg  placeholder:text-base placeholder:text-[#ECECEC]/30 tracking-wide sm:w-auto lg:w-80 bg-[#1f2424] text-[#ECECEC]"
                maxLength="80"
                type="text"
                placeholder="Comment: "
              />
            </fieldset>

            <button
              onClick={handleSubmit}
              type="submit"
              className="my-6 rounded-sm border-4 border-gray-400 py-2 px-4 text-base xl:text-lg text-gray-300 transition-all duration-1000 hover:bg-gray-200/10"
            >
              Comment
            </button>
          </form>

          {comments.length !== 0
            ? comments.map((comment) => {
                return (
                  <Comment
                    key={comment._id}
                    commentedAt={
                      new Date(comment.commentedAt)
                        .toDateString()
                        .slice(4, -5) +
                      ", " +
                      new Date(comment.commentedAt).toDateString().slice(-4)
                    }
                    username={comment.username}
                    comment={comment.comment}
                  />
                );
              })
            : ""}

          {/* if user post comment display that too */}
          {addedComments.length !== 0 &&
            addedComments.map((comment, i) => {
              return (
                <Comment
                  key={i}
                  commentedAt={comment.commentedAt}
                  username={comment.username}
                  comment={comment.comment}
                />
              );
            })}
        </div>
      </section>
    </>
  );
};

export default Article;
