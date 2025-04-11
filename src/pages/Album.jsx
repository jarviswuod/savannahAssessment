import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

export default function Album() {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);

  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/albums/${id}`)
      .then((res) => res.json())
      .then(setAlbum);

    fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${id}`)
      .then((res) => res.json())
      .then(setPhotos);
  }, [id]);

  if (!album) return <p>Loading...</p>;

  return (
    <>
      <section className="">
        <div
          className="max-w-[1280px] brightness-75 mx-auto bg-cover bg-center h-80 py-8 p-12 flex flex-col items-start justify-between text-white"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODh8fHBob3RvfGVufDB8fDB8fHww)",
          }}
        >
          <h2 className="text-xl flex items-center gap-4">
            <a href="/">
              <FaHome />
            </a>
            <a href={`/user/${album.userId}`}>User</a>
          </h2>

          <p className="text-2xl sm:text-3xl md:text-4xl">{album.title}</p>
        </div>
      </section>

      <section className="px-4 sm:px-8">
        <div className="max-w-[1280px] py-8 mx-auto">
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-6 w-full">
            {photos.map((photo) => (
              <li key={photo.id}>
                <Link to={`/photo/${photo.id}`} className="block">
                  <img
                    src={photo.thumbnailUrl}
                    alt={photo.title}
                    className="rounded"
                  />
                  <p className="text-lg mt-1">{photo.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
