import { useState } from "react";
import { signupUser } from "../services/api";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const data = await signupUser(username, email, password);

    if (!data.success) {
      setError(data.message);
      return;
    }

    alert("Signup successful Please login");
    
    console.log("Navigating to login")
    navigate("/login");
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Sign Up
        </h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <input
          placeholder="Username"
          className="w-full p-2 border rounded mb-4"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          placeholder="Email"
          className="w-full p-2 border rounded mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-6"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-black text-white py-2 rounded">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
