// ==========================================
// Variables globales para autenticación
// ==========================================
let currentUser = null; // Usuario actual

// ==========================================
// Funciones de autenticación
// ==========================================

// Función para iniciar sesión
function login(username, password) {
    // Lógica de autenticación (simulada)
    currentUser = username;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    alert(`Bienvenido, ${username}!`);
    toggleAuthUI(); // Oculta la sección de autenticación y muestra la de proyectos
}

// Función para registrarse
function register(username, password) {
    // Lógica de registro (simulada)
    currentUser = username;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    alert(`Usuario ${username} registrado con éxito.`);
    toggleAuthUI(); // Oculta la sección de autenticación y muestra la de proyectos
}

// Función para cerrar sesión
function logout() {
    currentUser = null;
    localStorage.removeItem("currentUser");
    alert("Sesión cerrada.");
    toggleAuthUI(); // Muestra la sección de autenticación y oculta la de proyectos
}

// Función para alternar la interfaz de autenticación
function toggleAuthUI() {
    const authSection = document.getElementById("auth-section");
    const projectSection = document.getElementById("project-section");
    const taskSection = document.getElementById("task-section");

    if (currentUser) {
        authSection.classList.add("hidden");
        projectSection.classList.remove("hidden");
        taskSection.classList.remove("hidden");
    } else {
        authSection.classList.remove("hidden");
        projectSection.classList.add("hidden");
        taskSection.classList.add("hidden");
    }
}

// ==========================================
// Event listeners para autenticación
// ==========================================

// Event listener para el botón de inicio de sesión
document.getElementById("login").addEventListener("click", () => {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    if (username === "" || password === "") return alert("Por favor, completa todos los campos.");
    login(username, password);
});

// Event listener para el botón de registro
document.getElementById("register").addEventListener("click", () => {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    if (username === "" || password === "") return alert("Por favor, completa todos los campos.");
    register(username, password);
});

// ==========================================
// Inicialización de la autenticación
// ==========================================

// Función para cargar el usuario actual al iniciar la aplicación
function initAuth() {
    const savedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (savedUser) {
        currentUser = savedUser;
        toggleAuthUI();
    }
}

initAuth(); // Inicializa la autenticación