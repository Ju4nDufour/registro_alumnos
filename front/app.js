// Configuración mejorada de la API
const API_BASE_URL = "http://localhost:5001/api";
const STUDENTS_API_URL = `${API_BASE_URL}/students`;
const CAREERS_API_URL = `${API_BASE_URL}/careers`;
const API_KEY = "12345ABCDEF";

const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${API_KEY}`
};

// =============================================
// FUNCIONES MEJORADAS DE SERVICIO
// =============================================

// Función genérica para manejar fetch requests
async function fetchData(url, method = 'GET', body = null) {
    const options = {
        method,
        headers,
        body: body ? JSON.stringify(body) : null
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error en ${method} ${url}:`, error);
        throw error;
    }
}

// Servicios de Estudiantes (simplificados usando fetchData)
async function registerStudentService(name, dni, career) {
    return fetchData(STUDENTS_API_URL, 'POST', { name, dni, career });
}

async function getStudentByIdService(id) {
    return fetchData(`${STUDENTS_API_URL}/${id}`);
}

async function getStudentsByCareerService(career) {
    return fetchData(`${STUDENTS_API_URL}?career=${encodeURIComponent(career)}`);
}

async function getAllStudentsService() {
    return fetchData(STUDENTS_API_URL);
}

async function updateStudentService(id, name, dni, career) {
    return fetchData(`${STUDENTS_API_URL}/${id}`, 'PUT', { name, dni, career });
}

async function deleteStudentService(id) {
    return fetchData(`${STUDENTS_API_URL}/${id}`, 'DELETE');
}

// Servicios de Carreras (simplificados)
async function getAllCareersService() {
    return fetchData(CAREERS_API_URL);
}

async function addCareerService(name) {
    return fetchData(CAREERS_API_URL, 'POST', { name });
}

async function updateCareerService(id, name) {
    return fetchData(`${CAREERS_API_URL}/${id}`, 'PUT', { name });
}

async function deleteCareerService(id) {
    return fetchData(`${CAREERS_API_URL}/${id}`, 'DELETE');
}

// =============================================
// FUNCIONES MEJORADAS DE UI
// =============================================

// Función mejorada para mostrar alertas
function showAlert(message, type, duration = 5000) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.role = 'alert';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    const container = document.querySelector('.container') || document.body;
    container.prepend(alertDiv);
    
    setTimeout(() => {
        alertDiv.remove();
    }, duration);
}

// Función para mostrar spinner de carga
function showLoading(element) {
    const spinner = document.createElement('div');
    spinner.className = 'spinner-border text-primary';
    spinner.role = 'status';
    spinner.innerHTML = '<span class="visually-hidden">Cargando...</span>';
    element.innerHTML = '';
    element.appendChild(spinner);
}

// Función unificada para cargar carreras en selects
async function loadCareersIntoSelect(selectElementId, includeEmptyOption = true) {
    try {
        const selectElement = document.getElementById(selectElementId);
        if (!selectElement) return;

        showLoading(selectElement);
        const careers = await getAllCareersService();
        
        selectElement.innerHTML = includeEmptyOption 
            ? '<option value="">Seleccione una carrera</option>' 
            : '';
        
        careers.forEach(career => {
            const option = new Option(career.name, career.id);
            selectElement.add(option);
        });
    } catch (error) {
        console.error("Error loading careers:", error);
        showAlert('Error al cargar las carreras', 'danger');
    }
}

// Resto del código mejorado...
// [El resto del código sigue con mejoras similares]