import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { marcarLeccionCompletada, actualizarProgreso } from "../../services/progreso";
import { crearLogro, NOMBRES_LOGROS, DESCRIPCIONES_LOGROS } from "../../services/logros";

// CONTENIDO DE CADA RETO
const retosData = {
  1: {
    titulo: "Reto 1: LETRAS",
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
    titulo: "Reto 2: SALUDO/CORDIALIDAD",
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
    titulo: "Reto 3: COLORES",
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
        opciones: ["Morado", "Naranja", "Rosado"],
        imagen: new URL(
          "../../assets/images/retos/reto3/leccion3.png",
          import.meta.url
        ).href,
      },
    ],
  },

  4: {
    titulo: "Reto 4: FAMILIA",
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
    titulo: "Reto 5: COMIDAS Y BEBIDAS",
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
    titulo: "Reto 6: ROPA",
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
    titulo: "Reto 7: CASA",
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
    titulo: "Reto 8: COLEGIO",
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
    titulo: "Reto 9: CIUDAD",
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
    titulo: "Reto 10: CALENDARIO",
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
        pregunta: "¿Cuál seña representa la palabra verano?",
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
    <div className="p-4 md:p-8 space-y-6">

      {/* BOTÓN VOLVER */}
      <button
        onClick={() => navigate("/ruta/retos")}
        className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-xl shadow-sm hover:shadow-md hover:bg-gray-50 transition"
      >
        
        <span className="font-medium text-gray-700">Volver a retos</span>
      </button>
      <h2 className="text-2xl font-bold text-primary">{reto.titulo}</h2>

      {reto.lecciones.map((leccion, index) => (
        <div key={index} className="bg-white p-4 md:p-6 rounded-lg">
          <h3 className="font-semibold mb-2">Lección {index + 1}</h3>

          {leccion.imagen && (
            <img
              src={leccion.imagen}
              alt={`Seña reto ${id} lección ${index + 1}`}
              className="h-32 md:h-40 mx-auto mb-4 object-contain"
            />
          )}

          <p className="mb-2">{leccion.pregunta}</p>

          {leccion.opciones.map((opcion, opcionIndex) => (
            <label key={opcionIndex} className="block">
              <input
                type="radio"
                name={`leccion-${index}`}
                onChange={() => manejarCambio(index, opcionIndex)}
              />

              {typeof opcion === "string" && opcion.includes("assets/images") ? ( //cambio para lecciones com imagenes en las opciones
                <img
                  src={opcion}
                  alt="opción"
                  className="h-20 mt-2 object-contain"
                />
              ) : (
                <span className="ml-2">{opcion}</span>
              )}
            </label>
          ))}
        </div>
      ))}

      <button
        onClick={finalizarReto}
        disabled={cargando}
        className={`bg-primary text-white px-6 py-2 rounded-lg ${cargando ? 'opacity-50 cursor-not-allowed' : ''
          }`}
      >
        {cargando ? 'Guardando...' : 'Finalizar reto'}
      </button>

      {resultado && <p className="mt-4 font-semibold">{resultado}</p>}
    </div>
  );
}






