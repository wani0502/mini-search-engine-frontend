import { useState } from "react";
import Navbar from "../components/Navbar";
import { searchDocuments } from "../services/api";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setMessage("");
    setResults([]);

    if (!query.trim()) {
      setMessage("Enter a search term");
      return;
    }

    const data = await searchDocuments(query);

    if (!data.success || data.results.length === 0) {
      setMessage("No results found");
      return;
    }

    setResults(data.results);
  };

  return (
    <>
      <Navbar />

      <div className="p-10 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Search Documents</h2>

        <form onSubmit={handleSearch} className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Search keywords..."
            className="flex-1 p-2 border rounded"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="bg-black text-white px-6 rounded">
            Search
          </button>
        </form>

        {message && <p className="text-gray-500 mb-4">{message}</p>}

        {results.map((doc) => (
          <div
            key={doc._id}
            className="border p-4 rounded mb-4 flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{doc.title}</h3>
              <p className="text-gray-600">
                {doc.description || "No description"}
              </p>

              <p className="text-sm text-gray-500">
                Uploaded by:{" "}
                <span className="font-medium">
                  {doc.uploadedBy?.username || "Unknown"}
                </span>
              </p>
            </div>

            {/* VIEW */}
            <a
              href={doc.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600 text-white rounded
                         hover:bg-blue-700 transition"
            >
              View
            </a>
          </div>
        ))}
      </div>
    </>
  );
};

export default Search;
