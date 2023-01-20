import { useEffect, useState } from "react";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let ignore = false;
    async function getData() {
      try {
        const response = await fetch("http://localhost:3000/api");
        const obj = await response.json();
        setData(obj);
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
    console.log("data", data);
  }, [data]);

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

  if (data.length == 0) {
    tags = <p>Loading</p>;
  } else {
    tags = data.map((s, i) => (
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
    <div className="App m-16 p-16 text-white tex-xl outline">
      {/* <p className="text-emerald-600 text-2xl">Hello World!</p>
      <div>{tags}</div>
      <button
        className="text-sm py-1 px-2 bg-blue-500 text-white rounded-md
      "
        type="submit"
        onClick={sendPostReq}
      >
        Send Post Req
      </button> */}

      {/* Upload Image (TEST) */}

      <div className="carousel w-full">
        <div id="item1" className="carousel-item w-full">
          <img src="https://placeimg.com/800/200/arch" className="w-full" />
        </div>
        <div id="item2" className="carousel-item w-full">
          <img src="https://placeimg.com/800/200/arch" className="w-full" />
        </div>
        <div id="item3" className="carousel-item w-full">
          <img src="https://placeimg.com/800/200/arch" className="w-full" />
        </div>
        <div id="item4" className="carousel-item w-full">
        <div
            class="pointer-events-none flex flex-col gap-3 rounded-sm border-l-4 border-l-rose-900 bg-black/30 p-4 h-4/5 justify-center"
          >
            <p class="text-xl text-[#E5E5CB] md:text-2xl">
              The Last of Us: HBO's post apocalyptic series met with
              near-perfect score
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full py-2 gap-2">
        <a href="#item1" className="btn btn-xs">
          1
        </a>
        <a href="#item2" className="btn btn-xs">
          2
        </a>
        <a href="#item3" className="btn btn-xs">
          3
        </a>
        <a href="#item4" className="btn btn-xs">
          <p class="h-3 w-3 rounded-full bg-[#FF0032]"></p>
        </a>
      </div>
    </div>
  );
};

export default App;
