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
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
}

themeBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// Renderizado de contenido
const content = document.getElementById('content');

document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = link.getAttribute('href').substring(1);
        showCourse(lang);
    });
});

function showCourse(lang) {
    const course = courses[lang];
    if (!course) return;
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
    try {
        const result = eval(code);
        alert(result !== undefined ? result : 'Código ejecutado');
    } catch (err) {
        alert('Error: ' + err.message);
    }
}

// Service Worker para modo offline
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js');
    });
}
