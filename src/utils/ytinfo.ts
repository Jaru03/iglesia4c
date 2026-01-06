const lastPreachToYT = async () => {
  try {
    const response = await fetch("/api/latest-preach");
    const data = await response.json();
    console.log("YouTube data:", data);
    return data;
  } catch (err: any) {
    console.error("Error fetching latest preach:", err.message);
    return null;
  }
};

export { lastPreachToYT };
