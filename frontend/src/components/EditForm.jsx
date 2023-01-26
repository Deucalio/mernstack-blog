import React, { useEffect } from "react";
import { useState, useRef } from "react";
// FORM component can be used for adding or editing an Article

const Form = ({ closeForm, editArticle }) => {
  const { _id, title, description, coverImgUrl } = editArticle;

  const editBtn = useRef(null);

  const inputRef = useRef(null);
  const [formData, setFormData] = useState({
    title: title,
    description: description,
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const uploadImg = async () => {
    let formdata = new FormData();
    formdata.append("picture", file);

    let requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };
    const req = fetch("http://localhost:3000/article/add/img", requestOptions);
    const res = req.json();
    console.log("done", res);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    editBtn.disabled = true;

    if (formData.title.length === 0 || formData.description.length <= 10) {
      return alert("Please use form appropriately ");
    }

    // if user modified title and description but didn't change image
    if (file === null) {
      const req = await fetch(
        `http://localhost:3000/article/edit/titleDescription/${_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const res = await req.json();
      window.location.reload(true);
    }
  };

  const formElement = useRef(null);
  useEffect(() => {
    let anim;
    document.body.classList.add("overflow-y-hidden");
    anim = setTimeout(() => {
      formElement.current.classList.add("mt-4");
      formElement.current.classList.remove("opacity-0");
    }, 400);

    return () => {
      document.body.classList.remove("overflow-y-hidden");
      clearTimeout(anim);
    };
  });

  return (
    <>
      <form
        ref={formElement}
        className="text-[#ECECEC] transition-all duration-700 opacity-0 rounded-sm p-6 inset-0 h-[80vh] w-[90vw] lg:w-[70vw] absolute mx-auto translate-y-1/2 -top-1/4 z-50 bg-[#0d1217] overflow-y-scroll"
      >
        <fieldset className="grid grid-cols-2 text-[#ECECEC]/80">
          <p className="text-xl tracking-tight  border-b-2 border-[#ECECEC]/40 w-fit">
            Edit an Article{" "}
          </p>
          <p
            onClick={closeForm}
            className="ml-auto pr-3 text-2xl lg:text-4xl cursor-pointer"
          >
            &times;
          </p>
        </fieldset>

        <ul className=" border-yellow-400 my-7 flex flex-col gap-6">
          <li className="flex flex-col gap-2">
            <label className="text-lg">Cover Image:</label>
            <p className="text-lg underline">
              Default image is selected if you don't choose a new image
            </p>
            <input
              onChange={(e) => setFile(e.target.files[0])}
              name="CoverImg"
              ref={inputRef}
              type="file"
              id=""
            />
            {/* <p className="underline">Default image selected</p> */}
          </li>
          <li className="flex flex-col gap-2">
            <label className="text-lg">Title:</label>
            <input
              value={formData.title}
              onChange={handleChange}
              name="title"
              className="bg-transparent py-1 px-2 text-lg rounded-sm"
              type="text"
              id=""
            />
          </li>

          <li className="flex flex-col gap-2">
            <label className="text-lg">Description:</label>
            <textarea
              value={formData.description}
              onChange={handleChange}
              name="description"
              className="bg-transparent resize-none h-44 lg:h-48 whitespace-pre-line"
              id=""
            ></textarea>
          </li>

          <li className="flex flex-wrap gap-3 py-2 text-[#E5E5CB]">
            <button
              ref={editBtn}
              onClick={handleSubmit}
              type="submit"
              className="bg-blue-700 hover:bg-blue-900 transition-all duration-500  py-1 px-2 text-lg tracking-tight rounded-md"
            >
              Edit
            </button>
            <button
              onClick={closeForm}
              type="button"
              className="bg-red-600 hover:bg-red-800 transition-all  duration-500 py-1 px-2 text-lg tracking-tight rounded-md"
            >
              Close
            </button>
          </li>
        </ul>
      </form>
      <div className="bg-black/60 absolute inset-0 z-10"> </div>
    </>
  );
};

export default Form;
