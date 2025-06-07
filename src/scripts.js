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
            ,{
                titulo: "Funciones",
                teoria: "Cómo declarar y utilizar funciones en Python.",
                codigo: "def saludar(nombre):\n    return f'Hola {nombre}'\nprint(saludar('Ana'))",
                quiz: {
                    pregunta: "¿Con qué palabra clave se define una función?",
                    opciones: ["def", "func", "function"],
                    respuesta: 0
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
            },
            {
                titulo: "Funciones",
                teoria: "Definición de funciones y retorno de valores.",
                codigo: "function cuadrado(n){\n  return n*n;\n}\nconsole.log(cuadrado(4));",
                quiz: {
                    pregunta: "¿Cómo se declara una función tradicional?",
                    opciones: ["function miFunc()", "def miFunc()", "func miFunc"],
                    respuesta: 0
                }
            }
        ]
    },
    java: {
        titulo: "Java",
        modulos: [
            {
                titulo: "Hola Mundo",
                teoria: "Estructura básica de un programa en Java.",
                codigo: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hola Mundo\");\n    }\n}",
                quiz: {
                    pregunta: "¿Con qué método inicia la ejecución un programa en Java?",
                    opciones: ["start", "main", "run"],
                    respuesta: 1
                }
            }
        ]
    },
    cpp: {
        titulo: "C++",
        modulos: [
            {
                titulo: "Compilación",
                teoria: "Ejemplo básico de programa en C++.",
                codigo: "#include <iostream>\nint main(){\n    std::cout << \"Hola Mundo\";\n    return 0;\n}",
                quiz: {
                    pregunta: "¿Qué biblioteca se incluye para imprimir en pantalla?",
                    opciones: ["stdio.h", "iostream", "stdlib.h"],
                    respuesta: 1
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
let progress = JSON.parse(localStorage.getItem('progress') || '{"points":0,"cursos":{},"ultimoReto":""}');
updateHUD();

function updateBadges() {
    const badges = document.getElementById('badges');
    badges.innerHTML = '';
    if (progress.points >= 50) {
        badges.innerHTML += '<span class="badge">Aprendiz</span>';
    }
    if (progress.points >= 100) {
        badges.innerHTML += '<span class="badge">Experto</span>';
    }
}

function saveProgress() {
    localStorage.setItem('progress', JSON.stringify(progress));
}

function updateHUD() {
    const level = Math.floor(progress.points / 100) + 1;
    document.getElementById('level').textContent = `Nivel: ${level}`;
    document.getElementById('points').textContent = `Puntos: ${progress.points}`;
    updateBadges();
}

document.getElementById('reset-progress').addEventListener('click', () => {
    localStorage.removeItem('progress');
    progress = {points:0,cursos:{},ultimoReto:''};
    updateHUD();
    content.innerHTML = '<p>Progreso reiniciado.</p>';
    document.getElementById('daily-challenge').classList.add('hidden');
});

themeBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// Renderizado de contenido
const content = document.getElementById('content');
const dailyContainer = document.getElementById('daily-challenge');
const dailyBtn = document.getElementById('daily-btn');
const certificateDiv = document.getElementById('certificate');

const dailyChallenges = [
    'Escribe un programa que calcule la suma de los primeros 10 n\u00FAmeros.',
    'Crea una funci\u00F3n que verifique si una palabra es pal\u00EDndromo.',
    'Construye un bucle que imprima los n\u00FAmeros pares del 1 al 20.'
];

dailyBtn.addEventListener('click', () => {
    const today = new Date().toISOString().slice(0,10);
    if (progress.ultimoReto === today) {
        dailyContainer.innerHTML = '<p>Ya completaste el reto de hoy.</p>';
    } else {
        const challenge = dailyChallenges[Math.floor(Math.random()*dailyChallenges.length)];
        dailyContainer.innerHTML = `<p>${challenge}</p><button id="complete-challenge">Marcar como completado</button>`;
        document.getElementById('complete-challenge').addEventListener('click', () => {
            progress.ultimoReto = today;
            progress.points += 20;
            saveProgress();
            updateHUD();
            dailyContainer.innerHTML = '<p>\u00A1Reto completado!</p>';
        });
    }
    dailyContainer.classList.remove('hidden');
    content.scrollIntoView();
});

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
    if (checkCourseCompletion(lang)) {
        html += `<button onclick="downloadCertificate('${lang}')">Descargar Certificado</button>`;
    }
    content.innerHTML = html;
    certificateDiv.classList.add('hidden');
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

function checkCourseCompletion(lang) {
    const course = courses[lang];
    if (!progress.cursos[lang]) return false;
    const completed = progress.cursos[lang].modulos.filter(Boolean).length;
    return completed === course.modulos.length;
}

function downloadCertificate(lang) {
    const text = `Certificado de finalizaci\u00F3n\nRuta: ${courses[lang].titulo}\nPuntos obtenidos: ${progress.points}`;
    const blob = new Blob([text], {type:'text/plain'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `certificado-${lang}.txt`;
    document.body.appendChild(link);
    link.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(link);
    certificateDiv.innerHTML = '<p>Certificado descargado</p>';
    certificateDiv.classList.remove('hidden');
}

// Service Worker para modo offline
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js');
    });
}
