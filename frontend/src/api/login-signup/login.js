export async function login(email, password) {
  try {
    const response = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    console.log("DATA!!!", data);
    if (!response.ok) {
      return { success: false, error: data.error || "Unknown error" };
    }

    return data;
  } catch (error) {
    console.log("login error : ", error);
    return { success: false, error: error.message };
  }
}
