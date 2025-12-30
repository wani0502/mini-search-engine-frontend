import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { editDocument, getMyDocuments } from "../services/api";

const EditDocument = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadDoc = async () => {
      const data = await getMyDocuments();
      const doc = data.documents.find((d) => d._id === id);

      if (!doc) {
        navigate("/documents");
        return;
      }

      setTitle(doc.title || "");
      setDescription(doc.description || "");
      setIsPublic(doc.isPublic);
    };

    loadDoc();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await editDocument(id, {
        title,
        description,
        isPublic,
      });

      setMessage("Document updated");
      setTimeout(() => navigate("/documents"), 700);
    } catch (err) {
      console.error(err);
      setMessage("Update failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="p-10 max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Edit Document</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Document title"
          />

          <textarea
            className="w-full p-2 border rounded"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Document description"
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
            />
            Public document
          </label>

          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded"
            >
              Save
            </button>

            <button
              type="button"
              onClick={() => navigate("/documents")}
              className="border px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>

          {message && (
            <p className="text-green-600">{message}</p>
          )}
        </form>
      </div>
    </>
  );
};

export default EditDocument;
