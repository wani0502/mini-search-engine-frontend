import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getPublicDocuments } from "../services/api";
const BASE_URL = import.meta.env.VITE_API_URL;
const PublicDocuments = () => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const fetchDocs = async () => {
      const data = await getPublicDocuments();
      if (data.success) {
        setDocs(data.documents);
      }
    };
    fetchDocs();
  }, []);

  return (
    <>
      <Navbar />

      <div className="p-10 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Public Documents</h2>

        {docs.length === 0 && (
          <p className="text-gray-500">No public documents available.</p>
        )}

        {docs.map((doc) => (
          <div
            key={doc._id}
            className="border p-4 rounded mb-4 space-y-3"
          >
            {/* IMAGE PREVIEW (only if image) */}
            {(doc.fileType === "png" || doc.fileType === "jpg") && (
              <img
                src={`${BASE_URL}/uploads/${doc.fileUrl}`}
                alt={doc.title}
                className="max-h-64 rounded border"
              />
            )}

            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg">{doc.title}</h3>
                <p className="text-gray-600">{doc.description}</p>

                <p className="text-sm text-gray-500">
                  Type: {doc.fileType}
                </p>

                <p className="text-sm text-gray-700">
                  Uploaded by:{" "}
                  <span className="font-medium">
                    {doc.uploadedBy?.username || "Unknown"}
                  </span>
                </p>
              </div>

              {/* VIEW BUTTON */}
              <a
                href={`${BASE_URL}/uploads/${doc.fileUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                View
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PublicDocuments;
