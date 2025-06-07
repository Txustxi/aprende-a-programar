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
            },
            {
                titulo: "Funciones",
                teoria: "Definición y llamada de funciones simples.",
                codigo: "def saluda(nombre):\n    return f'Hola {nombre}'"
            },
            {
                titulo: "Diccionarios",
                teoria: "Almacena pares clave-valor y recórralos.",
                codigo: "edades = {'Ana':30,'Luis':25}\nprint(edades['Ana'])"
            },
            {
                titulo: "Programación Orientada a Objetos",
                teoria: "Crea clases y objetos básicos en Python.",
                codigo: "class Persona:\n    def __init__(self,n):\n        self.nombre=n\np=Persona('Ana')\nprint(p.nombre)"
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
            },
            {
                titulo: "Funciones",
                teoria: "Funciones y paso de parámetros.",
                codigo: "function suma(a,b){return a+b;}\nconsole.log(suma(2,3));"
            },
            {
                titulo: "DOM",
                teoria: "Manipulación básica del DOM.",
                codigo: "document.body.style.background='lightblue';"
            },
            {
                titulo: "Promesas",
                teoria: "Manejo de operaciones asíncronas con Promesas.",
                codigo: "Promise.resolve('Listo').then(m=>console.log(m));"
            },
            {
                titulo: "Clases",
                teoria: "Sintaxis de clases en ES6.",
                codigo: "class Persona{constructor(n){this.nombre=n}}\nconsole.log(new Persona('Ana').nombre);"
            }
        ]
    },
    java: {
        titulo: "Java",
        modulos: [
            {
                titulo: "Introducción",
                teoria: "Sintaxis básica de Java y método main.",
                codigo: "public class Hola{public static void main(String[] args){System.out.println('Hola');}}"
            },
            {
                titulo: "Tipos de Datos",
                teoria: "Tipos primitivos y variables.",
                codigo: "int edad = 30;\ndouble precio = 9.99;"
            },
            {
                titulo: "Clases y Objetos",
                teoria: "Definición de clases y creación de objetos.",
                codigo: "class Persona{String n; Persona(String n){this.n=n;}}\nPersona p = new Persona('Ana');"
            }
        ]
    },
    cpp: {
        titulo: "C++",
        modulos: [
            {
                titulo: "Introducción",
                teoria: "Estructura básica de un programa en C++.",
                codigo: "#include<iostream>\nint main(){std::cout<<'Hola';return 0;}"
            },
            {
                titulo: "Control de Flujo",
                teoria: "Uso de condicionales y bucles.",
                codigo: "for(int i=0;i<3;i++){std::cout<<i;}"
            },
            {
                titulo: "Programación Orientada a Objetos",
                teoria: "Clases y objetos simples.",
                codigo: "class Persona{public:string nombre;};\nPersona p;\np.nombre='Ana';"
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
