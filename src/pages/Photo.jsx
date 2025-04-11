import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Photo() {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);

  const [title, setTitle] = useState("");
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/photos/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPhoto(data);
        setTitle(data.title);
      });
  }, [id]);

  const handleSave = () => {
    fetch(`https://jsonplaceholder.typicode.com/photos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    })
      .then((res) => res.json())
      .then((data) => {
        setPhoto(data);
        setEditing(false);
      });
  };

  if (!photo) return <p>Loading...</p>;

  return (
    <>
      <section className="px-8">
        <div className="max-w-[1280px] py-8 mx-auto grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-4 items-center">
          <img src={photo.thumbnailUrl} alt={photo.title} className="w-full" />

          {editing ? (
            <>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border p-1 md:p-2 rounded w-full mb-2 sm:mb-4"
              />
              <div class="space-x-4 mt-2">
                <a
                  href={`/photo/${id}`}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Cancel
                </a>

                <button
                  onClick={handleSave}
                  className="bg-blue-600 text-white px-4 py-1 rounded"
                >
                  Save
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">
                modi voluptas fugiat eos
              </h2>

              <button
                onClick={() => setEditing(true)}
                className="transition duration-300 mt-2 border-1 border-blue-600 hover:bg-blue-600 text-black hover:text-white px-4 py-1 rounded"
              >
                Edit Title
              </button>
            </>
          )}
        </div>
      </section>
    </>
  );
}
