// Almacén de cursos y módulos
const courses = {
    python: {
        titulo: "Python",
        modulos: [
            {
                titulo: "Introducción",
                teoria: "Aprende los fundamentos de Python y su sintaxis básica.",
                codigo: "print('Hola, mundo!')",
                quiz: {
                    pregunta: "¿Cómo se imprime un texto en Python?",
                    opciones: ["echo 'Hola'", "console.log('Hola')", "print('Hola')"],
                    respuesta: 2
                }
            },
            {
                titulo: "Listas y Bucles",
                teoria: "Uso de listas y bucles for para recorrer datos.",
                codigo: "for i in [1,2,3]:\n    print(i)",
                quiz: {
                    pregunta: "¿Qué estructura permite repetir código un número de veces?",
                    opciones: ["if", "for", "try"],
                    respuesta: 1
                }
            }
        ]
    },
    javascript: {
        titulo: "JavaScript",
        modulos: [
            {
                titulo: "Variables",
                teoria: "Declaración y uso de variables en JavaScript.",
                codigo: "let saludo = 'Hola';\nconsole.log(saludo);",
                quiz: {
                    pregunta: "¿Con qué palabra se declara una variable modificable?",
                    opciones: ["let", "const", "var"],
                    respuesta: 0
                }
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

// Progreso y gamificación
let progress = JSON.parse(localStorage.getItem('progress') || '{"points":0,"cursos":{}}');
updateHUD();

function saveProgress() {
    localStorage.setItem('progress', JSON.stringify(progress));
}

function updateHUD() {
    const level = Math.floor(progress.points / 100) + 1;
    document.getElementById('level').textContent = `Nivel: ${level}`;
    document.getElementById('points').textContent = `Puntos: ${progress.points}`;
}

document.getElementById('reset-progress').addEventListener('click', () => {
    localStorage.removeItem('progress');
    progress = {points:0,cursos:{}};
    updateHUD();
    content.innerHTML = '<p>Progreso reiniciado.</p>';
});

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
        const done = progress.cursos[lang] && progress.cursos[lang].modulos[idx];
        html += `
            <section class="${done ? 'done' : ''}">
                <h3>${idx + 1}. ${mod.titulo}</h3>
                <p>${mod.teoria}</p>
                <pre><code>${mod.codigo}</code></pre>
                <button onclick="runCode(\`${mod.codigo}\`)">Ejecutar</button>
                ${mod.quiz ? `<button onclick="startQuiz('${lang}',${idx})">Quiz</button>` : ''}
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

function startQuiz(lang, idx) {
    const mod = courses[lang].modulos[idx];
    const q = mod.quiz;
    if (!q) return;
    const container = document.getElementById('quiz-container');
    let html = `<h3>${q.pregunta}</h3><ul>`;
    q.opciones.forEach((op,i)=>{
        html += `<li><button onclick="answerQuiz('${lang}',${idx},${i})">${op}</button></li>`;
    });
    html += '</ul>';
    container.innerHTML = html;
    container.classList.remove('hidden');
    content.scrollIntoView();
}

function answerQuiz(lang, idx, choice) {
    const mod = courses[lang].modulos[idx];
    const q = mod.quiz;
    const container = document.getElementById('quiz-container');
    if (choice === q.respuesta) {
        container.innerHTML = '<p>¡Correcto!</p>';
        if (!progress.cursos[lang]) progress.cursos[lang] = {modulos: []};
        if (!progress.cursos[lang].modulos[idx]) {
            progress.cursos[lang].modulos[idx] = true;
            progress.points += 10;
            saveProgress();
        }
    } else {
        container.innerHTML = `<p>Incorrecto. Respuesta correcta: ${q.opciones[q.respuesta]}</p>`;
    }
    updateHUD();
    setTimeout(()=>{container.classList.add('hidden'); showCourse(lang);},1500);
}

// Service Worker para modo offline
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js');
    });
}
