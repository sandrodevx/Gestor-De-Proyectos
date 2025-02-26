// ==========================================
// Variables globales para proyectos y tareas
// ==========================================
let projects = []; // Lista de proyectos

// ==========================================
// Funciones de gestión de proyectos
// ==========================================

// Función para agregar un proyecto
function addProject(name, description, startDate, endDate) {
    const newProject = {
        id: Date.now(),
        name,
        description,
        startDate,
        endDate,
        tasks: [],
    };
    projects.push(newProject);
    saveProjects();
    renderProjects();
    renderProjectSelector(); // Actualiza el selector de proyectos
    clearProjectInputs(); // Limpia los campos del proyecto
}

// Función para guardar proyectos en localStorage
function saveProjects() {
    try {
        localStorage.setItem("projects", JSON.stringify(projects));
    } catch (error) {
        console.error("Error al guardar proyectos en localStorage:", error);
    }
}

// Función para cargar proyectos desde localStorage
function loadProjects() {
    try {
        const savedProjects = JSON.parse(localStorage.getItem("projects")) || [];
        projects = savedProjects;
        renderProjects();
        renderProjectSelector(); // Actualiza el selector de proyectos
    } catch (error) {
        console.error("Error al cargar proyectos desde localStorage:", error);
    }
}

// Función para renderizar la lista de proyectos
function renderProjects() {
    const projectList = document.getElementById("projectList");
    projectList.innerHTML = "";
    projects.forEach(project => {
        const li = document.createElement("li");
        li.textContent = `${project.name} - ${project.description}`;
        projectList.appendChild(li);
    });
}

// Función para renderizar el selector de proyectos
function renderProjectSelector() {
    const projectSelector = document.getElementById("projectSelector");
    projectSelector.innerHTML = "<option value=''>Selecciona un proyecto</option>";
    projects.forEach(project => {
        const option = document.createElement("option");
        option.value = project.id;
        option.textContent = project.name;
        projectSelector.appendChild(option);
    });
}

// Función para limpiar los campos del proyecto
function clearProjectInputs() {
    document.getElementById("projectName").value = "";
    document.getElementById("projectDescription").value = "";
    document.getElementById("projectStartDate").value = "";
    document.getElementById("projectEndDate").value = "";
}

// ==========================================
// Funciones de gestión de tareas
// ==========================================

// Función para agregar una tarea
function addTask(projectId, description, priority, status, dueDate) {
    const project = projects.find(p => p.id === projectId);
    if (project) {
        const newTask = {
            id: Date.now(),
            description,
            priority,
            status,
            dueDate,
        };
        project.tasks.push(newTask);
        saveProjects();
        renderTasks(projectId);
        clearTaskInputs(); // Limpia los campos de la tarea
    }
}

// Función para renderizar la lista de tareas
function renderTasks(projectId) {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    const project = projects.find(p => p.id === projectId);
    if (project) {
        project.tasks.forEach(task => {
            const li = document.createElement("li");
            li.textContent = `${task.description} (${task.priority})`;
            taskList.appendChild(li);
        });
    }
}

// Función para limpiar los campos de la tarea
function clearTaskInputs() {
    document.getElementById("taskDescription").value = "";
    document.getElementById("taskPriority").value = "alta";
    document.getElementById("taskStatus").value = "pendiente";
    document.getElementById("taskDueDate").value = "";
}

// ==========================================
// Event listeners para proyectos y tareas
// ==========================================

// Event listener para agregar un proyecto
document.getElementById("addProject").addEventListener("click", () => {
    const name = document.getElementById("projectName").value.trim();
    const description = document.getElementById("projectDescription").value.trim();
    const startDate = document.getElementById("projectStartDate").value;
    const endDate = document.getElementById("projectEndDate").value;
    if (name === "" || description === "" || startDate === "" || endDate === "") return alert("Por favor, completa todos los campos.");
    addProject(name, description, startDate, endDate);
});

// Event listener para agregar una tarea
document.getElementById("addTask").addEventListener("click", () => {
    const description = document.getElementById("taskDescription").value.trim();
    const priority = document.getElementById("taskPriority").value;
    const status = document.getElementById("taskStatus").value;
    const dueDate = document.getElementById("taskDueDate").value;
    const projectId = document.getElementById("projectSelector").value; // Obtener el ID del proyecto seleccionado
    if (!projectId) return alert("Por favor, selecciona un proyecto.");
    if (description === "" || dueDate === "") return alert("Por favor, completa todos los campos.");
    addTask(projectId, description, priority, status, dueDate);
});

// ==========================================
// Inicialización de la aplicación
// ==========================================

// Función para cargar los proyectos al iniciar la aplicación
function initApp() {
    loadProjects();
}

initApp(); // Inicializa la aplicación

