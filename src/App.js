import axios from "axios";
import { useEffect, useState } from "react";

export default function App() {
  return (
    <>
      <MyComponent />
    </>
  );
}

function MyComponent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [mobno, setMobno] = useState("");

  const [list, setList] = useState([]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleMobNoChange = (e) => {
    setMobno(e.target.value);
  };

  const addUser = async () => {
    if (username === "" || password === "" || email === "" || mobno === "") {
      alert("Vlidation fails");
      return;
    }

    const url = "http://localhost:5050/adddetails";
    const data = {
      username: username,
      password: password,
      email: email,
      mobno: mobno,
    };

    // AJAX using AXIOS
    await axios.post(url, data);

    const newList = [data, ...list];
    setList(newList);

    setUsername("");
    setPassword("");
    setEmail("");
    setMobno("");
  };

  const getUser = async () => {
    const url = "http://localhost:5050/userdetails";
    const result = await axios.get(url);

    const list = result.data;
    const newList = [...list];
    setList(newList);
  };
  // LIke Constructor
  useEffect(() => getUser(), []);

  return (
    <div>
      <h2 className="bg-dark text-light p-3">User Registration</h2>
      <div>
        <input
          className="form-control form-control-lg mb-1"
          type="text"
          name=""
          id=""
          value={username}
          onChange={handleUsernameChange}
          placeholder="Enter Username"
        />
      </div>
      <div>
        <input
          className="form-control form-control-lg mb-1"
          type="text"
          name=""
          id=""
          value={password}
          onChange={handlePasswordChange}
          placeholder="Enter Password"
        />
      </div>
      <div>
        <input
          className="form-control form-control-lg mb-1"
          type="text"
          name=""
          id=""
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter email"
        />
      </div>
      <div>
        <input
          className="form-control form-control-lg mb-1"
          type="text"
          name=""
          id=""
          value={mobno}
          onChange={handleMobNoChange}
          placeholder="Enter mobno "
        />
      </div>

      <div>
        <input
          className="btn btn-secondary w-100"
          type="button"
          name=""
          value="Register"
          onClick={addUser}
        />
      </div>

      <h3 className="bg-dark text-light mt-1 p-3">User List</h3>

      {list.map((item, index) => (
        <div key={index} className="alert alert-secondary fs-4">
          {item.username} {item.password} {item.email} {item.mobno}
        </div>
      ))}
    </div>
  );
}
