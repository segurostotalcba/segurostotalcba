import { getBaseURL } from "./util.mjs";
const baseURL = getBaseURL();

export async function addVehiculo(vehiculo) {
    try {
        const response = await fetch(`${baseURL}/vehiculos`, {
            method: "POST",
            body: JSON.stringify(vehiculo),  // Convert object to JSON string
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Vehiculo agregado:", data);
        return data; // Return the response if needed
    } catch (error) {
        console.error("Error al intentar agregar vehiculo:", error);
    }
}

export async function deleteDomicilio(idVehiculo) {
    if (!idVehiculo) {
        console.error("ID de vehiculo no válido");
        return;
    }

    try {
        const response = await fetch(`${baseURL}/vehiculos/${idDomicilio}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        console.log(`Vehiculo con ID ${idVehiculo} eliminado correctamente`);
    } catch (error) {
        console.error("Error eliminando el vehiculo:", error);
    }
}

export async function updateVehiculo(idVehiculo, vehiculo) {
    if (!idVehiculo) {
        console.error("ID de vechiculo no válido");
        return;
    }

    try {
        const response = await fetch(`${baseURL}/vehiculos/${idVehiculo}`, {
            method: "PUT",
            body: JSON.stringify(vehiculo), // Convert object to JSON string
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        console.log(`Vehiculo con ID ${idDomicilio} actualizado correctamente`);
    } catch (error) {
        console.error("Error actualizando el vehiculo:", error);
    }
}


export async function getVehiculosByClientId(idClient) {
    if (!idClient) {
        console.error("ID de cliente no válido");
        return;
    }

    try {
        const response = await fetch(`${baseURL}/cliente_vehiculos?idCliente=${idClient}`, {
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