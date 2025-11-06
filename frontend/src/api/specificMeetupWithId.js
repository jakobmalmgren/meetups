export async function specificMeetupWithId(id) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/meetups/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error || "Unknown error" };
    }

    return data;
  } catch (error) {
    console.log("login error : ", error);
    return { success: false, error: error.message };
  }
}
