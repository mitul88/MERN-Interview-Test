export const saveDrawings = async (postData) => {
  const response = await fetch("http://localhost:4000/api/drawing", {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = new Error("An error occurred while posting like");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { data } = await response.json();

  return data;
};
