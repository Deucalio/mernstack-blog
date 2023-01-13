import { useEffect, useState } from "react";

function App() {
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
    const response = await fetch(`http://localhost:3000/api/${String(id)}`, 
    {method: "DELETE"});
    const obj = await response.json();
    setData(obj);
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
      <p>Hello</p>
      <div>{tags}</div>
    </div>
  );
}

export default App;
