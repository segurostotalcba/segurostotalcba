import { getBaseURL } from "./util.mjs";
const baseURL = getBaseURL();

export async function addPoliza(poliza) {
    try {
        const response = await fetch(`${baseURL}/poliza`, {
            method: "POST",
            body: JSON.stringify(poliza),  // Convert object to JSON string
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Poliza agregado:", data);
        return data; // Return the response if needed
    } catch (error) {
        console.error("Error agregando de poliza:", error);
    }
}

export async function updatePoliza(idPoliza, poliza) {
    if (!idPoliza) {
        console.error("ID de poliza no válido");
        return;
    }

    try {
        const response = await fetch(`${baseURL}/poliza/${idPoliza}`, {
            method: "PUT",
            body: JSON.stringify(poliza), // Convert object to JSON string
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        console.log(`Poliza con ID ${idPoliza} actualizado correctamente`);
    } catch (error) {
        console.error("Error actualizando el poliza:", error);
    }
}

export async function getPolizasByClientId(idClient) {
    if (!idClient) {
        console.error("ID de cliente no válido");
        return;
    }

    try {
        const response = await fetch(`${baseURL}/cliente_polizas?idCliente=${idClient}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error no se encontraron resultados para el id de cliente:", error);
    }
}

export async function getPolizasByPoliza(poliza) {
    if (!poliza) {
        console.error("Número de poliza no válido");
        return;
    }

    try {
        const response = await fetch(`${baseURL}/poliza?poliza=${poliza}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error no se encontraron resultados para el número de poliza ingresao:", error);
    }
}