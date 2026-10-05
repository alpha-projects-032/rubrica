/* ==========================================
   CONFIGURACIÓN DE LA RÚBRICA
========================================== */

/*
La rúbrica original establece los niveles:

Excelente
Satisfactorio
En proceso
Insuficiente

Pero no establece cuánto vale numéricamente
cada nivel dentro de cada criterio.

Para automatizar la nota se utilizará:

Excelente       = 100 %
Satisfactorio   = 80 %
En proceso      = 60 %
Insuficiente    = 0 %
*/

const niveles = {

    excelente: 1.00,
    satisfactorio: 0.80,
    proceso: 0.60,
    insuficiente: 0.00

};


/* ==========================================
   CRITERIOS Y PONDERACIONES
========================================== */

const criterios = [

    {
        id: "analisis",
        nombre: "Análisis: entradas, proceso y salidas",
        valor: 1.5
    },

    {
        id: "logica",
        nombre: "Lógica y secuencia del algoritmo",
        valor: 2.5
    },

    {
        id: "control",
        nombre: "Estructuras de control",
        valor: 2.0
    },

    {
        id: "variables",
        nombre: "Variables, operadores y fórmulas",
        valor: 1.5
    },

    {
        id: "claridad",
        nombre: "Claridad del pseudocódigo",
        valor: 1.0
    },

    {
        id: "prueba",
        nombre: "Prueba de escritorio y validación",
        valor: 1.0
    },

    {
        id: "presentacion",
        nombre: "Presentación y cumplimiento",
        valor: 0.5
    }

];


/* ==========================================
   CALCULAR NOTA
========================================== */

function calcularNota() {

    let notaTotal = 0;
    let evaluacionCompleta = true;


    criterios.forEach(function (criterio) {

        const select = document.getElementById(
            "nivel-" + criterio.id
        );

        const campoPuntaje = document.getElementById(
            "puntaje-" + criterio.id
        );


        const nivelSeleccionado = select.value;


        if (nivelSeleccionado === "") {

            evaluacionCompleta = false;

            campoPuntaje.textContent = "0.00";

            return;

        }


        const porcentaje =
            niveles[nivelSeleccionado];


        const puntaje =
            criterio.valor * porcentaje;


        campoPuntaje.textContent =
            puntaje.toFixed(2);


        notaTotal += puntaje;

    });


    notaTotal =
        Math.round(notaTotal * 100) / 100;


    document.getElementById(
        "nota-final"
    ).textContent =
        notaTotal.toFixed(2) + " / 10";


    const nivelGlobal =
        obtenerNivelGlobal(notaTotal);


    document.getElementById(
        "nivel-global"
    ).textContent =
        nivelGlobal;


    return {

        nota: notaTotal,

        nivel: nivelGlobal,

        completa: evaluacionCompleta

    };

}


/* ==========================================
   NIVEL GLOBAL
========================================== */

function obtenerNivelGlobal(nota) {

    if (nota >= 9) {

        return "Excelente";

    }

    else if (nota >= 7) {

        return "Satisfactorio";

    }

    else if (nota >= 5) {

        return "En proceso";

    }

    else {

        return "Insuficiente";

    }

}


/* ==========================================
   CALCULAR AUTOMÁTICAMENTE
========================================== */

criterios.forEach(function (criterio) {

    const select = document.getElementById(
        "nivel-" + criterio.id
    );


    select.addEventListener(
        "change",
        calcularNota
    );

});


/* ==========================================
   BOTÓN CALCULAR
========================================== */

document.getElementById(
    "btn-calcular"
).addEventListener(
    "click",
    calcularNota
);


/* ==========================================
   FECHA AUTOMÁTICA
========================================== */

function colocarFechaActual() {

    const fecha = document.getElementById("fecha");


    const hoy = new Date();


    const año =
        hoy.getFullYear();


    const mes =
        String(
            hoy.getMonth() + 1
        ).padStart(2, "0");


    const dia =
        String(
            hoy.getDate()
        ).padStart(2, "0");


    fecha.value =
        año + "-" + mes + "-" + dia;

}


colocarFechaActual();


/* ==========================================
   VALIDAR DATOS
========================================== */

function validarFormulario() {

    const nombre =
        document
            .getElementById("nombre")
            .value
            .trim();


    const apellido =
        document
            .getElementById("apellido")
            .value
            .trim();


    const ejercicio =
        document
            .getElementById("ejercicio")
            .value;


    if (nombre === "") {

        alert(
            "Ingrese el nombre del estudiante."
        );

        return false;

    }


    if (apellido === "") {

        alert(
            "Ingrese el apellido del estudiante."
        );

        return false;

    }


    if (ejercicio === "") {

        alert(
            "Seleccione el ejercicio evaluado."
        );

        return false;

    }


    for (const criterio of criterios) {

        const nivel =
            document.getElementById(
                "nivel-" + criterio.id
            ).value;


        if (nivel === "") {

            alert(
                "Debe evaluar todos los criterios de la rúbrica."
            );

            return false;

        }

    }


    return true;

}


/* ==========================================
   NUEVA EVALUACIÓN
========================================== */

document.getElementById(
    "btn-limpiar"
).addEventListener(
    "click",
    function () {

        const confirmar =
            confirm(
                "¿Desea iniciar una nueva evaluación?"
            );


        if (!confirmar) {

            return;

        }


        document.getElementById(
            "nombre"
        ).value = "";


        document.getElementById(
            "apellido"
        ).value = "";


        document.getElementById(
            "ejercicio"
        ).value = "";


        document.getElementById(
            "observaciones-generales"
        ).value = "";


        criterios.forEach(
            function (criterio) {

                document.getElementById(
                    "nivel-" + criterio.id
                ).value = "";


                document.getElementById(
                    "puntaje-" + criterio.id
                ).textContent = "0.00";


                document.getElementById(
                    "observacion-" + criterio.id
                ).value = "";

            }
        );


        document.getElementById(
            "nota-final"
        ).textContent =
            "0.00 / 10";


        document.getElementById(
            "nivel-global"
        ).textContent =
            "Sin evaluar";


        colocarFechaActual();


        document.getElementById(
            "nombre"
        ).focus();

    }
);


/* ==========================================
   OBTENER TEXTO DEL EJERCICIO
========================================== */

function obtenerEjercicioSeleccionado() {

    const select =
        document.getElementById(
            "ejercicio"
        );


    return select.options[
        select.selectedIndex
    ].text;

}


/* ==========================================
   FORMATEAR FECHA
========================================== */

function formatearFecha(fecha) {

    if (!fecha) {

        return "";

    }


    const partes =
        fecha.split("-");


    return (
        partes[2] +
        "/" +
        partes[1] +
        "/" +
        partes[0]
    );

}


/* ==========================================
   GENERAR TABLA PARA PDF
========================================== */

function generarFilasPDF() {

    let filas = "";


    criterios.forEach(
        function (criterio) {

            const select =
                document.getElementById(
                    "nivel-" + criterio.id
                );


            const nivel =
                select.options[
                    select.selectedIndex
                ].text;


            const puntaje =
                document.getElementById(
                    "puntaje-" + criterio.id
                ).textContent;


            const observacion =
                document.getElementById(
                    "observacion-" + criterio.id
                ).value || "-";


            filas += `

                <tr>

                    <td>
                        ${criterio.nombre}
                    </td>

                    <td>
                        ${criterio.valor.toFixed(1)}
                    </td>

                    <td>
                        ${nivel}
                    </td>

                    <td>
                        ${puntaje}
                    </td>

                    <td>
                        ${escaparHTML(observacion)}
                    </td>

                </tr>

            `;

        }
    );


    return filas;

}


/* ==========================================
   CREAR CONTENIDO DEL PDF
========================================== */

function crearReportePDF() {

    const resultado =
        calcularNota();


    const nombre =
        document.getElementById(
            "nombre"
        ).value;


    const apellido =
        document.getElementById(
            "apellido"
        ).value;


    const fecha =
        document.getElementById(
            "fecha"
        ).value;


    const ejercicio =
        obtenerEjercicioSeleccionado();


    const observaciones =
        document.getElementById(
            "observaciones-generales"
        ).value || "Sin observaciones.";


    const reporte =
        document.createElement("div");


    reporte.id =
        "reporte-pdf";


    reporte.innerHTML = `

        <div style="
            font-family: Arial, sans-serif;
            color: #1f2937;
            padding: 25px;
        ">

            <div style="
                text-align: center;
                border-bottom: 3px solid #173f6b;
                padding-bottom: 15px;
                margin-bottom: 20px;
            ">

                <h1 style="
                    color: #173f6b;
                    margin-bottom: 5px;
                    font-size: 24px;
                ">
                    Informe de Evaluación
                </h1>

                <p style="
                    margin: 0;
                    font-size: 15px;
                ">
                    Fundamentos de Programación
                </p>

                <p style="
                    margin: 4px 0 0;
                ">
                    Evaluación de ejercicios de pseudocódigo
                </p>

            </div>


            <table style="
                width: 100%;
                margin-bottom: 20px;
                border-collapse: collapse;
            ">

                <tr>

                    <td style="padding: 5px;">
                        <strong>
                            Estudiante:
                        </strong>
                    </td>

                    <td style="padding: 5px;">
                        ${escaparHTML(nombre)}
                        ${escaparHTML(apellido)}
                    </td>

                </tr>


                <tr>

                    <td style="padding: 5px;">
                        <strong>
                            Fecha:
                        </strong>
                    </td>

                    <td style="padding: 5px;">
                        ${formatearFecha(fecha)}
                    </td>

                </tr>

            </table>


            <p>

                <strong>
                    Ejercicio evaluado:
                </strong>

                ${escaparHTML(ejercicio)}

            </p>


            <table style="
                width: 100%;
                border-collapse: collapse;
                margin-top: 15px;
                font-size: 12px;
            ">

                <thead>

                    <tr style="
                        background-color: #173f6b;
                        color: white;
                    ">

                        <th style="
                            border: 1px solid #cccccc;
                            padding: 8px;
                        ">
                            Criterio
                        </th>

                        <th style="
                            border: 1px solid #cccccc;
                            padding: 8px;
                        ">
                            Valor
                        </th>

                        <th style="
                            border: 1px solid #cccccc;
                            padding: 8px;
                        ">
                            Nivel
                        </th>

                        <th style="
                            border: 1px solid #cccccc;
                            padding: 8px;
                        ">
                            Puntaje
                        </th>

                        <th style="
                            border: 1px solid #cccccc;
                            padding: 8px;
                        ">
                            Observación
                        </th>

                    </tr>

                </thead>

                <tbody>

                    ${generarFilasPDF()}

                </tbody>

            </table>


            <div style="
                margin-top: 25px;
                padding: 15px;
                background-color: #eef3f8;
                border-radius: 8px;
            ">

                <p style="
                    margin: 0 0 8px;
                    font-size: 18px;
                ">

                    <strong>
                        Nota final:
                    </strong>

                    ${resultado.nota.toFixed(2)} / 10

                </p>


                <p style="
                    margin: 0;
                    font-size: 18px;
                ">

                    <strong>
                        Nivel de desempeño:
                    </strong>

                    ${resultado.nivel}

                </p>

            </div>


            <div style="
                margin-top: 20px;
            ">

                <h3 style="
                    color: #173f6b;
                ">
                    Observaciones generales
                </h3>

                <p style="
                    border: 1px solid #cccccc;
                    padding: 12px;
                    min-height: 70px;
                ">

                    ${escaparHTML(observaciones)}

                </p>

            </div>


            <div style="
                width: 220px;
                margin-top: 70px;
                text-align: center;
            ">

                <div style="
                    border-top: 1px solid black;
                ">
                </div>

                <p>
                    Firma del docente
                </p>

            </div>

        </div>

    `;


    return reporte;

}


/* ==========================================
   CARGAR LIBRERÍAS PARA EL PDF
========================================== */

function cargarHTML2PDF() {

    if (
        window.html2canvas &&
        window.jspdf &&
        window.jspdf.jsPDF
    ) {

        return Promise.resolve();

    }


    const librerias = [
        "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"
    ];


    return Promise.all(
        librerias.map(
            function (direccion) {

                return new Promise(
                    function (resolve, reject) {

                        const script =
                            document.createElement(
                                "script"
                            );


                        script.src = direccion;


                        script.onload = resolve;


                        script.onerror =
                            function () {

                                reject(
                                    new Error(
                                        "No se pudieron cargar las librerías del PDF."
                                    )
                                );

                            };


                        document.head.appendChild(
                            script
                        );

                    }
                );

            }
        )
    );

}


/* ==========================================
   GENERAR PDF
========================================== */

document.getElementById(
    "btn-pdf"
).addEventListener(
    "click",
    async function () {


        if (!validarFormulario()) {

            return;

        }


        calcularNota();


        const reporte =
            crearReportePDF();


        reporte.style.width =
            "190mm";


        reporte.style.backgroundColor =
            "white";


        /*
        El reporte se muestra temporalmente sobre la página.
        html2canvas necesita que el elemento esté visible y
        ya renderizado para poder capturar su contenido.
        */

        reporte.style.position =
            "absolute";


        reporte.style.left =
            "0";


        reporte.style.top =
            window.scrollY + "px";


        reporte.style.zIndex =
            "2147483647";


        reporte.style.pointerEvents =
            "none";


        document.body.appendChild(
            reporte
        );


        try {


            await cargarHTML2PDF();


            /*
            Esperar dos ciclos de pintado garantiza que el
            contenido exista en pantalla antes de capturarlo.
            */

            await new Promise(
                function (resolve) {

                    requestAnimationFrame(
                        function () {

                            requestAnimationFrame(resolve);

                        }
                    );

                }
            );


            const nombre =
                document.getElementById(
                    "nombre"
                ).value.trim();


            const apellido =
                document.getElementById(
                    "apellido"
                ).value.trim();


            const nombreArchivo =

                "Evaluacion_" +

                limpiarNombreArchivo(
                    apellido
                ) +

                "_" +

                limpiarNombreArchivo(
                    nombre
                ) +

                ".pdf";


            const canvas =
                await window.html2canvas(
                    reporte,
                    {
                        scale: 2,
                        useCORS: true,
                        backgroundColor: "#ffffff",
                        logging: false,
                        windowWidth:
                            reporte.scrollWidth,
                        windowHeight:
                            reporte.scrollHeight
                    }
                );


            if (!canvas.width || !canvas.height) {

                throw new Error(
                    "La captura del reporte está vacía."
                );

            }


            const imagen =
                canvas.toDataURL(
                    "image/jpeg",
                    0.98
                );


            const PDF =
                window.jspdf.jsPDF;


            const pdf =
                new PDF(
                    "portrait",
                    "mm",
                    "a4"
                );


            const margen = 10;
            const anchoPagina = 210;
            const altoPagina = 297;
            const anchoImagen =
                anchoPagina - margen * 2;
            const altoDisponible =
                altoPagina - margen * 2;
            const altoImagen =
                canvas.height *
                anchoImagen /
                canvas.width;


            let altoRestante =
                altoImagen;


            let posicionVertical =
                margen;


            pdf.addImage(
                imagen,
                "JPEG",
                margen,
                posicionVertical,
                anchoImagen,
                altoImagen
            );


            altoRestante -=
                altoDisponible;


            while (altoRestante > 0) {

                posicionVertical =
                    margen -
                    (altoImagen - altoRestante);


                pdf.addPage();


                pdf.addImage(
                    imagen,
                    "JPEG",
                    margen,
                    posicionVertical,
                    anchoImagen,
                    altoImagen
                );


                altoRestante -=
                    altoDisponible;

            }


            pdf.save(nombreArchivo);


        }

        catch (error) {


            console.error(
                error
            );


            alert(
                "No fue posible generar el PDF automáticamente."
            );


        }

        finally {


            reporte.remove();


        }

    }
);


/* ==========================================
   LIMPIAR NOMBRE DEL ARCHIVO
========================================== */

function limpiarNombreArchivo(texto) {

    return texto

        .normalize("NFD")

        .replace(
            /[\u0300-\u036f]/g,
            ""
        )

        .replace(
            /[^a-zA-Z0-9]/g,
            "-"
        )

        .replace(
            /-+/g,
            "-"
        );

}


/* ==========================================
   EVITAR HTML EN OBSERVACIONES
========================================== */

function escaparHTML(texto) {

    return String(texto)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}
