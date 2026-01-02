import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

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

  const [respuestas, setRespuestas] = useState({});
  const [resultado, setResultado] = useState("");

  if (!reto) return <p className="p-8">Reto no encontrado</p>;

  const manejarCambio = (leccionIndex, opcionIndex) => {
    const letra = ["A", "B", "C"][opcionIndex];
    setRespuestas({ ...respuestas, [leccionIndex]: letra });
  };

  const finalizarReto = () => {
    let errores = 0;

    reto.respuestasCorrectas.forEach((correcta, index) => {
      if (respuestas[index] !== correcta) errores++;
    });

    if (errores === 0) {
      localStorage.setItem(`reto${id}Completado`, "true");
      setResultado("✅ Todas las respuestas son correctas. Reto desbloqueado.");
      setTimeout(() => navigate("/ruta/retos"), 1500);
    } else {
      setResultado(
        `❌ No se desbloqueó el siguiente reto. Respuestas incorrectas: ${errores}`
      );
    }
  };

  return (
    <div className="min-h-screen bg-secondary p-8 space-y-6">
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
        className="bg-primary text-white px-6 py-2 rounded-lg"
      >
        Finalizar reto
      </button>

      {resultado && <p className="mt-4 font-semibold">{resultado}</p>}
    </div>
  );
}






