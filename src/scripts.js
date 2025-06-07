"use strict";
// Almacén de cursos y módulos
const courses = {
    python: {
        titulo: "Python",
        modulos: [
            {
                titulo: "Introducción",
                teoria: "Aprende los fundamentos de Python y su sintaxis básica.",
                codigo: "print('Hola, mundo!')"
            },
            {
                titulo: "Listas y Bucles",
                teoria: "Uso de listas y bucles for para recorrer datos.",
                codigo: "for i in [1,2,3]:\n    print(i)"
            }
        ]
    },
    javascript: {
        titulo: "JavaScript",
        modulos: [
            {
                titulo: "Variables",
                teoria: "Declaración y uso de variables en JavaScript.",
                codigo: "let saludo = 'Hola';\nconsole.log(saludo);"
            }
        ]
    }
};

// Manejo de tema oscuro
const themeBtn = document.getElementById('toggle-theme');
const body = document.body;
const storedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const useDark = storedTheme ? storedTheme === 'dark' : prefersDark;

if (useDark) {
    body.classList.add('dark-mode');
    themeBtn.textContent = 'Modo Claro';
} else {
    themeBtn.textContent = 'Modo Oscuro';
}

themeBtn.addEventListener('click', () => {
    const dark = body.classList.toggle('dark-mode');
    themeBtn.textContent = dark ? 'Modo Claro' : 'Modo Oscuro';
    localStorage.setItem('theme', dark ? 'dark' : 'light');
});

// Renderizado de contenido
const content = document.getElementById('content');
const output = document.getElementById('output');
let currentLang = null;

document.querySelector('nav').addEventListener('click', (e) => {
    if (e.target.tagName.toLowerCase() === 'a') {
        e.preventDefault();
        const lang = e.target.getAttribute('href').substring(1);
        showCourse(lang);
    }
});

function showCourse(lang) {
    const course = courses[lang];
    if (!course) {
        content.innerHTML = '<p>Ruta en desarrollo</p>';
        output.textContent = '';
        currentLang = null;
        return;
    }
    currentLang = lang;
    let html = `<h2>${course.titulo}</h2>`;
    course.modulos.forEach((mod, idx) => {
        html += `
            <section>
                <h3>${idx + 1}. ${mod.titulo}</h3>
                <p>${mod.teoria}</p>
                <pre><code>${mod.codigo}</code></pre>
                <button onclick="runCode(\`${mod.codigo}\`)">Ejecutar</button>
            </section>
        `;
    });
    content.innerHTML = html;
}

function runCode(code) {
    if (currentLang !== 'javascript') {
        showMessage('La ejecución de código solo está disponible para JavaScript.');
        return;
    }
    try {
        const result = eval(code);
        showMessage(result !== undefined ? result : 'Código ejecutado');
    } catch (err) {
        showMessage('Error: ' + err.message);
    }
}

function showMessage(msg) {
    output.textContent = msg;
}

// Service Worker para modo offline
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js');
    });
}
