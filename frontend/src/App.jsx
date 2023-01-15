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
    <div className="App">
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
    </div>
  );
};

export default App;
