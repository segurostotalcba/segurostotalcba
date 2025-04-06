import { parseCustomDate, formatDate } from './util.mjs';
import { getBaseURL } from './util.mjs';

const baseURL = getBaseURL();

export function createTablePoliza(polizas, edit) {
    if (polizas.length === 0) {
        return "<p>No hay pólizas disponibles.</p>";
    }

    let divRows = polizas.map(poliza => {
        let editButton = "";

        if (edit) {
            editButton = `
                <button type="button" class="btn btn-outline-success edit-poliza" 
                    data-poliza='${JSON.stringify(poliza)}'> 
                    <i class="bi bi-pencil-square"></i> 
                </button>`;
        }

        return `
        <div class="row border-bottom py-2">
            <div class="col-md-2">${poliza.poliza}</div>
            <div class="col-md-2">${poliza.fechaInicioVigencia ? formatDate(poliza.fechaInicioVigencia) : "S/D"}</div>
            <div class="col-md-2">${poliza.fechaFinVigencia ? formatDate(poliza.fechaFinVigencia) : "S/D"}</div>
            <div class="col-md-2">${poliza.compania}</div>
            <div class="col-md-1">${poliza.ramo?.trim() ? poliza.ramo.toUpperCase() : "S/D"}</div>
            <div class="col-md-2">${poliza.estadoPoliza?.trim() ? poliza.estadoPoliza.toUpperCase() : "S/D"}</div>
            <div class="col-md-1 d-flex">
                ${editButton}
                <button type="button" class="btn btn-outline-danger ms-1" 
                    onclick="confirmDeletePoliza('${poliza._id}')"> 
                    <i class="bi bi-trash"></i> 
                </button>
            </div>
        </div>`;
    }).join("");

    return `
    <div class="container-fluid mt-4">
     <p class="text-info">Listado de pólizas</p>
        <div class="row fw-bold border-bottom pb-2">
            <div class="col-md-2">Póliza</div>
            <div class="col-md-2">Inicio Vig.</div>
            <div class="col-md-2">Fin Vig.</div>
            <div class="col-md-2">Compañía</div>
            <div class="col-md-1">Ramo</div>
            <div class="col-md-2">Estado póliza</div>
            <div class="col-md-1">Acciones</div>
        </div>
        ${divRows}
    </div>`;
}

export async function createTableVehiculos(vehiculos, edit) {
    if (vehiculos.length === 0) {
        return "<p>No hay vehiculos disponibles.</p>";
    }


    let tableRows = vehiculos.map(vehiculo => {
        let editButton = "";

        if (edit) {
            editButton = `
                <button type="button" class="btn btn-outline-success edit-vehiculo" 
                    data-vehiculo='${JSON.stringify(vehiculo)}'> 
                    <i class="bi bi-pencil-square"></i> 
                </button>`;
        }

        return `
        <div class="row border-bottom py-2">
           <div class="col-md-2">${vehiculo.nombre && vehiculo.nombre.trim() !== "" ? vehiculo.nombre : "S/D"}</div>
           <div class="col-md-2">${vehiculo.tipoVehiculo}</div>
          <div class="col-md-2">${vehiculo.patente}</div>
           <div class="col-md-2">${vehiculo.idPoliza ? vehiculo.idPoliza.poliza : "No tiene póliza"}</div>
            <div class="col-md-3"></div>
           <div class="col-md-1 d-flex">
            ${editButton}
              <button type="button" class="btn btn-outline-danger ms-1" 
                    onclick="confirmDeleteVehiculo('${vehiculo._id}')"> 
                    <i class="bi bi-trash"></i> 
                </button></div>
        </div>
    `;
    }).join("");

    return `
       <div class="container-fluid mt-4">
         <p class="text-info">Listado de vehiculos</p>
        <div class="row fw-bold border-bottom pb-2">
                    <div class="col-md-2">Descripción</div>
                   <div class="col-md-2">Tipo Vehiculo</div>
                    <div class="col-md-2">Patente</div>
                   <div class="col-md-2">Poliza Vehiculo</div>
                    <div class="col-md-3"></div>
                   <div class="col-md-1 d-flex">Acciones</div>
                     
              
            </div>
        ${tableRows}
        </div>
    `;
}




export function createTableDatosContacto(datosContacto, edit) {
    if (datosContacto.length === 0) {
        return "<p>No hay datos de contacto disponibles.</p>";
    }

    let divRows = datosContacto.map(contacto => {
        let editButton = "";

        if (edit) {
            editButton = `
                <button type="button" class="btn btn-outline-success edit-datosContacto" 
                    data-datosContacto='${JSON.stringify(contacto)}'> 
                    <i class="bi bi-pencil-square"></i> 
                </button>`;
        }

        return `
        <div class="row border-bottom py-2">
            <div class="col-md-2">${contacto.telefonoMovil?.trim() || "S/D"}</div>
            <div class="col-md-2">${contacto.telefonoFijo?.trim() || "S/D"}</div>
            <div class="col-md-2">${contacto.email?.trim() || "S/D"}</div>
            <div class="col-md-2">${contacto.perteneceA?.trim() || "S/D"}</div>
            <div class="col-md-3"></div>
            <div class="col-md-1 d-flex">
                ${editButton}
                <button type="button" class="btn btn-outline-danger ms-1" 
                    onclick="confirmDeleteContacto('${contacto._id}')"> 
                    <i class="bi bi-trash"></i> 
                </button>
            </div>
        </div>
    `;
    }).join("");

    return `
    <div class="container-fluid mt-4">
      <p class="text-info">Datos de contacto asociados al cliente</p>
        <div class="row fw-bold border-bottom pb-2">
            <div class="col-md-2">Tel Móvil</div>
            <div class="col-md-2">Tel Fijo</div>
            <div class="col-md-2">Email</div>
            <div class="col-md-2">Pertenece A</div>
            <div class="col-md-3"></div>
            <div class="col-md-1">Acciones</div>
        </div>
        ${divRows}
    </div>
    `;
}

export function createTableDomicilios(domicilios) {
    if (domicilios.length === 0) {
        return "<p>No hay domicilios disponibles.</p>";
    }

    let tableRows = domicilios.map(domicilio => `
      <div class="row border-bottom py-2">
            <div class="col-md-2">${domicilio.tipoDomicilio && domicilio.tipoDomicilio.trim() !== "" ? domicilio.tipoDomicilio : "S/D"}</div>
             <div class="col-md-2">${domicilio.domicilio && domicilio.domicilio.trim() !== "" ? domicilio.domicilio : "S/D"}</div>
             <div class="col-md-2">${domicilio.localidad && domicilio.localidad.trim() !== "" ? domicilio.localidad : "S/D"}</div>
            <div class="col-md-2">${domicilio.cp && domicilio.cp.trim() !== "" ? domicilio.cp : "S/D"}</div>
             <div class="col-md-3"></div>   
            <div class="col-md-1 d-flex">
              <button type="button" class="btn btn-outline-success edit-domicilio" 
                data-domicilio='${JSON.stringify(domicilio)}'> 
                <i class="bi bi-pencil-square"></i> 
              </button>
                 <button type="button" class="btn btn-outline-danger ms-1" 
                    onclick="confirmDeleteDomicilio('${domicilio._id}')"> 
                    <i class="bi bi-trash"></i> 
                </button></div>
        </div>
    `).join("");

    return `
         <div class="container-fluid mt-4">
      <p class="text-info">Datos de contacto asociados al cliente</p>
        <div class="row fw-bold border-bottom pb-2">
                     <div class="col-md-2">Tipo Domicilio</div>
                     <div class="col-md-2">Domicilio</div>
                     <div class="col-md-2">Localidad</div>
                     <div class="col-md-2">Cod. Postal</div>
                     <div class="col-md-3"></div>
                     <div class="col-md-1">Acciones</div>
            </div>
            ${tableRows}
        </div>
    `;
}


async function confirmDeleteDomicilio(id) {
    if (confirm("¿Estás seguro de que deseas eliminar este domicilio?")) {
        if (!id) return;

        try {
            const response = await fetch(`${baseURL}/domicilio/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            alert("Domicilio eliminado con éxito.");
            location.reload(); // Refresh the UI
        } catch (error) {
            console.error("Error eliminando el domicilio:", error);
            alert("Error eliminando al intentar eliminar domicilio. Intente de nuevo.");
        }
        console.log("Domicilio eliminado:", id);
    }
}

async function confirmDeletePoliza(id) {
    if (confirm("¿Estás seguro de que deseas eliminar datos de poliza?")) {
        if (!id) return;

        try {
            const response = await fetch(`${baseURL}/polizas/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            alert("Poliza eliminada con éxito.");
            location.reload(); // Refresh the UI
        } catch (error) {
            console.error("Error eliminando la poliza:", error);
            alert("Error eliminando al intentar eliminar poliza. Intente de nuevo.");
        }
        console.log("Poliza eliminada:", id);
    }
}

async function confirmDeleteVehiculo(id) {
    if (confirm("¿Estás seguro de que deseas eliminar este vehiculo?")) {
        if (!id) return;

        try {
            const response = await fetch(`${baseURL}/vehiculos/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            alert("Vehículo eliminado con éxito.");
            location.reload(); // Refresh the UI
        } catch (error) {
            console.error("Error eliminando el vehículo:", error);
            alert("Error eliminando el vehículo. Intente de nuevo.");
        }
        console.log("Domicilio eliminado:", id);
    }
}

async function confirmDeleteContacto(id) {
    if (confirm("¿Estás seguro de que deseas eliminar este dato de contacto?")) {
        if (!id) return;

        try {
            const response = await fetch(`${baseURL}/datosContacto/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            alert("Dato de contacto  eliminado con éxito.");
            location.reload(); // Refresh the UI
        } catch (error) {
            console.error("Error eliminando el Dato de contacto:", error);
            alert("Error eliminando el Dato de contacto. Intente de nuevo.");
        }
        console.log("Dato de contacto eliminado correctamente eliminado:", id);
    }
}

window.confirmDeleteDomicilio = confirmDeleteDomicilio;
window.confirmDeleteContacto = confirmDeleteContacto;
window.confirmDeleteVehiculo = confirmDeleteVehiculo;
window.confirmDeletePoliza = confirmDeletePoliza;