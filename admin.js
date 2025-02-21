// Usuarios iniciales (admin predefinido)
let usuarios = {
    "admin": {
        password: "admin",
        aprobado: true,
        rol: "administrador"
    }
};

// Verificar si ya existe en localStorage
if (localStorage.getItem('usuarios')) {
    usuarios = JSON.parse(localStorage.getItem('usuarios'));
}

// Guardar cambios en usuarios
function guardarUsuarios() {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    // Aqu� podr�as agregar c�digo para guardar en un archivo f�sico usando una API del servidor
}

// Login
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const message = document.getElementById('message');

    if (usuarios[username]) {
        if (usuarios[username].password === password) {
            if (usuarios[username].aprobado) {
                localStorage.setItem('currentUser', username);
                window.location.href = 'index.html';
            } else {
                message.textContent = 'Esperando aprobaci�n del administrador';
            }
        } else {
            message.textContent = 'Contrase�a incorrecta';
        }
    } else {
        message.textContent = 'Usuario no encontrado';
    }
});

// Registro
document.getElementById('registerBtn')?.addEventListener('click', function() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const message = document.getElementById('message');

    if (username && password) {
        if (!usuarios[username]) {
            usuarios[username] = {
                password: password,
                aprobado: false,
                rol: "usuario"
            };
            guardarUsuarios();
            message.textContent = 'Registro exitoso. Espera aprobaci�n del administrador.';
        } else {
            message.textContent = 'El usuario ya existe';
        }
    }
});

// Verificar sesi�n
if (window.location.pathname.includes('index.html')) {
    if (!localStorage.getItem('currentUser')) {
        window.location.href = 'login.html';
    }
}

// Logout
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}