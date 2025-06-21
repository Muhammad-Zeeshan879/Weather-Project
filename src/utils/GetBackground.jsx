// getBackground.js
export default function getBackground(condition) {
  if (!condition || typeof condition !== "string") {
    return "from-blue-900 to-indigo-900"; // fallback
  }
  switch (condition.toLowerCase()) {
    case "clear":
      return "from-yellow-400 to-orange-500";
    case "clouds":
      return "from-gray-500 to-gray-700";
    case "rain":
    case "drizzle":
      return "from-blue-600 to-blue-800";
    case "thunderstorm":
      return "from-purple-700 to-gray-900";
    case "snow":
      return "from-gray-200 to-blue-300";
    case "mist":
    case "fog":
      return "from-gray-400 to-gray-600";
    default:
      return "from-blue-900 to-indigo-900"; // fallback
  }
}
