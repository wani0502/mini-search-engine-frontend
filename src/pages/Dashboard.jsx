import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ActionCard from "../components/ActionCard";
import { getMyDocuments } from "../services/api";

const Dashboard = () => {
  const [totalDocs, setTotalDocs] = useState(0);
  const [publicDocs, setPublicDocs] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getMyDocuments();
        if (data.success) {
          setTotalDocs(data.documents.length);
          setPublicDocs(
            data.documents.filter((d) => d.isPublic).length
          );
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchStats();
  }, []);

  return (
    <>
      <Navbar />

      {/* PAGE CONTAINER */}
      <div className="min-h-screen bg-gray-50">
        <div className="p-10 max-w-6xl mx-auto space-y-12">

          {/* WELCOME */}
          <div>
            <h1 className="text-3xl font-bold">Welcome</h1>
            <p className="text-gray-500 mt-1">
              Manage your documents and search efficiently.
            </p>

            {totalDocs === 0 && (
              <p className="text-gray-500 mt-4">
                You haven’t uploaded any documents yet. Start by uploading one.
              </p>
            )}
          </div>

          {/* QUICK ACTIONS */}
          <div>
            <h2 className="text-sm font-semibold text-gray-600 mb-5 uppercase tracking-wide">
              Quick Actions
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ActionCard
                title="Upload Document"
                desc="Add a new document to your collection"
                to="/upload"
              />

              <ActionCard
                title="My Documents"
                desc="View and manage your documents"
                to="/documents"
              />

              <ActionCard
                title="Search"
                desc="Search through indexed documents"
                to="/search"
              />
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* OVERVIEW */}
          <div>
            <h2 className="text-sm font-semibold text-gray-600 mb-5 uppercase tracking-wide">
              Overview
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 border shadow-sm">
                <p className="text-gray-500 text-sm uppercase tracking-wide">
                  Total Documents
                </p>
                <p className="text-3xl font-bold mt-2">
                  {totalDocs}
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border shadow-sm">
                <p className="text-gray-500 text-sm uppercase tracking-wide">
                  Public Documents
                </p>
                <p className="text-3xl font-bold mt-2 text-green-600">
                  {publicDocs}
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border shadow-sm">
                <p className="text-gray-500 text-sm uppercase tracking-wide">
                  Private Documents
                </p>
                <p className="text-3xl font-bold mt-2">
                  {totalDocs - publicDocs}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Dashboard;
