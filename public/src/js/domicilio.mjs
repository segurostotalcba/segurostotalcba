import { getBaseURL } from "./util.mjs";
const baseURL = getBaseURL();

export async function addDomicilio(domicilio) {
    try {
        const response = await fetch(`${baseURL}/domicilio`, {
            method: "POST",
            body: JSON.stringify(domicilio),  // Convert object to JSON string
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Domicilio agregado:", data);
        return data; // Return the response if needed
    } catch (error) {
        console.error("Error agregando el domicilio:", error);
    }
}

export async function deleteDomicilio(idDomicilio) {
    if (!idDomicilio) {
        console.error("ID de domicilio no válido");
        return;
    }

    try {
        const response = await fetch(`${baseURL}/domicilio/${idDomicilio}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        console.log(`Domicilio con ID ${idDomicilio} eliminado correctamente`);
    } catch (error) {
        console.error("Error eliminando el domicilio:", error);
    }
}

export async function updateDomicilio(idDomicilio, domicilio) {
    if (!idDomicilio) {
        console.error("ID de domicilio no válido");
        return;
    }

    try {
        const response = await fetch(`${baseURL}/domicilio/${idDomicilio}`, {
            method: "PUT",
            body: JSON.stringify(domicilio), // Convert object to JSON string
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        console.log(`Domicilio con ID ${idDomicilio} actualizado correctamente`);
    } catch (error) {
        console.error("Error actualizando el domicilio:", error);
    }
}


export async function getDomiciliosByClientId(idClient) {
    if (!idClient) {
        console.error("ID de cliente no válido");
        return;
    }

    try {
        const response = await fetch(`${baseURL}/cliente_domicilios?idCliente=${idClient}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        var data;
        if (!response.ok) {
            data = []
        } else{
            data = await response.json();
        }

       
        return data;
    } catch (error) {
        console.error("Error no se encontraron resultados para el id de cliente:", error);
    }
}




