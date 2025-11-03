export async function signup(email, password) {
  try {
    const response = await fetch("", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error("network reponse was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("login error : ", error);
    return { success: false, error: error.message };
  }
}
