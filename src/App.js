import "./styles.css";
import { useSelector, useDispatch } from "react-redux";
import { decrease, increase } from "./redux/counterSlice";
import { setUsers } from "./redux/usersSlice";
import { useEffect } from "react";

export default function App() {
  const count = useSelector((state) => state.counter.count);
  const { users } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    const getPosts = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();
      dispatch(setUsers(data));
    };
    getPosts();
  }, [dispatch]);
  return (
    <div className="App">
      <h1>Count: {count} </h1>
      <button onClick={() => dispatch(increase())}>Up</button>
      <button onClick={() => dispatch(decrease())}>Down</button>
      <h2>User</h2>
      {users && users.map((user, index) => <div key={index}>{user.name}</div>)}
    </div>
  );
}
