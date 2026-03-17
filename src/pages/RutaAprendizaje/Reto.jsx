import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { cerrarSesion, obtenerNombreUsuario } from "../../services/auth";
import { marcarLeccionCompletada, actualizarProgreso } from "../../services/progreso";

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
};

export default function Reto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const reto = retosData[id];
  const nombreUsuario = obtenerNombreUsuario();

  const [respuestas, setRespuestas] = useState({});
  const [resultado, setResultado] = useState("");
  const [cargando, setCargando] = useState(false);

  if (!reto) return <p className="p-8">Reto no encontrado</p>;

  const handleLogout = () => {
    cerrarSesion();
    navigate('/login');
  };

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
        // Marcar cada lección como completada
        for (let i = 0; i < reto.lecciones.length; i++) {
          await marcarLeccionCompletada(parseInt(id), i + 1);
        }
        // Actualizar reto actual
        const siguienteReto = parseInt(id) + 1;
        if (siguienteReto <= 3) {
          await actualizarProgreso(siguienteReto, 1);
        }
        setResultado("✅ Todas las respuestas son correctas. Progreso guardado!");
        setTimeout(() => navigate("/ruta/retos"), 1500);
      } catch (error) {
        console.error("Error al guardar progreso:", error);
        // También guardar en localStorage como respaldo
        localStorage.setItem(`reto${id}Completado`, "true");
        setResultado("✅ Correcto! (Guardado local)");
        setTimeout(() => navigate("/ruta/retos"), 1500);
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
    <div className="min-h-screen bg-secondary">
      {/* HEADER */}
      <header className="bg-primary text-white px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">SeñaGo - {reto.titulo}</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm">Hola, {nombreUsuario || 'Usuario'}</span>
            <button
              onClick={handleLogout}
              className="bg-white text-primary px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <div className="p-8 space-y-6">
        <h2 className="text-2xl font-bold text-primary">{reto.titulo}</h2>

      {reto.lecciones.map((leccion, index) => (
        <div key={index} className="bg-white p-6 rounded-lg">
          <h3 className="font-semibold mb-2">Lección {index + 1}</h3>

          <img
            src={leccion.imagen}
            alt={`Seña reto ${id} lección ${index + 1}`}
            className="h-40 mx-auto mb-4 object-contain"
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
    </div>
  );
}






