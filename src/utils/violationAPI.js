/**
 * Violation Detection API Client
 * ===============================
 * Utility for communicating with the TrafficHive FastAPI backend.
 * Provides methods for analyzing images/videos and fetching stored violations.
 */

// Backend API base URL — change this for production deployment
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

/**
 * Analyze an image or video file for traffic violations.
 *
 * Sends the file to the backend's unified /api/analyze endpoint
 * which runs YOLO11 + ByteTrack + helmet/seatbelt/plate + OCR.
 *
 * @param {File} file - Image (.jpg, .png) or video (.mp4, .avi, .mov) file
 * @returns {Promise<Object>} Analysis results with violations
 */
export async function analyzeForViolations(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE}/api/analyze`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    let errorDetail;
    try {
      errorDetail = await response.json();
    } catch {
      errorDetail = { message: response.statusText };
    }
    throw new Error(
      errorDetail.detail?.message || errorDetail.detail || errorDetail.message || "Analysis failed"
    );
  }

  return response.json();
}

/**
 * Fetch stored violations from the database.
 *
 * @param {number} [limit=50] - Maximum number of records to return
 * @param {number} [offset=0] - Number of records to skip
 * @returns {Promise<Object>} Paginated violations list
 */
export async function getViolations(limit = 50, offset = 0) {
  const response = await fetch(
    `${API_BASE}/api/violations?limit=${limit}&offset=${offset}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch violations");
  }

  return response.json();
}

/**
 * Fetch violations for a specific tracked object.
 *
 * @param {number} trackId - The object tracking ID
 * @returns {Promise<Object>} Violations for the tracked object
 */
export async function getViolationsByTrackId(trackId) {
  const response = await fetch(`${API_BASE}/api/violations/${trackId}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch violations for track ${trackId}`);
  }

  return response.json();
}

/**
 * Check if the backend API is healthy and ready.
 *
 * @returns {Promise<Object>} Health status
 */
export async function checkApiHealth() {
  try {
    const response = await fetch(`${API_BASE}/api/health`);
    if (!response.ok) {
      return { healthy: false, error: response.statusText };
    }
    const data = await response.json();
    return { healthy: true, ...data };
  } catch (error) {
    return { healthy: false, error: error.message };
  }
}
