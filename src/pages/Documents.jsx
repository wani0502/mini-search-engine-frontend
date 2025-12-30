import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
const BASE_URL = import.meta.env.VITE_API_URL;
import {
  getMyDocuments,
  toggleAccess,
  deleteDocument,
} from "../services/api";

const Documents = () => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const fetchDocs = async () => {
      const data = await getMyDocuments();
      if (data.success) {
        setDocs(data.documents);
      }
    };
    fetchDocs();
  }, []);

  const handleToggle = async (id) => {
    const data = await toggleAccess(id);

    if (data.success) {
      setDocs((prevDocs) =>
        prevDocs.map((doc) =>
          doc._id === id
            ? { ...doc, isPublic: data.isPublic }
            : doc
        )
      );
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "This action cannot be undone. Delete this document?"
    );
    if (!confirmDelete) return;

    const data = await deleteDocument(id);

    if (data.success) {
      setDocs((prevDocs) =>
        prevDocs.filter((doc) => doc._id !== id)
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50">
        <div className="p-10 max-w-5xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold">My Documents</h2>

          {docs.length === 0 && (
            <p className="text-gray-500">
              You haven’t uploaded any documents yet. Upload one to get started.
            </p>
          )}

          {docs.map((doc) => (
            <div
              key={doc._id}
              className="bg-white rounded-xl border p-6 shadow-sm
                         hover:shadow-md transition-all duration-300
                         flex flex-col md:flex-row md:justify-between md:items-center"
            >
              {/* LEFT */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-lg">
                    {doc.title}
                  </h3>

                  {/* STATUS BADGE */}
                  {doc.isPublic ? (
                    <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700">
                      Public
                    </span>
                  ) : (
                    <span className="text-xs px-2 py-1 rounded bg-gray-200 text-gray-700">
                      Private
                    </span>
                  )}
                </div>

                <p className="text-gray-600">
                  {doc.description || "No description"}
                </p>

                <p className="text-sm text-gray-400">
                  Type: {doc.fileType}
                </p>
              </div>

              {/* ACTIONS */}
              <div className="flex flex-wrap gap-2 mt-4 md:mt-0 items-center">

                {/* VIEW */}
                <a
                  href={`${BASE_URL}/uploads/${doc.fileUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
      px-4 py-1.5 rounded-md text-sm font-medium
      bg-blue-600 text-white
      hover:bg-blue-700 transition
    "
                >
                  View
                </a>

                {/* EDIT */}
                <Link
                  to={`/documents/${doc._id}/edit`}
                  className="
      px-4 py-1.5 rounded-md text-sm font-medium
      bg-yellow-500 text-white
      hover:bg-yellow-600 transition
    "
                >
                  Edit
                </Link>

                {/* TOGGLE */}
                <button
                  onClick={() => handleToggle(doc._id)}
                  className="
      px-4 py-1.5 rounded-md text-sm font-medium
      bg-gray-700 text-white
      hover:bg-gray-800 transition
    "
                >
                  {doc.isPublic ? "Make Private" : "Make Public"}
                </button>

                {/* DELETE */}
                <button
                  onClick={() => handleDelete(doc._id)}
                  className="
      px-4 py-1.5 rounded-md text-sm font-medium
      bg-red-600 text-white
      hover:bg-red-700 transition
    "
                >
                  Delete
                </button>

              </div>

            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Documents;
