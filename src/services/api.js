const BASE_URL = import.meta.env.VITE_API_URL;


export const loginUser = async (email, password) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  return data;
};
export const signupUser = async (username, email, password) => {
  const response = await fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });

  return response.json();
};
export const uploadDocument = async (title, description,file) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("title", title);
  formData.append("description",description);
  formData.append("file", file); 

  const response = await fetch(`${BASE_URL}/document/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  return response.json();
};
export const toggleAccess = async (docId) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${BASE_URL}/document/${docId}/access`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.json();
};
export const getMyDocuments = async () => {
  const token = localStorage.getItem("token");


  const res = await fetch(`${BASE_URL}/document/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};
export const deleteDocument = async (id) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/document/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};
export const getPublicDocuments = async () => {
  const res = await fetch(`${BASE_URL}/document/public`);
  return res.json();
};
export const searchDocuments = async (query) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify({ query }),
  });

  return res.json();
};
export const getUserProfile = async () => {
  const token = localStorage.getItem("token");
if(!token){
  console.log("No auth token");
}
  const res = await fetch(`${BASE_URL}/user/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch profile");
  }

  const data = await res.json();
  return data;
};

export const updateProfile = async (username, email) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ username, email }),
  });

  return res.json();
};
export const editDocument = async (id, { title, description, isPublic }) => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${BASE_URL}/document/edit/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description, isPublic }),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to edit document");
  }

  return res.json(); 
};
