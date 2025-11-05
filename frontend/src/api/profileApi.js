const getToken = () => localStorage.getItem("token");


export const getProfileData = async () => {
  const token = getToken();
  if (!token) {
    return { success: false, error: "Ingen token hittades. Logga in." };
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/profile`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Kunde inte hämta profildata");
    }
    return data;
  } catch (error) {
    console.error("Error fetching profile data:", error);
    return { success: false, error: error.message };
  }
};


export const markMeetupAsDone = async (meetupId) => {
  const token = getToken();
  if (!token) {
    return { success: false, error: "Ingen token hittades. Logga in." };
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/profile/complete/${meetupId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Kunde inte klarmarkera meetup");
    }
    return data;
  } catch (error) {
    console.error("Error marking meetup as done:", error);
    return { success: false, error: error.message };
  }
};