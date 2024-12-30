import { API_BASE_URL } from "../config";

export const loginUser = async (credentials) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to log in");
        }
        return await response.json();
    } catch (error) {
        console.error("Error logging in:", error.message);
        throw error;
    }
};
const handleSave = async () => {
    try {
      const response = await axios.post(`${baseURL}/savequiz`, { questions });
      alert(response.data.message || "Quiz saved successfully!");
      navigate("/"); // Redirect to home or a relevant page
    } catch (error) {
      console.error("Error saving quiz:", error);
      alert("Failed to save quiz.");
    }
  };
    