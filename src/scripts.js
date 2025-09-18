"use strict";

const STORAGE_KEYS = Object.freeze({
    theme: "aprende-theme",
    progress: "aprende-progress",
    lastCourse: "aprende-last-course"
});

const courses = {
    python: {
        titulo: "Python",
        descripcion: "Python es un lenguaje versátil y legible ideal para comenzar a programar con rapidez.",
        modulos: [
            {
                titulo: "Introducción a Python",
                teoria: "Instala Python, practica en la consola interactiva y conoce la sintaxis básica.",
                codigo: "print('Hola, mundo!')\nprint('Python hace sencillo empezar a programar')",
                retos: [
                    "Modifica el saludo para incluir tu nombre.",
                    "Añade otra línea que muestre cuál es tu objetivo al aprender Python."
                ]
            },
            {
                titulo: "Estructuras de datos esenciales",
                teoria: "Manipula listas, tuplas y diccionarios para organizar información.",
                codigo: "edades = {'Ana': 30, 'Luis': 25}\nedades['Laura'] = 27\nfor nombre, edad in edades.items():\n    print(f'{nombre} tiene {edad} años')",
                retos: [
                    "Crea un diccionario con tus tres lenguajes favoritos y ordénalos alfabéticamente.",
                    "Filtra las personas mayores de 26 años utilizando una lista por comprensión."
                ]
            },
            {
                titulo: "Funciones reutilizables",
                teoria: "Organiza tu código en funciones para reutilizar lógica y simplificar pruebas.",
                codigo: "def calcular_area_circulo(radio):\n    PI = 3.14159\n    return PI * radio ** 2\n\narea = calcular_area_circulo(3)\nprint(f'Área: {area:.2f}')",
                retos: [
                    "Escribe una función que convierta grados Celsius a Fahrenheit.",
                    "Crea una función que reciba una lista y devuelva solo los números pares."
                ]
            },
            {
                titulo: "Programación orientada a objetos",
                teoria: "Modela objetos con clases, atributos y métodos para representar el mundo real.",
                codigo: "class Curso:\n    def __init__(self, nombre, duracion):\n        self.nombre = nombre\n        self.duracion = duracion\n\n    def descripcion(self):\n        return f'{self.nombre} dura {self.duracion} semanas'\n\npython = Curso('Introducción a Python', 6)\nprint(python.descripcion())",
                retos: [
                    "Añade un método que indique si un curso está en curso o finalizado.",
                    "Crea una subclase que represente cursos en línea con una URL."
                ]
            }
        ],
        recursos: [
            { titulo: "Documentación oficial", url: "https://docs.python.org/3/tutorial/index.html" },
            { titulo: "Ejercicios interactivos", url: "https://www.hackerrank.com/domains/tutorials/10-days-of-python" }
        ]
    },
    javascript: {
        titulo: "JavaScript",
        descripcion: "JavaScript da vida a la web con lógica en el navegador y servidores con Node.js.",
        modulos: [
            {
                titulo: "Primeros pasos",
                teoria: "Comprende variables, tipos y cómo mostrar resultados en la consola.",
                codigo: "const nombre = 'Ada';\nconst edad = 28;\nconsole.log(`Hola ${nombre}, tienes ${edad} años`);",
                retos: [
                    "Declara una constante para tu lenguaje favorito y muéstralo en consola.",
                    "Prueba a cambiar las comillas y observa cómo funcionan las plantillas literales."
                ]
            },
            {
                titulo: "Funciones modernas",
                teoria: "Aprende a crear funciones con distintas sintaxis y a devolver valores.",
                codigo: "const calcularIVA = (precio, tasa = 0.21) => precio * (1 + tasa);\nconst total = calcularIVA(50);\nconsole.log(`Total con IVA: ${total}`);",
                retos: [
                    "Crea una función flecha que reciba un nombre y devuelva un saludo personalizado.",
                    "Añade validaciones que eviten resultados negativos."
                ]
            },
            {
                titulo: "Trabajo con arreglos",
                teoria: "Utiliza métodos inmutables como map, filter y reduce para transformar datos.",
                codigo: "const cursos = ['HTML', 'CSS', 'JavaScript'];\nconst resumen = cursos.map((curso, indice) => `${indice + 1}. ${curso}`);\nconsole.log(resumen.join('\n'));",
                retos: [
                    "Genera un arreglo con tus objetivos y conviértelo a mayúsculas usando map.",
                    "Filtra los números pares de un arreglo del 1 al 10 con filter."
                ]
            },
            {
                titulo: "Asincronía básica",
                teoria: "Encadena Promesas y async/await para manejar operaciones asíncronas.",
                codigo: "const obtenerMensaje = () => new Promise(resolve => {\n    setTimeout(() => resolve('Promesa resuelta'), 300);\n});\n\n(async () => {\n    const mensaje = await obtenerMensaje();\n    console.log(mensaje);\n})();",
                retos: [
                    "Envuelve una llamada a fetch simulada y maneja errores con catch.",
                    "Mide el tiempo de ejecución utilizando console.time y console.timeEnd."
                ]
            }
        ],
        recursos: [
            { titulo: "MDN JavaScript", url: "https://developer.mozilla.org/es/docs/Web/JavaScript" },
            { titulo: "Ejercicios de Promesas", url: "https://javascript.info/promise-chaining" }
        ]
    },
    java: {
        titulo: "Java",
        descripcion: "Java destaca por su robustez y portabilidad en aplicaciones empresariales y móviles.",
        modulos: [
            {
                titulo: "Tu primer programa",
                teoria: "Comprende la estructura de una clase y el método main para iniciar la ejecución.",
                codigo: "public class Hola {\n    public static void main(String[] args) {\n        System.out.println(\"Hola desde Java\");\n    }\n}",
                retos: [
                    "Añade una segunda línea que muestre tu objetivo de aprendizaje.",
                    "Compila y ejecuta el archivo desde la terminal."
                ]
            },
            {
                titulo: "Tipos y operadores",
                teoria: "Conoce los tipos primitivos y cómo combinarlos en expresiones.",
                codigo: "int edad = 30;\ndouble precio = 19.99;\nboolean activo = true;\nSystem.out.println(edad + precio);",
                retos: [
                    "Declara una variable char y úsala en una cadena con concatenación.",
                    "Calcula el área de un rectángulo usando int para la base y la altura."
                ]
            },
            {
                titulo: "Clases y objetos",
                teoria: "Define clases con atributos y métodos para crear objetos reutilizables.",
                codigo: "class Curso {\n    private final String nombre;\n    private final int horas;\n\n    Curso(String nombre, int horas) {\n        this.nombre = nombre;\n        this.horas = horas;\n    }\n\n    String resumen() {\n        return nombre + \" dura \" + horas + \" horas\";\n    }\n}\n\nCurso javaBasico = new Curso(\"Java Básico\", 40);\nSystem.out.println(javaBasico.resumen());",
                retos: [
                    "Añade un método que calcule el número de horas por semana para un curso de 5 semanas.",
                    "Crea un constructor alternativo que solo reciba el nombre del curso."
                ]
            },
            {
                titulo: "Colecciones",
                teoria: "Gestiona listas dinámicas con ArrayList y recórrelas con bucles mejorados.",
                codigo: "import java.util.ArrayList;\nimport java.util.List;\n\nList<String> temas = new ArrayList<>();\ntemas.add(\"POO\");\ntemas.add(\"Streams\");\nfor (String tema : temas) {\n    System.out.println(tema);\n}",
                retos: [
                    "Convierte la lista en un conjunto (Set) y analiza la diferencia.",
                    "Ordena la lista alfabéticamente utilizando Collections.sort."
                ]
            }
        ],
        recursos: [
            { titulo: "Guía oficial de Java", url: "https://docs.oracle.com/javase/tutorial/" },
            { titulo: "Ejercicios de programación", url: "https://www.w3resource.com/java-exercises/" }
        ]
    },
    cpp: {
        titulo: "C++",
        descripcion: "C++ permite crear software de alto rendimiento controlando cada detalle del hardware.",
        modulos: [
            {
                titulo: "Estructura de un programa",
                teoria: "Incluye cabeceras, escribe la función main y compila tu primer programa.",
                codigo: "#include <iostream>\n\nint main() {\n    std::cout << \"Hola desde C++\\n\";\n    return 0;\n}",
                retos: [
                    "Modifica el programa para que reciba el nombre desde std::cin.",
                    "Compila con g++ y ejecuta el binario resultante."
                ]
            },
            {
                titulo: "Control de flujo",
                teoria: "Implementa condicionales y bucles para repetir instrucciones.",
                codigo: "for (int i = 1; i <= 5; ++i) {\n    if (i % 2 == 0) {\n        std::cout << i << \" es par\\n\";\n    } else {\n        std::cout << i << \" es impar\\n\";\n    }\n}",
                retos: [
                    "Escribe un bucle while que cuente regresivamente del 5 al 1.",
                    "Utiliza switch para clasificar una calificación de 1 a 5."
                ]
            },
            {
                titulo: "Funciones y referencias",
                teoria: "Define funciones reutilizables y aprovecha referencias para evitar copias innecesarias.",
                codigo: "#include <iostream>\n\nvoid intercambiar(int& a, int& b) {\n    int temporal = a;\n    a = b;\n    b = temporal;\n}\n\nint main() {\n    int x = 3, y = 7;\n    intercambiar(x, y);\n    std::cout << \"x = \" << x << \", y = \" << y << '\\n';\n}",
                retos: [
                    "Añade una función que reciba un vector y lo imprima usando for basado en rango.",
                    "Implementa una versión que use std::swap."
                ]
            },
            {
                titulo: "Programación orientada a objetos",
                teoria: "Crea clases con métodos y encapsulación para modelar entidades complejas.",
                codigo: "#include <iostream>\n#include <string>\n\nclass Curso {\npublic:\n    Curso(std::string nombre, int duracion) : nombre_(nombre), duracion_(duracion) {}\n\n    void descripcion() const {\n        std::cout << nombre_ << \" dura \" << duracion_ << \" semanas\\n\";\n    }\nprivate:\n    std::string nombre_;\n    int duracion_;\n};\n\nint main() {\n    Curso cpp(\"C++ Moderno\", 8);\n    cpp.descripcion();\n}",
                retos: [
                    "Añade un método que permita actualizar la duración del curso.",
                    "Crea una clase derivada que agregue un campo con el nivel de dificultad."
                ]
            }
        ],
        recursos: [
            { titulo: "Referencia C++", url: "https://en.cppreference.com/w/" },
            { titulo: "Ejercicios prácticos", url: "https://www.learncpp.com/" }
        ]
    }
};

const body = document.body;
const themeBtn = document.getElementById("toggle-theme");
const content = document.getElementById("content");
const output = document.getElementById("output");
const progressSummary = document.getElementById("progress-summary");
const introText = document.getElementById("intro-text");
const nav = document.querySelector(".main-nav");

let currentLang = null;
let progress = new Set(loadProgress());

initializeTheme();
restoreLastCourse();
updateProgressSummary();

nav.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-lang]");
    if (!button) {
        return;
    }
    showCourse(button.dataset.lang);
});

themeBtn.addEventListener("click", () => {
    const useDark = !body.classList.contains("dark-mode");
    applyTheme(useDark);
    setStorageItem(STORAGE_KEYS.theme, useDark ? "dark" : "light");
});

content.addEventListener("click", (event) => {
    const target = event.target;

    if (target.matches("[data-action='toggle']")) {
        toggleModuleSection(target);
        return;
    }

    if (target.matches("[data-action='run']")) {
        runJavaScriptFromEditor(target.dataset.editor);
        return;
    }

    if (target.matches("[data-action='reset']")) {
        resetEditor(target.dataset.editor, target.dataset.default);
        return;
    }

    if (target.matches("[data-action='copy']")) {
        handleCopy(target);
        return;
    }

    if (target.matches("[data-action='complete']")) {
        toggleModuleCompletion(target.dataset.module, target);
    }
});

function initializeTheme() {
    const storedTheme = getStorageItem(STORAGE_KEYS.theme);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const useDark = storedTheme ? storedTheme === "dark" : prefersDark;
    applyTheme(useDark);
}

function applyTheme(useDark) {
    body.classList.toggle("dark-mode", useDark);
    themeBtn.textContent = useDark ? "Modo claro" : "Modo oscuro";
    themeBtn.setAttribute("aria-pressed", String(useDark));
}

function restoreLastCourse() {
    const lastCourse = getStorageItem(STORAGE_KEYS.lastCourse);
    if (lastCourse && courses[lastCourse]) {
        showCourse(lastCourse);
    }
}

function showCourse(lang) {
    const course = courses[lang];
    if (!course) {
        content.innerHTML = "<p>Ruta en desarrollo. Estamos trabajando en nuevo contenido.</p>";
        introText.textContent = "Selecciona un lenguaje disponible para comenzar tu aprendizaje.";
        currentLang = null;
        updateNavState();
        updateProgressSummary();
        showMessage("Ruta en desarrollo. Selecciona otra opción para continuar aprendiendo.");
        return;
    }

    currentLang = lang;
    setStorageItem(STORAGE_KEYS.lastCourse, lang);
    introText.textContent = course.descripcion;
    updateNavState();
    if (lang === "javascript") {
        showMessage("Selecciona un módulo y ejecuta el código para ver aquí el resultado.");
    } else {
        showMessage("La ejecución de código está disponible para los módulos de JavaScript.");
    }

    const modulesHtml = course.modulos
        .map((module, index) => createModuleMarkup(lang, module, index))
        .join("");

    const resourcesHtml = course.recursos?.length
        ? `<section class="resources"><h3>Recursos recomendados</h3><ul>${course.recursos
              .map(
                  (resource) =>
                      `<li><a href="${escapeHtml(resource.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(resource.titulo)}</a></li>`
              )
              .join("")}</ul></section>`
        : "";

    content.innerHTML = modulesHtml + resourcesHtml;
    updateProgressSummary(course.modulos.length);
    openFirstModule();
}

function createModuleMarkup(lang, module, index) {
    const moduleId = `${lang}-${index}`;
    const sectionId = `${moduleId}-body`;
    const isCompleted = progress.has(moduleId);
    const moduleTitle = escapeHtml(module.titulo);
    const moduleTheory = escapeHtml(module.teoria);
    const escapedCode = escapeHtml(module.codigo);
    const hasEditor = lang === "javascript";

    const challenges = module.retos?.length
        ? `<div><h4>Retos rápidos</h4><ul class="module-challenges">${module.retos
              .map((challenge) => `<li>${escapeHtml(challenge)}</li>`)
              .join("")}</ul></div>`
        : "";

    const editor = hasEditor
        ? `<label class="sr-only" for="${moduleId}-editor">Editor de código para ${moduleTitle}</label>
            <textarea id="${moduleId}-editor" class="code-editor" spellcheck="false">${module.codigo}</textarea>`
        : "";

    const note = hasEditor
        ? ""
        : '<p class="module-note">La ejecución interactiva está disponible solo para los módulos de JavaScript.</p>';

    const actions = hasEditor
        ? `<div class="module-actions">
                <button type="button" class="btn-secondary" data-action="run" data-editor="${moduleId}-editor">Ejecutar código</button>
                <button type="button" class="btn-secondary" data-action="reset" data-editor="${moduleId}-editor" data-default="${encodeData(module.codigo)}">Restablecer</button>
                <button type="button" class="btn-secondary" data-action="copy" data-editor="${moduleId}-editor">Copiar</button>
                <button type="button" class="btn-secondary" data-action="complete" data-module="${moduleId}">${isCompleted ? "Marcar como pendiente" : "Marcar como completado"}</button>
            </div>`
        : `<div class="module-actions">
                <button type="button" class="btn-secondary" data-action="copy" data-code="${encodeData(module.codigo)}">Copiar código</button>
                <button type="button" class="btn-secondary" data-action="complete" data-module="${moduleId}">${isCompleted ? "Marcar como pendiente" : "Marcar como completado"}</button>
            </div>`;

    return `<article class="module${isCompleted ? " module-completed" : ""}" data-module="${moduleId}">
                <header>
                    <div>
                        <h3>${index + 1}. ${moduleTitle}</h3>
                        <span class="module-status">${isCompleted ? "Completado" : "Pendiente"}</span>
                    </div>
                    <button type="button" class="toggle" data-action="toggle" aria-expanded="false" aria-controls="${sectionId}">Ver contenido</button>
                </header>
                <section id="${sectionId}" class="module-body" hidden>
                    <p>${moduleTheory}</p>
                    <pre><code>${escapedCode}</code></pre>
                    ${editor}
                    ${note}
                    ${actions}
                    ${challenges}
                </section>
            </article>`;
}

function openFirstModule() {
    const firstToggle = content.querySelector("[data-action='toggle']");
    if (firstToggle) {
        toggleModuleSection(firstToggle, true);
    }
}

function toggleModuleSection(button, forceState) {
    const controls = button.getAttribute("aria-controls");
    const section = controls ? document.getElementById(controls) : null;
    if (!section) {
        return;
    }

    const shouldExpand = typeof forceState === "boolean" ? forceState : button.getAttribute("aria-expanded") !== "true";
    button.setAttribute("aria-expanded", String(shouldExpand));
    section.hidden = !shouldExpand;
    button.textContent = shouldExpand ? "Ocultar contenido" : "Ver contenido";
    const moduleElement = button.closest(".module");
    if (moduleElement) {
        moduleElement.classList.toggle("module-open", shouldExpand);
    }
}

function runJavaScriptFromEditor(editorId) {
    const editor = editorId ? document.getElementById(editorId) : null;
    if (!editor) {
        showMessage("No se encontró el editor de código.");
        return;
    }
    const code = editor.value;
    const logs = [];
    const consoleProxy = {
        log: (...args) => logs.push(args.join(" ")),
        error: (...args) => logs.push(args.join(" ")),
        warn: (...args) => logs.push(args.join(" ")),
        info: (...args) => logs.push(args.join(" "))
    };

    try {
        const fn = new Function("console", code);
        const result = fn(consoleProxy);
        if (result !== undefined) {
            logs.push(String(result));
        }
        showMessage(logs.length ? logs.join("\n") : "Código ejecutado sin salida visible.");
    } catch (error) {
        showMessage(`Error al ejecutar: ${error.message}`);
    }
}

function resetEditor(editorId, defaultValue) {
    const editor = editorId ? document.getElementById(editorId) : null;
    if (!editor) {
        showMessage("No se encontró el editor para restablecer.");
        return;
    }
    const original = decodeData(defaultValue);
    editor.value = original;
    showMessage("Editor restablecido al contenido original.");
}

function handleCopy(target) {
    let textToCopy = "";
    if (target.dataset.editor) {
        const editor = document.getElementById(target.dataset.editor);
        textToCopy = editor ? editor.value : "";
    } else if (target.dataset.code) {
        textToCopy = decodeData(target.dataset.code);
    }

    if (!textToCopy) {
        showMessage("No hay contenido para copiar.");
        return;
    }

    copyToClipboard(textToCopy)
        .then(() => showMessage("Código copiado al portapapeles."))
        .catch(() => showMessage("No se pudo copiar el código automáticamente."));
}

function copyToClipboard(text) {
    if (navigator.clipboard?.writeText) {
        return navigator.clipboard.writeText(text);
    }

    return new Promise((resolve, reject) => {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "absolute";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        try {
            const success = document.execCommand("copy");
            document.body.removeChild(textarea);
            success ? resolve() : reject(new Error("No se pudo copiar"));
        } catch (error) {
            document.body.removeChild(textarea);
            reject(error);
        }
    });
}

function toggleModuleCompletion(moduleId, button) {
    if (!moduleId) {
        return;
    }

    const moduleElement = content.querySelector(`[data-module='${moduleId}']`);
    if (progress.has(moduleId)) {
        progress.delete(moduleId);
        button.textContent = "Marcar como completado";
        if (moduleElement) {
            moduleElement.classList.remove("module-completed");
            const status = moduleElement.querySelector(".module-status");
            if (status) {
                status.textContent = "Pendiente";
            }
        }
    } else {
        progress.add(moduleId);
        button.textContent = "Marcar como pendiente";
        if (moduleElement) {
            moduleElement.classList.add("module-completed");
            const status = moduleElement.querySelector(".module-status");
            if (status) {
                status.textContent = "Completado";
            }
        }
    }

    persistProgress();
    updateProgressSummary(courses[currentLang]?.modulos.length ?? 0);
}

function updateNavState() {
    nav.querySelectorAll("button[data-lang]").forEach((button) => {
        const isActive = button.dataset.lang === currentLang;
        button.classList.toggle("active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
    });
}

function updateProgressSummary(totalModules = 0) {
    if (!currentLang || !courses[currentLang]) {
        progressSummary.textContent = "Tu progreso aparecerá aquí.";
        return;
    }

    const completed = [...progress].filter((item) => item.startsWith(`${currentLang}-`)).length;
    progressSummary.textContent = `Progreso en ${courses[currentLang].titulo}: ${completed} de ${totalModules} módulos completados.`;
}

function persistProgress() {
    setStorageItem(STORAGE_KEYS.progress, JSON.stringify([...progress]));
}

function loadProgress() {
    try {
        const stored = getStorageItem(STORAGE_KEYS.progress);
        if (!stored) {
            return [];
        }
        const parsed = JSON.parse(stored);
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        console.error("No se pudo cargar el progreso almacenado", error);
        return [];
    }
}

function showMessage(message) {
    output.textContent = message;
}

function encodeData(value) {
    return encodeURIComponent(value);
}

function decodeData(value) {
    return value ? decodeURIComponent(value) : "";
}

function getStorageItem(key) {
    try {
        return localStorage.getItem(key);
    } catch (error) {
        console.warn("No se pudo acceder a localStorage", error);
        return null;
    }
}

function setStorageItem(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch (error) {
        console.warn("No se pudo guardar en localStorage", error);
    }
}

function escapeHtml(text) {
    const value = text ?? "";
    const map = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    };
    return String(value).replace(/[&<>"']/g, (char) => map[char] ?? char);
}

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("service-worker.js").catch((error) => {
            console.warn("No se pudo registrar el Service Worker", error);
        });
    });
}
