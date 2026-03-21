import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { marcarLeccionCompletada, actualizarProgreso } from "../../services/progreso";
import { crearLogro, NOMBRES_LOGROS, DESCRIPCIONES_LOGROS } from "../../services/logros";

// CONTENIDO DE CADA RETO
const retosData = {
  1: {
    titulo: "Reto 1",
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
    titulo: "Reto 2",
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
    titulo: "Reto 3",
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
    titulo: "Reto 4",
    respuestasCorrectas: ["A", "B", "C"],
    lecciones: [
      {
        pregunta: "ESCRIBE AQUÍ TU PREGUNTA",
        opciones: ["Opción 1", "Opción 2", "Opción 3"],
        imagen: new URL(
          "../../assets/images/retos/reto4/leccion1.png",
          import.meta.url
        ).href,
      },
      {
        pregunta: "ESCRIBE AQUÍ TU PREGUNTA",
        opciones: ["Opción 1", "Opción 2", "Opción 3"],
        imagen: new URL(
          "../../assets/images/retos/reto4/leccion2.png",
          import.meta.url
        ).href,
      },
      {
        pregunta: "ESCRIBE AQUÍ TU PREGUNTA",
        opciones: ["Opción 1", "Opción 2", "Opción 3"],
        imagen: new URL(
          "../../assets/images/retos/reto4/leccion3.png",
          import.meta.url
        ).href,
      },
    ],
  },

  5: {
    titulo: "Reto 5",
    respuestasCorrectas: ["A", "B", "C"],
    lecciones: [
      {
        pregunta: "ESCRIBE AQUÍ TU PREGUNTA",
        opciones: ["Opción 1", "Opción 2", "Opción 3"],
        imagen: new URL(
          "../../assets/images/retos/reto5/leccion1.png",
          import.meta.url
        ).href,
      },
      {
        pregunta: "ESCRIBE AQUÍ TU PREGUNTA",
        opciones: ["Opción 1", "Opción 2", "Opción 3"],
        imagen: new URL(
          "../../assets/images/retos/reto5/leccion2.png",
          import.meta.url
        ).href,
      },
      {
        pregunta: "ESCRIBE AQUÍ TU PREGUNTA",
        opciones: ["Opción 1", "Opción 2", "Opción 3"],
        imagen: new URL(
          "../../assets/images/retos/reto5/leccion3.png",
          import.meta.url
        ).href,
      },
    ],
  },

  6: {
    titulo: "Reto 6",
    respuestasCorrectas: ["A", "B", "C"],
    lecciones: [
      {
        pregunta: "ESCRIBE AQUÍ TU PREGUNTA",
        opciones: ["Opción 1", "Opción 2", "Opción 3"],
        imagen: new URL(
          "../../assets/images/retos/reto6/leccion1.png",
          import.meta.url
        ).href,
      },
      {
        pregunta: "ESCRIBE AQUÍ TU PREGUNTA",
        opciones: ["Opción 1", "Opción 2", "Opción 3"],
        imagen: new URL(
          "../../assets/images/retos/reto6/leccion2.png",
          import.meta.url
        ).href,
      },
      {
        pregunta: "ESCRIBE AQUÍ TU PREGUNTA",
        opciones: ["Opción 1", "Opción 2", "Opción 3"],
        imagen: new URL(
          "../../assets/images/retos/reto6/leccion3.png",
          import.meta.url
        ).href,
      },
      {
        pregunta: "ESCRIBE AQUÍ TU PREGUNTA",
        opciones: ["Opción 1", "Opción 2", "Opción 3"],
        imagen: new URL(
          "../../assets/images/retos/reto6/leccion3.png",
          import.meta.url
        ).href,
      },
    ],
  },

  7: {
    titulo: "Reto 7",
    respuestasCorrectas: ["A", "B", "C"],
    lecciones: [
      {
        pregunta: "ESCRIBE AQUÍ TU PREGUNTA",
        opciones: ["Opción 1", "Opción 2", "Opción 3"],
        imagen: new URL(
          "../../assets/images/retos/reto7/leccion1.png",
          import.meta.url
        ).href,
      },
      {
        pregunta: "ESCRIBE AQUÍ TU PREGUNTA",
        opciones: ["Opción 1", "Opción 2", "Opción 3"],
        imagen: new URL(
          "../../assets/images/retos/reto7/leccion2.png",
          import.meta.url
        ).href,
      },
      {
        pregunta: "ESCRIBE AQUÍ TU PREGUNTA",
        opciones: ["Opción 1", "Opción 2", "Opción 3"],
        imagen: new URL(
          "../../assets/images/retos/reto7/leccion3.png",
          import.meta.url
        ).href,
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
          console.log(`Marcando lección ${i+1} del reto ${id}...`);
          await marcarLeccionCompletada(parseInt(id), i + 1);
        }
        
        // Actualizar reto actual
        const siguienteReto = parseInt(id) + 1;
        if (siguienteReto <= 3) {
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
        setTimeout(() => {}, 3000);
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
        <h2 className="text-2xl font-bold text-primary">{reto.titulo}</h2>

      {reto.lecciones.map((leccion, index) => (
        <div key={index} className="bg-white p-4 md:p-6 rounded-lg">
          <h3 className="font-semibold mb-2">Lección {index + 1}</h3>

          <img
            src={leccion.imagen}
            alt={`Seña reto ${id} lección ${index + 1}`}
            className="h-32 md:h-40 mx-auto mb-4 object-contain"
          />

          <p className="mb-2">{leccion.pregunta}</p>

          {leccion.opciones.map((opcion, opcionIndex) => (
            <label key={opcionIndex} className="block">
              <input
                type="radio"
                name={`leccion-${index}`}
                onChange={() => manejarCambio(index, opcionIndex)}
              />{" "}
              {opcion}
            </label>
          ))}
        </div>
      ))}

      <button
        onClick={finalizarReto}
        disabled={cargando}
        className={`bg-primary text-white px-6 py-2 rounded-lg ${
          cargando ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {cargando ? 'Guardando...' : 'Finalizar reto'}
      </button>

      {resultado && <p className="mt-4 font-semibold">{resultado}</p>}
    </div>
  );
}






