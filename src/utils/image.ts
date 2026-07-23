export const getImageUrl = (path?: string): string => {
  if (!path || typeof path !== "string") return "";

  const serverUrl =
    process.env.NEXT_PUBLIC_SERVER_URL ||
    process.env.SERVER_URL ||
    "http://localhost:5002";

  // Clean trailing slash from serverUrl
  const baseUrl = serverUrl.replace(/\/+$/, "");

  // If path is absolute HTTP/HTTPS URL
  if (path.startsWith("http://") || path.startsWith("https://")) {
    // If it contains Android emulator IP, replace it with browser accessible serverUrl
    if (path.includes("10.0.2.2:5002") || path.includes("10.0.2.2:5003")) {
      return path.replace(/http:\/\/10\.0\.2\.2:\d+/, baseUrl);
    }
    return path;
  }

  // Ensure path starts with a single slash
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
};
