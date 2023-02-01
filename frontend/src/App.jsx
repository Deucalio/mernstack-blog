import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddForm from "./components/AddForm";
import DeletePopup from "./components/DeletePopup";
import EditForm from "./components/EditForm";
import Login from "./components/Login";
import Logout from "./components/Logout";

const FeaturedArticleSection = ({
  closeForm,
  title,
  coverImg,
  showForm,
  id,
  showLogForm,
  displayLoginForm,
  adminLoggedIn,
  displayLogoutForm,
  logAdminOut,
  setAdminLoggedIn,
}) => {
  const articleRoute = `/articles/${id}`;
  return (
    <section
      style={{
        backgroundImage: ` 
      linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)),
      url(${coverImg})`,
      }}
      className="relative home mx-auto h-[80vh] bg-cover bg-center shadow-2xl"
    >
      <nav className="relative flex flex-wrap justify-between p-4 text-[#ECECEC]">
        <p className="cursor-pointer text-3xl uppercase relative">Blog</p>

        {adminLoggedIn && (
          <button
            onClick={() => showForm("add")}
            className="absolute left-4 top-16 px-4 py-2 bg-green-600 hover:bg-green-800 text-lg transition-all ease-linear rounded-md text-[#ECECEC]"
          >
            Add an Article
          </button>
        )}

        <div className="flex flex-wrap items-center gap-1 text-xl">
          <div className="flex cursor-pointer items-center hover:opacity-90"></div>

          <p
            onClick={showLogForm}
            className="ml-3 w-32 cursor-pointer rounded-sm border-2 border-[#ECECEC] p-1 text-center shadow-xl transition-all duration-1000 hover:bg-[#ECECEC]/25"
          >
            {adminLoggedIn === true ? "Hammad" : "Admin"}
          </p>
        </div>
        {displayLoginForm && (
          <Login setAdminLoggedIn={setAdminLoggedIn} closeForm={closeForm} />
        )}
        {displayLogoutForm && (
          <Logout
            setAdminLoggedIn={setAdminLoggedIn}
            logAdminOut={logAdminOut}
            closeForm={closeForm}
          />
        )}
      </nav>

      <main className="flex h-5/6 flex-col justify-end gap-3 border-sky-500 xl:mr-20 xl:gap-6">
        <header className="mx-auto h-auto w-fit cursor-pointer border-green-500 text-2xl text-white/95 hover:underline sm:h-36">
          <Link tabIndex="-1" to={articleRoute}>
            <div className="pointer-events-none flex flex-col gap-3 rounded-sm border-l-4 border-l-rose-900 bg-black/30 p-4 h-4/5 justify-center">
              <p className="text-lg text-[E5E5CB]">Featured Article:</p>
              <p className="text-lg text-[#E5E5CB]">{title}</p>
            </div>
          </Link>
        </header>
      </main>
    </section>
  );
};

const ArticleBox = ({
  adminLoggedIn,
  coverImg,
  title,
  index,
  showForm,
  deleteButton,
  id,
  showEditForm,
}) => {
  const articleRoute = `/articles/${id}`;
  if (index % 5 == 0) {
    return (
      <figure
        style={{
          backgroundImage: `url(${coverImg})`,
        }}
        className={`relative z-10 h-72 w-full bg-cover bg-center shadow-2xl sm:col-span-2 sm:w-full lg:col-span-6 lg:row-span-2 lg:h-[26.9rem]`}
      >
        {adminLoggedIn && (
          <>
            <button
              onClick={() => showEditForm(id)}
              className="bg-purple-600 hover:bg-purple-700 transition-all z-50 absolute top-0 py-1 px-3 text-lg text-white rounded-md"
            >
              <p onClick={window.scrollTo(0, 0)}>Edit</p>
            </button>
            <button
              onClick={() => deleteButton(id)}
              className="bg-red-600 hover:bg-red-700 transition-all z-50 absolute top-0 left-16 py-1 px-3 text-lg text-white rounded-md"
            >
              Delete
            </button>
          </>
        )}
        <div className="absolute inset-0 z-20 bg-black/20 transition-all"></div>

        <Link tabIndex="-1" to={articleRoute}>
          <div className="absolute bottom-0 left-1/4 z-30 m-4 h-20 border-l-4 border-l-rose-900 bg-black/30 cursor-pointer p-4 sm:justify-center lg:left-2">
            <p id="titleP" className="text-lg text-[#ffffff] hover:underline">
              {title}
            </p>
          </div>
        </Link>
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
      {adminLoggedIn && (
        <>
          <button
            onClick={() => showEditForm(id)}
            className="bg-purple-600 hover:bg-purple-700 transition-all z-50 absolute top-0 py-1 px-3 text-lg text-white rounded-md"
          >
            <p onClick={window.scrollTo(0, 0)}>Edit</p>
          </button>
          <button
            onClick={() => deleteButton(id)}
            className="bg-red-600 hover:bg-red-700 transition-all z-50 absolute top-0 left-16 py-1 px-3 text-lg text-white rounded-md"
          >
            Delete
          </button>
        </>
      )}
      <div className="absolute inset-0 z-20 bg-black/20 transition-all"></div>

      <Link tabIndex="-1" to={articleRoute}>
        <div className="absolute bottom-0 left-1/4 z-30 m-4 h-20 border-l-4 border-l-rose-900 bg-black/30 hover:underline cursor-pointer p-4 sm:justify-center lg:left-2">
          <p id="titleP" className="text-lg text-[#E5E5CB] hover:underline">
            {title}
          </p>
        </div>
      </Link>
    </figure>
  );
};

const App = () => {
  const [articles, setArticles] = useState([]);
  const [editArticle, setEditArticle] = useState({});

  const [displayEditForm, setDisplayEditForm] = useState(false);
  const [displayAddForm, setDisplayAddForm] = useState(false);

  const [displayDeletePopup, setDisplayDeletePopup] = useState(false);
  const [deleteArticleId, setDeleteArticleId] = useState("");

  const [displayLoginForm, setDisplayLoginForm] = useState(false);
  const [displayLogoutForm, setDisplayLogoutForm] = useState(false);

  const [adminLoggedIn, setAdminLoggedIn] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  const showLogForm = () => {
    if (adminLoggedIn === true) {
      return setDisplayLogoutForm(true);
    }
    setDisplayLoginForm(true);
  };

  const logAdminOut = () => {
    setAdminLoggedIn(false);
    localStorage.clear();
    closeForm();
  };

  const showForm = (text) => {
    if (text === "add") {
      setDisplayAddForm(true);
      return 0;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const showEditForm = (id) => {
    const article = articles.filter((a) => a._id === id)[0];
    setEditArticle(article);
    setDisplayEditForm(true);
  };

  const closeForm = () => {
    document.body.classList.remove("overflow-y-hidden");
    setDisplayAddForm(false);
    setDisplayEditForm(false);
    setDisplayLoginForm(false);
    setDisplayLogoutForm(false);
  };

  // saves id for the button to be deleted
  const deleteButton = (id) => {
    setDeleteArticleId(id);
    setDisplayDeletePopup(true);
  };

  // this returns true(if article is to be deleted) or false
  const displayDeleteArticlePopUp = (bool) => {
    if (bool === true) {
      // alert("DELETED");
      deleteArticle(deleteArticleId);
      setDeleteArticleId("");
      setDisplayDeletePopup(false);
    } else {
      setDeleteArticleId("");
      setDisplayDeletePopup(false);
    }
  };

  const deleteArticle = async (id) => {
    const response = await fetch(`${apiUrl}/article/${String(id)}`, {
      method: "DELETE",
    });
    const res = await response.json();
    window.location.reload(true);
  };

  useEffect(() => {
    let ignore = false;
    async function getData() {
      try {
        const response = await fetch(`${apiUrl}`);
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

  useEffect(() => {
    // if user is not logged in
    if (adminLoggedIn) {
      console.log("admin logged in");
      closeForm();
    } else {
      console.log("no admin");
    }
  }, [adminLoggedIn]);

  const deleteBtn = async (id) => {
    const response = await fetch(`${apiUrl}/api/${String(id)}`, {
      method: "DELETE",
    });
    const obj = await response.json();
    setData(obj);
  };

  if (articles.length == 0) {
    // Display loader if the data fetched isn't laoded (implies there are no articles)
    return (
      <>
        <div className="absolute inset-0 z-30 bg-black/90"></div>
        <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center inset-0">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-100"></div>
        </div>
      </>
    );
  }

  return (
    <div id="top" className={`App`}>
      <FeaturedArticleSection
        setAdminLoggedIn={setAdminLoggedIn}
        logAdminOut={logAdminOut}
        displayLogoutForm={displayLogoutForm}
        adminLoggedIn={adminLoggedIn}
        closeForm={closeForm}
        showLogForm={showLogForm}
        displayLoginForm={displayLoginForm}
        showForm={showForm}
        id={articles[4]._id}
        title={articles[4].title}
        coverImg={articles[4].coverImgUrl}
      />

      <section className="relative container mx-auto flex h-auto grid-cols-1 flex-col items-center justify-center gap-3 border-fuchsia-600 px-2 py-2 sm:grid sm:grid-cols-2 sm:items-center sm:gap-2 sm:px-6 lg:h-auto lg:grid-cols-12 lg:grid-rows-2 lg:gap-3 lg:p-3 lg:py-6">
        {articles.map((article, i) => {
          return (
            <ArticleBox
              adminLoggedIn={adminLoggedIn}
              showForm={showForm}
              showEditForm={showEditForm}
              deleteButton={deleteButton}
              id={article._id}
              title={article.title}
              description={article.description}
              coverImg={article.coverImgUrl}
              key={article.title}
              index={i}
            />
          );
        })}
        {/* <form className="absolute inset-0 h-[60vh] w-[80vw] z-[60] border-4 border-green-300"></form> */}
      </section>

      {displayEditForm && (
        <EditForm editArticle={editArticle} closeForm={closeForm} />
      )}
      {displayAddForm && <AddForm closeForm={closeForm} />}

      {displayDeletePopup && (
        <DeletePopup displayDeleteArticlePopUp={displayDeleteArticlePopUp} />
      )}

      {displayLoginForm && (
        <div className="absolute inset-0 z-40 bg-black/90"></div>
      )}
      {displayLogoutForm && (
        <div className="absolute inset-0 z-40 bg-black/70"></div>
      )}
    </div>
  );
};

export default App;
