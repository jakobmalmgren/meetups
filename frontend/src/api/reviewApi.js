export async function reviewAPi(id, rating, reviewText) {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Ingen token hittades, logga in först");
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/reviews/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,

          // nån text för de ingen token`?
        },
        body: JSON.stringify({ review: reviewText, rating: rating }), // här skickas datan
      }
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.log("login error : ", error);
    return { success: false, error: error.message };
  }
}
