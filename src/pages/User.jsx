import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function User() {
  const { id } = useParams();
  const [user, setUser] = useState({});

  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => res.json())
      .then(setUser);

    fetch(`https://jsonplaceholder.typicode.com/albums?userId=${id}`)
      .then((res) => res.json())
      .then(setAlbums);
  }, [id]);

  if (!user) return <p>Loading...</p>;

  return (
    <>
      <section class="relative bg-[url(https://images.unsplash.com/photo-1617042375876-a13e36732a04?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]">
        <div class="min-h-64"></div>
      </section>

      <section class="transform -translate-y-24">
        <div class="grid grid-cols-1 lg:grid-cols-[1fr_4fr] gap-4 max-w-[1280px] mx-auto p-4">
          <div class="max-w-36 md:max-w-48 overflow-hidden rounded-full shadow-lg">
            <img
              class="w-full border-4 border-white rounded-full"
              src="https://www.jarviswuod.com/static/profile.jpg"
              alt=""
            />
          </div>
          <div class="grid grid-rows-1 lg:grid-rows-2">
            <div></div>

            <div>
              <h6 class="text-2xl md:text-3xl font-semibold">{user.name}</h6>
              <p class="text-lg text-[#444]">@{user.username}</p>
            </div>
          </div>

          <div>
            <p>{user.email}</p>
            {/* <p>{user?.address.city}</p> */}
            <p>{user.phone}</p>
            <p>{user.website}</p>
          </div>
          <div>
            <h3 className="text-xl md:text-2xl mt-4 mb-4 lg:mb-8 text-center font-semibold">
              Albums
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 space-y-2">
              {albums.map((album) => (
                <li
                  key={album.id}
                  className="h-72 border p-2 group rounded hover:bg-[#dedede] duration-300 transition flex items-center justify-center"
                >
                  <Link
                    to={`/album/${album.id}`}
                    className="text-blue-600 group-hover:underline"
                  >
                    {album.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
