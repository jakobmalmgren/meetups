export async function signup(email, password) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/users/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );
    const data = await response.json();
    if (!response.ok) {
      return { success: false, error: data.error || "Unknown error" };
    }

    // console.log(data);

    return data;
  } catch (error) {
    return { success: false, error: error.message };
  }
}
