export async function registerMeetup(id) {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Ingen token hittades, logga in först");
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/meetups/${id}/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          // nån text för de ingen token`?
        },
      }
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.log("login error : ", error);
    return { success: false, error: error.message };
  }
}
