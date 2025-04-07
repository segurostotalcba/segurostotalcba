
//require("dotenv").config(); // Load .env variables
//const BASE_URI = process.env.BASE_URI

var endpoint = `https://segurosbe.onrender.com/api/buscar?`
import { createTablePoliza, createTableDatosContacto } from './tables.mjs';
const txtNombre = document.querySelector('#txtNombre');
const txtDNI = document.querySelector('#txtDNI');
const txtPatente = document.querySelector('#txtPatente');
const txtPoliza = document.querySelector('#txtPoliza');
const lblerror = document.querySelector('#error');
const btnBuscar = document.querySelector('#btnBuscar');
const btnClean = document.querySelector('#btnClean');
const divShowData = document.querySelector('#showData');

var error;
const tableContentBody = document.querySelector("#contentClient");
btnBuscar.addEventListener('click', buscar);
btnClean.addEventListener('click', cleanForm);
var idDomicilio = null;
var objDomicilio = null;

function validar() {
    var resultado = true; // Default to true
    error = []; // Reset errors on each validation

    if (
        txtNombre.value.trim() === "" &&
        txtDNI.value.trim() === "" &&
        txtPatente.value.trim() === "" &&
        txtPoliza.value.trim() === ""
    ) {
        error.push("Para poder buscar, ingrese información en alguno de los campos.");
        resultado = false;
    }

    console.log("Errores:", JSON.stringify(error));
    return resultado;
}

function cargarError() {


    error.forEach(item => {
        lblerror.insertAdjacentHTML('beforeend', `
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                ${item}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `);
    });
}


function cleanForm() {
    document.querySelectorAll("#searchForm input").forEach(input => input.value = "");
    divShowData.style.display = "none";
    lblerror.innerHTML = "";
}


function clean() {
    lblerror.innerHTML = ""; // Clear previous errors
}

function createEndpoint() {
    const baseEndpoint = endpoint;
    let params = [];

    if (txtNombre.value.trim() !== "") {
        params.push(`nombre=${encodeURIComponent(txtNombre.value)}`);
    }
    if (txtDNI.value.trim() !== "") {
        params.push(`dni=${encodeURIComponent(txtDNI.value)}`);
    }
    if (txtPoliza.value.trim() !== "") {
        params.push(`poliza=${encodeURIComponent(txtPoliza.value)}`);
    }
    if (txtPatente.value.trim() !== "") {
        params.push(`patente=${encodeURIComponent(txtPatente.value)}`);
    }

    // Join parameters correctly
    return params.length > 0 ? baseEndpoint + params.join("&") : baseEndpoint;
}

async function buscar() {
    clean();
    const res = validar();

    if (!res && error.length > 0) {
        cargarError();
    } else {
        const finalEndpoint = createEndpoint();
        console.log("Requesting:", finalEndpoint);

        // Show the Bootstrap spinner
        document.getElementById("spinner").style.display = "block";

        try {
            const response = await fetch(finalEndpoint);

            if (!response.ok) {
                alert(` HTTP error! Status: ${response.status} \n\n No se encontraron datos de cliente :(`);
                cleanForm();
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.text();
            console.log("Raw Response:", data);

            let json;
            try {
                json = JSON.parse(data);
                showData(json);
            } catch (e) {
                console.error("JSON parsing error:", e);
                return;
            }

            console.log("Parsed JSON:", json);

        } catch (error) {
            console.error("Fetch Error:", error);
        } finally {
            // Hide the Bootstrap spinner
            document.getElementById("spinner").style.display = "none";
        }
    }
}


function formatDate(isoDate) {
    const date = new Date(isoDate);
    return date.toLocaleDateString("es-AR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });
}

function showData(data) {
    divShowData.style.display = "block";
    // Accordion container
    const accordionData = document.querySelector('#accordionData');
    accordionData.innerHTML = ""; // Clear only before inserting new data

    data.forEach((item, index) => {

        const cliente = item.cliente;
        const polizas = item.polizas;
        const vehiculos = item.vehiculos;
        const domicilios = item.domicilio;
        const datosContacto = item.datosContacto;
        // Unique ID for each accordion entry
        const collapseId = `collapse_${index}`;
        const headerId = `header_${index}`;
        const urlClient = `cartera.html?idCliente=`
        // Accordion item
        const accordionItem = `
            <div class="accordion-item">
              <div class="row">
                           <div class="col-md-11">  <h2 class="accordion-header" id="${headerId}">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" 
                        data-bs-target="#${collapseId}" aria-expanded="true" aria-controls="${collapseId}">
                        ${cliente.nombre} - ${cliente.dni}
                    </button>
                </h2>
                <div id="${collapseId}" class="accordion-collapse collapse" aria-labelledby="${headerId}" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <div id="contentClient_${index}">
                           <h5 class="fw-light">Datos de Contacto</h5>
                                <hr>
                                ${createTableDatosContacto(datosContacto, false)}
                           <h5 class="fw-light mt-4">Datos de pólizas</h5>
                                <hr>
                            ${createTablePoliza(polizas, false)}
                         
                        </div>
                    </div>
                </div></div>
                           <div class="col-md-1"> <a  href="${urlClient}${cliente._id}" class="btn btn-outline-primary mt-2">Ver Más</a></div>
                           </div>
              
            </div>
        `;

        accordionData.insertAdjacentHTML("beforeend", accordionItem);
    });
}

let deleteId = null;
document.addEventListener("click", function (event) {
    if (event.target.closest(".edit-domicilio")) {
        const button = event.target.closest(".edit-domicilio");
        const domicilio = JSON.parse(button.getAttribute("data-domicilio")); // Get the data
        idDomicilio = domicilio._id;

        console.log(objDomicilio)
        const dpdTipoDomicilio = document.getElementById('dpdTipoDomicilio')
        const txtLocalidad = document.getElementById('txtLocalidad');
        const txtDomicilio = document.getElementById('txtDomicilio');
        const txtCP = document.getElementById('txtCP');
        const lblIdDomicilio = document.getElementById('idDomicilio');
        console.log(domicilio.tipoDomicilio)
        dpdTipoDomicilio.value = domicilio.tipoDomicilio || "";
        txtLocalidad.value = domicilio.localidad || "";
        txtDomicilio.value = domicilio.domicilio || "";
        txtCP.value = domicilio.cp || "";
        lblIdDomicilio.value = domicilio._id || "";

        objDomicilio = {
            //_id : domicilio._id,
            domicilio: txtDomicilio.value,
            localidad: txtLocalidad.value,
            tipoDomicilio: dpdTipoDomicilio.value,
            cp: txtCP.value
            //idCliente : domicilio.idCliente
        }
        let domicilioModal = new bootstrap.Modal(document.getElementById("domicilioModal"));

        domicilioModal.show();
    }
});

