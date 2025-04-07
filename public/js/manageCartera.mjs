import { addCliente, updateCliente, getClientById, getDatosContactoByIdCliente, updateDatosContacto, addDatoContacto } from './cliente.mjs';
import { parseCustomDate, formatDate } from './util.mjs';
import { createTableVehiculos, createTableDomicilios, createTablePoliza, createTableDatosContacto } from './tables.mjs';
import { addPoliza, updatePoliza, getPolizasByClientId, getPolizasByPoliza } from './poliza.mjs';
import { addVehiculo, updateVehiculo, getVehiculosByClientId } from './vehiculo.mjs';
import { updateDomicilio, addDomicilio, getDomiciliosByClientId } from './domicilio.mjs';

var idCliente = null;
var idDomicilio = null;
var idVehiculo = null;
var idPoliza = null;
var idDatosContacto = null;
/*Datos de cliente*/
const _nombre = document.getElementById("txtNombre");
const _dni = document.getElementById("txtDNI");
const _fechaNacimiento = document.getElementById("txtFechaNacimiento");
const btnGuardar = document.getElementById("btnGuardar");
const btnEditar = document.getElementById('btnEditar');
/**Datos de contacto */
const txtTelefonoMovil = document.getElementById("txtTelefonoMovil");
const txtTelefonoFijo = document.getElementById("txtTelefonoFijo");
const txtEmail = document.getElementById("txtEmail");
const dpdPerteneceA = document.getElementById("dpPerteneceA");
const btnGuardarDatosContacto = document.getElementById("btnGuardarDatosContacto");
/*Poliza*/
const txtPoliza = document.getElementById('txtPoliza');
const txtFechaInicioVigencia = document.getElementById('txtFechaInicioVigencia');
const txtFechaFinVigencia = document.getElementById('txtFechaFinVigencia');
const dpCompania = document.getElementById('dpCompania');
const dpRamo = document.getElementById('dpRamo');
const dpEstadoPoliza = document.getElementById('dpEstadoPoliza');
const btnGuardarPoliza = document.getElementById('btnGuardarPoliza')
/*Domicilio*/
const txtDomicilio = document.getElementById('txtDomicilio');
const dpdTipoDomicilio = document.getElementById('dpdTipoDomicilio');
const txtCP = document.getElementById('txtCP');
const txtLocalidad = document.getElementById('txtLocalidad');
const btnGuardarDomicilio = document.getElementById('btnGuardarDomicilio');
/*Vehiculo*/
const txtVehiculo = document.getElementById('txtVehiculo');
const txtPatente = document.getElementById('txtPatente');
const dpTipoVehiculo = document.getElementById('dpdTipoVehiculo');
const btnGuardarVehiculo = document.getElementById('btnGuardarVehiculo')
const txtPolizaVehiculo = document.getElementById('txtPolizaVehiculo')
/**-------------------------------------- DATOS DE CLIENTE ---------------------------------------------- */
async function formCliente() {
    if (_nombre.value !== "" && _dni.value !== "") {
        return {
            nombre: _nombre.value,
            dni: _dni.value,
            fechaNacimiento: parseCustomDate(_fechaNacimiento.value)
        };
    } else {
        return null;
    }
}

async function loadFormCliente(cliente) {
    _nombre.value = cliente.nombre;
    _dni.value = cliente.dni;
    _fechaNacimiento.value = cliente.fechaNacimiento ? formatDate(cliente.fechaNacimiento) : "";
    idCliente = cliente._id;
}

btnGuardar.addEventListener("click", async function () {
    try {
        const objCliente = await formCliente();

        if (!objCliente) {
            alert("Los campos nombre y DNI son obligatorios, completelos antes de guardar")
        } else {
            if (idCliente !== null) {
                await updateCliente(idCliente, objCliente);
                alert("cliente actualizado correctamente")
            } else {
                const data = await addCliente(objCliente);
                console.log("Response from addCliente:", data); // Debugging step
                await loadFormCliente(data);
                alert("Cliente creado correctamente");
            }
        }
        btnGuardar.disabled = true;
        btnEditar.disabled = false;

        _nombre.disabled = true;
        _dni.disabled = true;
        _fechaNacimiento.disabled = true;
        btnGuardarPoliza.disabled = false;
        btnGuardarPoliza.disabled = false
    } catch (error) {
        alert("Error actualizando o guardando el Cliente. Intente de nuevo. " + error);
    }
});

btnEditar.addEventListener("click", async function () {
    btnGuardar.disabled = false;
    btnEditar.disabled = true;
    _nombre.disabled = false;
    _dni.disabled = false;
    _fechaNacimiento.disabled = false;
})

/**---------------------------------Datos de contacto--------------------------------------- */
const tableResultDatosContacto = document.querySelector('#tableDatosContacto');
async function showTableDatosContacto(data) {
    tableResultDatosContacto.innerHTML = ""; // Clear only before inserting new data
    tableResultDatosContacto.insertAdjacentHTML("beforeend", createTableDatosContacto(data, true));
}

async function formDatosContacto() {
    if (txtTelefonoMovil.value !== "") {
        return {
            telefonoMovil: txtTelefonoMovil.value,
            telefonoFijo: txtTelefonoFijo.value,
            email: txtEmail.value,
            perteneceA: dpdPerteneceA.value,
            idCliente : idCliente
        };
    } else {
        return null;
    }
}

async function cleanFormDatosCliente() {
    txtTelefonoFijo.value = "";
    txtTelefonoMovil.value = "";
    txtEmail.value = "";
    dpdPerteneceA.value = "";
}


btnGuardarDatosContacto.addEventListener("click", async function () {
    try {
        const objDatosContacto = await formDatosContacto();


        if (!objDatosContacto) {
            alert("El campo telefono móvil es obligatorio, completelos antes de guardar")
        } else {
            if (idDatosContacto !== null) {
                await updateDatosContacto(idDatosContacto, objDatosContacto);
                alert("Datos de contacto actualizado correctamente")
            } else {
                const data = await addDatoContacto(objDatosContacto);
                console.log("Response from addDatosContacto:", data); // Debugging step   
                alert("Datos de contacto asociado a cliente correctamente");
            }
        }
        await cleanFormDatosCliente();
        const contactos = await getDatosContactoByIdCliente(idCliente);
        await showTableDatosContacto(contactos);
    } catch (error) {
        alert("Error actualizando o guardando datos de contacto. Intente de nuevo. " + error);
    }
});

function loadFormDatosContacto(datosContacto) {
    txtTelefonoMovil.value = datosContacto.telefonoMovil;
    txtTelefonoFijo.value = datosContacto.telefonoFijo;
    txtEmail.value = datosContacto.email;
    dpdPerteneceA.value = datosContacto.perteneceA;
   
}

document.addEventListener("click", function (event) {
    if (event.target.closest(".edit-datosContacto")) {
        const button = event.target.closest(".edit-datosContacto");
        const datosContacto = JSON.parse(button.getAttribute("data-datosContacto")); // Get the data
        console.log("Datos de contacto", datosContacto);
        idDatosContacto = datosContacto._id
        loadFormDatosContacto(datosContacto)
    }
});



/*----------------------------------------------------DATOS DE POLIZA --------------------------------------------*/
async function formPoliza() {
    if (txtPoliza.value !== "" && dpCompania.value !== "") {
        const polizaObj = {
            poliza: txtPoliza.value,
            compania: dpCompania.value,
            ramo: dpRamo.value,
            estadoPoliza: dpEstadoPoliza.value,
            idCliente: idCliente
        };

        const fechaInicio = parseCustomDate(txtFechaInicioVigencia.value);
        const fechaFin = parseCustomDate(txtFechaFinVigencia.value);

        if (fechaInicio) polizaObj.fechaInicioVigencia = fechaInicio;
        if (fechaFin) polizaObj.fechaFinVigencia = fechaFin;

        return polizaObj;
    } else {
        return null;
    }
}

function loadFormPoliza(poliza) {
    txtPoliza.value = poliza.poliza;
    txtFechaInicioVigencia.value = poliza.fechaInicioVigencia ? formatDate(poliza.fechaInicioVigencia) : "";
    txtFechaFinVigencia.value = poliza.fechaFinVigencia ? formatDate(poliza.fechaFinVigencia) : "";
    dpCompania.value = poliza.compania;
    dpRamo.value = poliza.ramo;
    dpEstadoPoliza.value = poliza.estadoPoliza.toUpperCase();
}

async function cleanFormPoliza() {
    txtPoliza.value = "";
    txtFechaInicioVigencia.value = "";
    txtFechaFinVigencia.value = "";
    dpCompania.value = "";
    dpRamo.value = "";
    dpEstadoPoliza.value = "";
}

//show tabla poliza
const tableResultPoliza = document.querySelector('#tablePoliza');
async function showTablePoliza(data) {
    tableResultPoliza.innerHTML = ""; // Clear only before inserting new data
    tableResultPoliza.insertAdjacentHTML("beforeend", createTablePoliza(data, true));
}

/**Guardar datos de poliza */
btnGuardarPoliza.addEventListener("click", async function () {
    try {
        const objPoliza = await formPoliza();


        if (!objPoliza) {
            alert("Los campos poliza y compañia son obligatorios, completelos antes de guardar")
        } else {
            if (idPoliza !== null) {
                await updatePoliza(idPoliza, objPoliza);
                alert("Poliza actualizada correctamente")
            } else {
                const data = await addPoliza(objPoliza);
                console.log("Response from addPoliza:", data); // Debugging step   
                alert("Poliza asociada a cliente correctamente");
            }
        }
        await cleanFormPoliza();
        const polizas = await getPolizasByClientId(idCliente);
        await showTablePoliza(polizas)

    } catch (error) {
        alert("Error actualizando o guardando datos de poliza. Intente de nuevo. " + error);
    }
});

document.addEventListener("click", function (event) {
    if (event.target.closest(".edit-poliza")) {
        const button = event.target.closest(".edit-poliza");
        const poliza = JSON.parse(button.getAttribute("data-poliza")); // Get the data
        console.log("Datos de Poliza", poliza);
        idPoliza = poliza._id
        loadFormPoliza(poliza)
    }
});


/**------------------------------------DATOS DE DOMICILIO--------------------------------------------- */

const tableResulDomicilio = document.querySelector('#tableDomicilio');
//show tabla poliza
async function showTableDomicilio(data) {
    tableResulDomicilio.innerHTML = ""; // Clear only before inserting new data
    tableResulDomicilio.insertAdjacentHTML("beforeend", createTableDomicilios(data));
}

async function cleanFormDomicilio() {
    txtDomicilio.value = "";
    txtCP.value = "";
    txtLocalidad.value = "";
    dpdTipoDomicilio.value = "";
}

function loadDomicilio(domicilio) {
    dpdTipoDomicilio.value = domicilio.tipoDomicilio || "";
    txtLocalidad.value = domicilio.localidad || "";
    txtDomicilio.value = domicilio.domicilio || "";
    txtCP.value = domicilio.cp || "";
}

async function formDomicilio() {

    if (txtDomicilio.value !== "") {
        return {
            domicilio: txtDomicilio.value,
            tipoDomicilio: dpdTipoDomicilio.value,
            cp: txtCP.value,
            localidad: txtLocalidad.value,
            idCliente: idCliente,
            idPoliza: idPoliza
        };
    } else {
        return null;
    }
}

btnGuardarDomicilio.addEventListener("click", async function () {
    try {
        const objDomicilio = await formDomicilio();

        if (!objDomicilio) {
            alert("El campo domicilio es obligatorio")
        } else {
            if (idDomicilio !== null) {
                await updateDomicilio(idDomicilio, objDomicilio);
                alert("Domicilio actualizado correctamente")
            } else {
                const data = await addDomicilio(objDomicilio);
                console.log("Response from addDomicilio:", data); // Debugging step
                //await loadFormPoliza(data);
                alert("Domicilio asociada a cliente correctamente");
            }
        }
        await cleanFormDomicilio();
        const domicilios = await getDomiciliosByClientId(idCliente);
        await showTableDomicilio(domicilios)
      
    } catch (error) {
        alert("Error guardando o actualizando Domicilio. Intente de nuevo. " + error);
    }
});

document.addEventListener("click", function (event) {
    if (event.target.closest(".edit-domicilio")) {
        const button = event.target.closest(".edit-domicilio");
        const domicilio = JSON.parse(button.getAttribute("data-domicilio")); // Get the data
        console.log("Domicilio", domicilio);
        idDomicilio = domicilio._id;
        loadDomicilio(domicilio);
    }
});

/**----------------------------------DATOS DE VEHICULO----------------------------------------------- */
const tableResulVehiculo = document.querySelector('#tableVehiculo');
async function showTableVehiculo(data) {
    tableResulVehiculo.innerHTML = ""; // Clear only before inserting new data
    tableResulVehiculo.insertAdjacentHTML("beforeend", await createTableVehiculos(data, true));
}

async function cleanFormVehiculo() {
    txtPatente.value = "";
    txtVehiculo.value = "";
    dpTipoVehiculo.value = "";
}

async function formVehiculo(numPoliza) {
    const poliza = await getPolizasByPoliza(numPoliza)
    if(poliza !== null){
        if (txtPatente.value !== "") {
            return {
                tipoVehiculo: dpTipoVehiculo.value,
                nombre: txtVehiculo.value,
                patente: txtPatente.value,
                idCliente: idCliente,
                idPoliza: poliza[0]._id
            };
        } else {
            return null;
        }
    }else{
        return null
    }
   
}

function loadVehiculo(vehiculo) {
    dpTipoVehiculo.value = vehiculo.tipoVehiculo || "";
    txtVehiculo.value = vehiculo.nombre || "";
    txtPatente.value = vehiculo.patente || "";
}

btnGuardarVehiculo.addEventListener("click", async function () {
    try {
        var objVehiculo = null;
        if(txtPolizaVehiculo.value !== ""){
            objVehiculo = await formVehiculo(txtPolizaVehiculo.value);
            if (!objVehiculo) {
                alert("El campo patente es obligatorio")
            } else {
                if (idVehiculo !== null) {
                    await updateVehiculo(idVehiculo, objVehiculo);
                    alert("Vehiculo actualizado correctamente")
                } else {
                    const data = await addVehiculo(objVehiculo);
                    console.log("Response from addVehiculo:", data); // Debugging step        
                    alert("Vehiculo asociada a cliente correctamente");    
                }
            }
        }else{
            alert("El campo poliza de vehiculo es obligatorio para poder asociar vehiculo ")
        }
       
        await cleanFormVehiculo();
        const vehiculosTable = await getVehiculosByClientId(idCliente);
        await showTableVehiculo(vehiculosTable)
       
    } catch (error) {
        alert("Error guardando o actualizando Domicilio. Intente de nuevo. " + error);
    }
});

document.addEventListener("click", function (event) {
    if (event.target.closest(".edit-vehiculo")) {
        const button = event.target.closest(".edit-vehiculo");
        const vehiculo = JSON.parse(button.getAttribute("data-vehiculo")); // Get the data
        console.log("Vehiculo", vehiculo);
        idVehiculo = vehiculo._id;
        loadVehiculo(vehiculo);
    }
});

/**-------------------------------------LOAD DATA ----------------------------------------------------- */
window.onload = async function () {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("idCliente");

    if (id !== null) {
        idCliente = id
        const client = await getClientById(id);
        loadFormCliente(client)
        const datosContacto = await getDatosContactoByIdCliente(id);
        if (datosContacto.length > 0) {
            await showTableDatosContacto(datosContacto)
        } else {

            tableResultDatosContacto.insertAdjacentHTML("beforeend", "<div class='row ms-1 mt-2'><div class='alert alert-info col-md-4' role='alert'>No se encontraron datos de contacto asociados</div> </div>");
        }
        const polizas = await getPolizasByClientId(id);
        if (polizas.length > 0) {
            await showTablePoliza(polizas)
        } else {

            tableResultPoliza.insertAdjacentHTML("beforeend", "<div class='row ms-1 mt-2'><div class='alert alert-info col-md-4' role='alert'>No se encontraron datos de poliza asociados</div> </div>");
        }
        const domicilios = await getDomiciliosByClientId(id);
        if (domicilios.length > 0) {
            await showTableDomicilio(domicilios)
        } else {
            tableResulDomicilio.insertAdjacentHTML("beforeend", "<div class='row ms-1 mt-2'><div class='alert alert-info col-md-4' role='alert'>No se encontraron datos de domicilio asociados</div> </div>");
        }

        const vehiculos = await getVehiculosByClientId(id)
        if (vehiculos.length > 0) {
            await showTableVehiculo(vehiculos)
        } else {
            tableResulVehiculo.insertAdjacentHTML("beforeend", "<div class='row ms-1 mt-2'><div class='alert alert-info col-md-4' role='alert'>No se encontraron datos de vehiculo asociados</div> </div>");
        }
    }
    if (btnGuardar) {
        btnGuardar.disabled = false; // Enable button when page loads
        _nombre.disabled = false;
        _dni.disabled = false;
        _fechaNacimiento.disabled = false;
    } else {
        console.error("Error: Button with id 'btnGuardar' not found.");
    }
};
