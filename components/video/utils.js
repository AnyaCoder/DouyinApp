export const fetchData = async (url, method, mapper) => {
  try {
    const response = await fetch(url, {
      method: method,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const jsonData = await response.json();
    const dataArray = Array.isArray(jsonData) ? jsonData : [];
    return mapper(dataArray);
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
