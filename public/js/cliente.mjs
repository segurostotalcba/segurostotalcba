
import { getBaseURL } from "./util.mjs";
const baseURL = getBaseURL();

export async function addCliente(cliente) {
    try {
        const response = await fetch(`${baseURL}/clientes`, {
            method: "POST",
            body: JSON.stringify(cliente),  // Convert object to JSON string
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Cliente agregado:", data);
        return data; // Return the response if needed
    } catch (error) {
        console.error("Error agregando el cliente:", error);
    }
}

export async function addDatoContacto(datoContacto) {
    try {
        const response = await fetch(`${baseURL}/datoscontacto`, {
            method: "POST",
            body: JSON.stringify(datoContacto),  // Convert object to JSON string
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Datos de contacto agregado:", data);
        return data; // Return the response if needed
    } catch (error) {
        console.error("Error al intentar agregar datos de contacto:", error);
    }
}

export async function updateCliente(idCliente, cliente) {
    if (!idCliente) {
        console.error("ID de cliente no válido");
        return;
    }

    try {
        const response = await fetch(`${baseURL}/clientes/${idCliente}`, {
            method: "PUT",
            body: JSON.stringify(cliente), // Convert object to JSON string
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        console.log(`Cliente con ID ${idCliente} actualizado correctamente`);
    } catch (error) {
        console.error("Error actualizando el cliente:", error);
    }
}

export async function updateDatosContacto(id, datosContacto) {
    if (!id) {
        console.error("ID no válido");
        return;
    }

    try {
        const response = await fetch(`${baseURL}/datosContacto/${id}`, {
            method: "PUT",
            body: JSON.stringify(datosContacto), // Convert object to JSON string
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        console.log(`Datos de contacto con ID ${id} actualizado correctamente`);
    } catch (error) {
        console.error("Error actualizando el dato de contacto:", error);
    }
}

export async function getClientById(idClient) {
    if (!idClient) {
        console.error("ID de cliente no válido");
        return;
    }

    try {
        const response = await fetch(`${baseURL}/cliente/${idClient}`, {
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

export async function getDatosContactoByIdCliente(idClient) {
    if (!idClient) {
        console.error("ID de cliente no válido");
        return;
    }

    try {
        const response = await fetch(`${baseURL}/cliente_contacto?idCliente=${idClient}`, {
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




