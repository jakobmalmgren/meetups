
export async function unregisterMeetup(meetupId) {
  const token = localStorage.getItem("token");
  if (!token) {
    return { success: false, error: "Ingen token hittades, logga in först" };
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/meetups/${meetupId}/unregister`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.message || "Kunde inte avboka" };
    }

    return data;
  } catch (error) {
    console.log("Unregister error : ", error);
    return { success: false, error: error.message };
  }
}