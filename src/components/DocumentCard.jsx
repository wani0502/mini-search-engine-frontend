import { toggleAccess } from "../services/api";

const DocumentCard = ({ doc, onToggle }) => {
  const handleToggle = async () => {
    const data = await toggleAccess(doc._id);

    if (data.success) {
      onToggle(); 
    }
  };

  return (
    <div className="border p-4 rounded mb-4">
      <h3 className="text-xl font-semibold">{doc.title}</h3>
      <p className="text-gray-600">{doc.description}</p>

      <p className="mt-2">
        Status:{" "}
        <span className="font-bold">
          {doc.isPublic ? "Public" : "Private"}
        </span>
      </p>

      <button
        onClick={handleToggle}
        className="mt-3 px-3 py-1 bg-black text-white rounded"
      >
        {doc.isPublic ? "Make Private" : "Make Public"}
      </button>
    </div>
  );
};

export default DocumentCard;
