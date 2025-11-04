const getToken = () => localStorage.getItem("token");

// Grund-URL till din backend
const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/meetups`;

export const getMeetups = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  
  try {
    // Anropar /search-endpointen (som hanterar all logik)
    const response = await fetch(`${BASE_URL}/search?${query}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch meetups");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching meetups:", error);
    throw error;
  }
};

export const getMeetupDetails = async (meetupId) => {
  const token = getToken();
  
  const headers = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${BASE_URL}/${meetupId}`, {
      headers: headers,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch meetup details");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching meetup details:", error);
    throw error;
  }
};