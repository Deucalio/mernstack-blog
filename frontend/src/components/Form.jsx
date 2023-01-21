import React, { useEffect } from "react";
import { useState, useRef } from "react";
// FORM component can be used for adding or editing an Article

const Form = () => {
  const inputRef = useRef(null);
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [file, setFile] = useState(null);

  //   useEffect(() => {
  //     console.log(inputRef.current.required);
  //   });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleImg = async (e) => {
    // const inputElement = e.target.previousElementSibling;
    // const inputFile = inputElement.files[0];

    const res = await req.json();
    // console.log("res",res.picture) returns a url of picture uploaded
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.title.length === 0 || formData.description.length <= 10) {
      return alert("Please use form appropriately ");
    }
    const req1 = fetch("http://localhost:3000/article/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((res) => res.json());

    let formdata = new FormData();
    formdata.append("picture", file);

    let requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    

    const req2 = fetch(
      "http://localhost:3000/article/add/img",
      requestOptions
    ).then((res) => res.json());
    // const res = await req2.json();

    const allRes = Promise.all([req2, req1]);

    const data = allRes.then((res) => {
      return res;
    });

    const response = await data;

    const req3 = await fetch("http://localhost:3000/article/AddToDb", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: response[0].CoverImg,
        title: response[1].title,
        description: response[1].description,
      }),
    });

    const res3 = await req3.json();

    console.log("res3", res3);

    // await handleImg();
  };

  return (
    <>
      <form className="text-[#ECECEC] rounded-sm p-6 inset-0 h-[80vh] w-[90vw] lg:w-[70vw] absolute mx-auto translate-y-1/2 -top-1/4 z-50 bg-[#0d1217] overflow-y-scroll">
        <fieldset className="grid grid-cols-2 text-[#ECECEC]/80">
          <p className="text-xl tracking-tight  border-b-2 border-[#ECECEC]/40 w-fit">
            Add an Article{" "}
          </p>
          <p className="ml-auto pr-3 text-2xl lg:text-4xl cursor-pointer">
            &times;
          </p>
        </fieldset>

        <ul className=" border-yellow-400 my-7 flex flex-col gap-6">
          <li className="flex flex-col gap-2">
            <label className="text-lg">Cover Image:</label>
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
              onChange={handleChange}
              name="description"
              className="bg-transparent resize-none h-44 lg:h-48 whitespace-pre-line"
              id=""
            ></textarea>
          </li>

          <li className="flex flex-wrap gap-3 py-2 text-[#E5E5CB]">
            <button
              onClick={handleSubmit}
              type="submit"
              className="bg-blue-700 hover:bg-blue-900 transition-all duration-500  py-1 px-2 text-lg tracking-tight rounded-md"
            >
              Submit
            </button>
            <button
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
