export const fetchImageAsDataURL = async (url) => {
  const headerForImg = new Headers();
  headerForImg.append("pragma", "no-cache");
  headerForImg.append("cache-control", "no-cache");

  const config = {
    method: "GET",
    headers: headerForImg,
  };
  try {
    const response = await fetch(url, config);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Error fetching image:", error);
    throw error;
  }
};
