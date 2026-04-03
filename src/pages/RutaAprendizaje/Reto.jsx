import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { marcarLeccionCompletada, actualizarProgreso } from "../../services/progreso";
import { crearLogro, NOMBRES_LOGROS, DESCRIPCIONES_LOGROS } from "../../services/logros";

// CONTENIDO DE CADA RETO
const retosData = {
  1: {
    titulo: "RETO 1: LETRAS",
    respuestasCorrectas: ["B", "C", "A"],
    lecciones: [
      {
        pregunta: "¿Cuál letra es esta seña?",
        opciones: ["la letra J", "la letra B", "la letra F"],
        imagen: new URL(
          "../../assets/images/retos/reto1/leccion1.png",
          import.meta.url
        ).href,
      },
      {
        pregunta: "¿Cuál letra es esta seña?",
        opciones: ["la letra A", "la letra V", "la letra D"],
        imagen: new URL(
          "../../assets/images/retos/reto1/leccion2.png",
          import.meta.url
        ).href,
      },
      {
        pregunta: "¿Cuál letra es esta seña?",
        opciones: ["la letra K", "la letra E", "la letra Y"],
        imagen: new URL(
          "../../assets/images/retos/reto1/leccion3.png",
          import.meta.url
        ).href,
      },
    ],
  },

  2: {
    titulo: "RETO 2: SALUDO/CORDIALIDAD",
    respuestasCorrectas: ["A", "A", "B"],
    lecciones: [
      {
        pregunta: "¿Cuál palabra es esta seña?",
        opciones: ["Hola", "Gracias", "Adiós"],
        imagen: new URL(
          "../../assets/images/retos/reto2/leccion1.png",
          import.meta.url
        ).href,
      },
      {
        pregunta: "¿Cuál palabra es esta seña?",
        opciones: ["Sí", "No", "Tal vez"],
        imagen: new URL(
          "../../assets/images/retos/reto2/leccion2.png",
          import.meta.url
        ).href,
      },
      {
        pregunta: "¿Cuál palabra es esta seña?",
        opciones: ["De nada", "Gracias", "Regular"],
        imagen: new URL(
          "../../assets/images/retos/reto2/leccion3.png",
          import.meta.url
        ).href,
      },
    ],
  },

  3: {
    titulo: "RETO 3: COLORES",
    respuestasCorrectas: ["B", "C", "C"],
    lecciones: [
      {
        pregunta: "¿Qué color representa esta seña?",
        opciones: ["Rojo", "Azul", "Verde"],
        imagen: new URL(
          "../../assets/images/retos/reto3/leccion1.png",
          import.meta.url
        ).href,
      },
      {
        pregunta: "¿Qué color representa esta seña?",
        opciones: ["Negro", "Blanco", "Amarillo"],
        imagen: new URL(
          "../../assets/images/retos/reto3/leccion2.png",
          import.meta.url
        ).href,
      },
      {
        pregunta: "¿Qué color representa esta seña?",
        opciones: ["Rosado", "Naranja", "Morado"],
        imagen: new URL(
          "../../assets/images/retos/reto3/leccion3.png",
          import.meta.url
        ).href,
      },
    ],
  },

  4: {
    titulo: "RETO 4: FAMILIA",
    respuestasCorrectas: ["A", "C", "B"],
    lecciones: [
      {
        pregunta: "¿Qué miembro de la familia representa esta seña?",
        opciones: ["Mamá", "Primo", "Tia"],
        imagen: new URL(
          "../../assets/images/retos/reto4/leccion1.png",
          import.meta.url
        ).href,
      },
      {
        pregunta: "¿Qué representa esta seña?",
        opciones: ["Persona", "Niño", "Familia"],
        imagen: new URL(
          "../../assets/images/retos/reto4/leccion2.png",
          import.meta.url
        ).href,
      },
      {
        pregunta: "¿Qué representa esta seña?",
        opciones: ["Persona", "Bebé", "Papá"],
        imagen: new URL(
          "../../assets/images/retos/reto4/leccion3.png",
          import.meta.url
        ).href,
      },
    ],
  },

  5: {
    titulo: "RETO 5: COMIDAS Y BEBIDAS",
    respuestasCorrectas: ["C", "B", "A"],
    lecciones: [
      {
        pregunta: "¿Qué comida representa esta seña?",
        opciones: ["Lechuga", "Chocolate", "Manzana"],
        imagen: new URL(
          "../../assets/images/retos/reto5/leccion1.png",
          import.meta.url
        ).href,
      },
      {
        pregunta: "¿Qué bebida representa esta seña?",
        opciones: ["Aceite", "Agua", "Jugo"],
        imagen: new URL(
          "../../assets/images/retos/reto5/leccion2.png",
          import.meta.url
        ).href,
      },
      {
        pregunta: "¿Qué representa la siguiete seña?",
        opciones: ["Hambre", "Comida", "Sed"],
        imagen: new URL(
          "../../assets/images/retos/reto5/leccion3.png",
          import.meta.url
        ).href,
      },
    ],
  },

  6: {
    titulo: "RETO 6: ROPA",
    respuestasCorrectas: ["A", "C", "C"],
    lecciones: [
      {
        pregunta: "¿Cuál de estas señas representa la palabra camisa?",
        opciones: [
          new URL("../../assets/images/retos/reto6/opcionA1.png", import.meta.url).href,
          new URL("../../assets/images/retos/reto6/opcionB1.png", import.meta.url).href,
          new URL("../../assets/images/retos/reto6/opcionC1.png", import.meta.url).href,
        ],
        imagen: null,
      },
      {
        pregunta: "¿Qué representa esta seña?",
        opciones: ["Pantalón", "Bunfanda", "Gorra"],
        imagen: new URL(
          "../../assets/images/retos/reto6/leccion2.png",
          import.meta.url
        ).href,
      },
      {
        pregunta: "¿Cuál de estas señas representa zapato?",
        opciones: [
          new URL("../../assets/images/retos/reto6/opcionA3.png", import.meta.url).href,
          new URL("../../assets/images/retos/reto6/opcionB3.png", import.meta.url).href,
          new URL("../../assets/images/retos/reto6/opcionC3.png", import.meta.url).href,
        ],
        imagen: null,
      },
    ],
  },

  7: {
    titulo: "RETO 7: CASA",
    respuestasCorrectas: ["B", "C", "B"],
    lecciones: [
      {
        pregunta: "¿Cuál de estas señas representa la palabra ventana?",
        opciones: [
          new URL("../../assets/images/retos/reto7/opcionA1.png", import.meta.url).href,
          new URL("../../assets/images/retos/reto7/opcionB1.png", import.meta.url).href,
          new URL("../../assets/images/retos/reto7/opcionC1.png", import.meta.url).href,
        ],
        imagen: null,
      },
      {
        pregunta: "¿Qué habitación representa esta seña?",
        opciones: ["Baño", "Dormitorio", "Cocina"],
        imagen: new URL(
          "../../assets/images/retos/reto7/leccion2.png",
          import.meta.url
        ).href,
      },
      {
        pregunta: "¿Cuál seña representa la palabra nevera?",
        opciones: [
          new URL("../../assets/images/retos/reto7/opcionA3.png", import.meta.url).href,
          new URL("../../assets/images/retos/reto7/opcionB3.png", import.meta.url).href,
          new URL("../../assets/images/retos/reto7/opcionC3.png", import.meta.url).href,
        ],
        imagen: null,
      },
    ],
  },

  8: {
    titulo: "RETO 8: COLEGIO",
    respuestasCorrectas: ["C", "A", "A"],
    lecciones: [
      {
        pregunta: "¿Qué palabra representa esta seña?'",
        opciones: ["Lapiz", "Hoja", "Pintura"],
        imagen: new URL(
          "../../assets/images/retos/reto8/leccion1.png",
          import.meta.url
        ).href,
      },
      {
        pregunta: "¿Cuál de estas señas representa la palabra libro?",
        opciones: [
          new URL("../../assets/images/retos/reto8/opcionA2.png", import.meta.url).href,
          new URL("../../assets/images/retos/reto8/opcionB2.png", import.meta.url).href,
          new URL("../../assets/images/retos/reto8/opcionC2.png", import.meta.url).href,
        ],
        imagen: null,
      },
      {
        pregunta: "¿Cuál de estas señas representa la palabra pequeño?",
        opciones: [
          new URL("../../assets/images/retos/reto8/opcionA3.png", import.meta.url).href,
          new URL("../../assets/images/retos/reto8/opcionB3.png", import.meta.url).href,
          new URL("../../assets/images/retos/reto8/opcionC3.png", import.meta.url).href,
        ],
        imagen: null,
      },
    ],
  },

  9: {
    titulo: "RETO 9: CIUDAD",
    respuestasCorrectas: ["A", "C", "B"],
    lecciones: [
      {
        pregunta: "¿Cuál seña representa la palabra biblioteca?",
        opciones: [
          new URL("../../assets/images/retos/reto9/opcionA1.png", import.meta.url).href,
          new URL("../../assets/images/retos/reto9/opcionB1.png", import.meta.url).href,
          new URL("../../assets/images/retos/reto9/opcionC1.png", import.meta.url).href,
        ],
        imagen: null,
      },
      {
        pregunta: "Qué palabra representa esta seña?",
        opciones: ["Banco", "Calle", "SuperMercado"],
        imagen: new URL(
          "../../assets/images/retos/reto9/leccion2.png",
          import.meta.url
        ).href,
      },
      {
        pregunta: "¿Cuál de estas señas representa la palabra moto?",
        opciones: [
          new URL("../../assets/images/retos/reto9/opcionA3.png", import.meta.url).href,
          new URL("../../assets/images/retos/reto9/opcionB3.png", import.meta.url).href,
          new URL("../../assets/images/retos/reto9/opcionC3.png", import.meta.url).href,
        ],
        imagen: null,
      },
    ],
  },

  10: {
    titulo: "RETO 10: CALENDARIO",
    respuestasCorrectas: ["B", "B", "C"],
    lecciones: [
      {
        pregunta: "¿Qué palabra representa esta seña?'",
        opciones: ["Hoy", "Mañana", "Ayer"],
        imagen: new URL(
          "../../assets/images/retos/reto10/leccion1.png",
          import.meta.url
        ).href,
      },
      {
        pregunta: "¿Cuál seña representa el día jueves?",
        opciones: [
          new URL("../../assets/images/retos/reto10/opcionA2.png", import.meta.url).href,
          new URL("../../assets/images/retos/reto10/opcionB2.png", import.meta.url).href,
          new URL("../../assets/images/retos/reto10/opcionC2.png", import.meta.url).href,
        ],
        imagen: null,
      },
      {
        pregunta: "¿Cuál seña representa la palabra febrero?",
        opciones: [
          new URL("../../assets/images/retos/reto10/opcionA3.png", import.meta.url).href,
          new URL("../../assets/images/retos/reto10/opcionB3.png", import.meta.url).href,
          new URL("../../assets/images/retos/reto10/opcionC3.png", import.meta.url).href,
        ],
        imagen: null,
      },
    ],
  },
};

export default function Reto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const reto = retosData[id];

  const [respuestas, setRespuestas] = useState({});
  const [resultado, setResultado] = useState("");
  const [cargando, setCargando] = useState(false);

  if (!reto) return <p className="p-8">Reto no encontrado</p>;

  const manejarCambio = (leccionIndex, opcionIndex) => {
    const letra = ["A", "B", "C"][opcionIndex];
    setRespuestas({ ...respuestas, [leccionIndex]: letra });
  };

  const finalizarReto = async () => {
    let errores = 0;

    reto.respuestasCorrectas.forEach((correcta, index) => {
      if (respuestas[index] !== correcta) errores++;
    });

    if (errores === 0) {
      // Guardar en backend
      setCargando(true);
      try {
        console.log("=== INICIANDO GUARDADO DE PROGRESO ===");

        // Marcar cada lección como completada
        for (let i = 0; i < reto.lecciones.length; i++) {
          console.log(`Marcando lección ${i + 1} del reto ${id}...`);
          await marcarLeccionCompletada(parseInt(id), i + 1);
        }

        // Actualizar reto actual
        const siguienteReto = parseInt(id) + 1;
        if (siguienteReto <= 10) {
          console.log(`Actualizando progreso: siguiente reto = ${siguienteReto}`);
          await actualizarProgreso(siguienteReto, 1);
        }
        console.log("✓ Progreso guardado exitosamente");

        // ==================== CREAR LOGROS ====================
        let logrosGanados = [];

        // Logro: Cada lección completada (una por cada pregunta del reto)
        const leccionesDelReto = {
          1: [NOMBRES_LOGROS.LECCION_1_1, NOMBRES_LOGROS.LECCION_1_2, NOMBRES_LOGROS.LECCION_1_3],
          2: [NOMBRES_LOGROS.LECCION_2_1, NOMBRES_LOGROS.LECCION_2_2, NOMBRES_LOGROS.LECCION_2_3],
          3: [NOMBRES_LOGROS.LECCION_3_1, NOMBRES_LOGROS.LECCION_3_2, NOMBRES_LOGROS.LECCION_3_3],
          4: [NOMBRES_LOGROS.LECCION_4_1, NOMBRES_LOGROS.LECCION_4_2, NOMBRES_LOGROS.LECCION_4_3],
          5: [NOMBRES_LOGROS.LECCION_5_1, NOMBRES_LOGROS.LECCION_5_2, NOMBRES_LOGROS.LECCION_5_3],
          6: [NOMBRES_LOGROS.LECCION_6_1, NOMBRES_LOGROS.LECCION_6_2, NOMBRES_LOGROS.LECCION_6_3],
          7: [NOMBRES_LOGROS.LECCION_7_1, NOMBRES_LOGROS.LECCION_7_2, NOMBRES_LOGROS.LECCION_7_3],
          8: [NOMBRES_LOGROS.LECCION_8_1, NOMBRES_LOGROS.LECCION_8_2, NOMBRES_LOGROS.LECCION_8_3],
          9: [NOMBRES_LOGROS.LECCION_9_1, NOMBRES_LOGROS.LECCION_9_2, NOMBRES_LOGROS.LECCION_9_3],
          10: [NOMBRES_LOGROS.LECCION_10_1, NOMBRES_LOGROS.LECCION_10_2, NOMBRES_LOGROS.LECCION_10_3],
        };

        const leccionesKeys = leccionesDelReto[parseInt(id)] || [];
        for (let i = 0; i < leccionesKeys.length; i++) {
          try {
            await crearLogro(
              leccionesKeys[i],
              DESCRIPCIONES_LOGROS[leccionesKeys[i]]
            );
            logrosGanados.push(`Lección ${i + 1}`);
          } catch {
            // Ya tiene este logro, no hacer nada
          }
        }

        // Logro: Primera lección completada (solo una vez)
        try {
          await crearLogro(
            NOMBRES_LOGROS.PRIMERA_LECCION,
            DESCRIPCIONES_LOGROS[NOMBRES_LOGROS.PRIMERA_LECCION]
          );
          // Solo agregar si no existe ya en logrosGanados
          if (!logrosGanados.includes("Primera Lección")) {
            logrosGanados.push("Primera Lección");
          }
        } catch {
          // Ya tiene este logro, no hacer nada
        }

        // Logro: Reto completado
        const logroRetoKey = `RETO_${id}_COMPLETADO`;
        if (NOMBRES_LOGROS[logroRetoKey]) {
          try {
            await crearLogro(
              NOMBRES_LOGROS[logroRetoKey],
              DESCRIPCIONES_LOGROS[NOMBRES_LOGROS[logroRetoKey]]
            );
            logrosGanados.push(`Reto ${id} Completado`);
          } catch {
            // Ya tiene este logro
          }
        }

        // Mostrar resultado con logros
        if (logrosGanados.length > 0) {
          setResultado(`✅ ¡Felicidades! Ganaste: ${logrosGanados.join(" + ")}!`);
        } else {
          setResultado("✅ Todas las respuestas son correctas. Progreso guardado!");
        }

        setTimeout(() => navigate("/ruta/retos"), 2000);
      } catch (error) {
        console.error("❌ ERROR AL GUARDAR PROGRESO:", error);
        // Mostrar el error real al usuario
        setResultado(`❌ Error: ${error.message}`);
        setTimeout(() => { }, 3000);
      } finally {
        setCargando(false);
      }
    } else {
      setResultado(
        `❌ No se desbloqueó el siguiente reto. Respuestas incorrectas: ${errores}`
      );
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto space-y-6">

      {/* BOTÓN VOLVER */}
      <button
        onClick={() => navigate("/ruta/retos")}
        className="flex items-center gap-2 bg-gradient-to-r from-primary to-blue-600 text-white px-5 py-2.5 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="font-medium">Volver a retos</span>
      </button>

      <h2 className="text-3xl font-bold text-primary text-center mb-6">{reto.titulo}</h2>

      {reto.lecciones.map((leccion, index) => (
        <div key={index} className="bg-white p-4 md:p-6 rounded-xl shadow-md border border-gray-100">
          <h3 className="font-semibold mb-4 text-lg text-primary flex items-center gap-2">
            <span className="bg-primary/10 px-3 py-1 rounded-full text-sm">Lección {index + 1}</span>
          </h3>

          {leccion.imagen && (
            <img
              src={leccion.imagen}
              alt={`Seña reto ${id} lección ${index + 1}`}
              className="h-32 md:h-40 mx-auto mb-4 object-contain"
            />
          )}

          <p className="mb-4 text-gray-700 font-medium">{leccion.pregunta}</p>

          {leccion.opciones.map((opcion, opcionIndex) => (
            <label 
              key={opcionIndex} 
              className={`block mb-3 p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                respuestas[index] === opcionIndex 
                  ? 'border-primary bg-primary/5 shadow-md' 
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <input
                type="radio"
                name={`leccion-${index}`}
                onChange={() => manejarCambio(index, opcionIndex)}
                className="mr-3 w-4 h-4 accent-primary"
              />

              {typeof opcion === "string" && opcion.includes("assets/images") ? (
                <img
                  src={opcion}
                  alt="opción"
                  className="h-20 mt-2 object-contain"
                />
              ) : (
                <span className={`ml-2 font-medium ${respuestas[index] === opcionIndex ? 'text-primary' : 'text-gray-700'}`}>{opcion}</span>
              )}
            </label>
          ))}
        </div>
      ))}

      <button
        onClick={finalizarReto}
        disabled={cargando}
        className={`w-full bg-gradient-to-r from-primary to-blue-600 text-white font-semibold px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg ${cargando ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {cargando ? 'Guardando...' : 'Finalizar reto'}
      </button>

      {resultado && (
        <div className={`mt-6 p-4 rounded-xl text-center font-semibold ${
          resultado.includes('felicitaciones') || resultado.includes('¡Excelente') || resultado.includes('¡Bien')
            ? 'bg-green-100 text-green-700 border border-green-300'
            : 'bg-amber-100 text-amber-700 border border-amber-300'
        }`}>
          {resultado}
        </div>
      )}
    </div>
  );
}






