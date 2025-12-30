import { useState } from "react";
import Navbar from "../components/Navbar";
import { uploadDocument } from "../services/api";

const Upload = () => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        if (!title || !file) {
            setMessage("Please provide title and file");
            return;
        }

        const data = await uploadDocument(title,description, file);

        if (!data.success) {
            setMessage(data.message || "Upload failed");
            return;
        }

        setMessage("Document uploaded successfully ");
        setTitle("");
        setDescription("");
        setFile(null);
    };

    return (
        <>
            <Navbar />

            <div className="p-10 max-w-xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Upload Document</h2>

                {message && <p className="mb-4">{message}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Document title"
                        className="w-full p-2 border rounded"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Document description"
                        className="w-full p-2 border rounded"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />


                    <input
                        type="file"
                        className="w-full"
                        onChange={(e) => setFile(e.target.files[0])}
                    />

                    <button className="bg-black text-white px-4 py-2 rounded">
                        Upload
                    </button>
                </form>
            </div>
        </>
    );
};

export default Upload;
