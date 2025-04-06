const BASE_URL = "https://segurosbe.onrender.com/api"; // or localhost for dev

export const parseCustomDate = (fechaString) => {
    if (!fechaString || fechaString.trim() === "") return null; // Handle empty values

    let parts = fechaString.split("/").map(Number);
    if (parts.length !== 3) return null; // Ensure correct format

    let [day, month, year] = parts;
    let fechaValida = new Date(year, month - 1, day); // Month is zero-based

    // Check if date is valid
    if (isNaN(fechaValida.getTime())) return null;

    return fechaValida.toISOString(); // Convert to ISO format
};

export function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-AR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
}

export function getBaseURL(){
    return BASE_URL;
}


export async function apiRequest(endpoint, method = "GET", body = null) {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            body: body ? JSON.stringify(body) : null
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP ${response.status} - ${response.statusText} - ${errorText}`);
        }

        if (response.status !== 204) { // 204 No Content
            return await response.json();
        }
        return null;
    } catch (error) {
        console.error(`Error en ${method} ${endpoint}:`, error.message);
        throw error;
    }
}