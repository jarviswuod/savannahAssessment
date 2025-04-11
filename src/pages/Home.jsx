import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then(setUsers);

    fetch("https://jsonplaceholder.typicode.com/albums")
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then(setAlbums);
  }, []);

  const albumCount = (userId) =>
    albums.filter((a) => a.userId === userId).length;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Users</h2>
      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user.id} className="border p-2 rounded">
            <Link
              to={`/user/${user.id}`}
              className="text-blue-600 hover:underline"
            >
              {user.name} - {albumCount(user.id)} albums
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
