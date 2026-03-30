import { useNavigate } from "react-router-dom";
import diccionarioImg from "../assets/images/diccionario.png";
import rutaImg from "../assets/images/ruta.jpeg";
import traductorImg from "../assets/images/traductor.png";
import { tourHome } from "../utils/tour";
import { useEffect, useRef } from "react";

function HomePages() {
  const navigate = useNavigate();

  const tourIniciado = useRef(false);

  useEffect(() => {
    if (tourIniciado.current) return;

    tourIniciado.current = true;

    const yaVioTour = localStorage.getItem("tourHomeVisto");

    if (!yaVioTour) {
      setTimeout(() => {
        tourHome();
        localStorage.setItem("tourHomeVisto", "true");
      }, 300);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 min-h-[calc(100vh-200px)]">

      <h1
        id="titulo-home"
        className="text-3xl md:text-4xl font-bold text-primary text-center mb-4"
      >
        Bienvenido(a) a SeñaGo 👋
      </h1>

      {/* 👇 BOTÓN AÑADIDO */}
      <button
        onClick={() => {
          localStorage.removeItem("tourHomeVisto");
          tourHome();
        }}
        className="mb-8 px-4 py-2 bg-primary text-white rounded-lg shadow hover:scale-105 transition"
      >
        Ver guía otra vez ✨
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">

        {/* CARD DICCIONARIO */}
        <div
          id="card-diccionario"
          onClick={() => navigate("/diccionario")}
          className="cursor-pointer bg-white rounded-2xl p-6 text-center shadow-lg
                       hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
        >
          <h2 className="text-xl font-semibold text-primary mb-4">
            Diccionario
          </h2>

          <img
            src={diccionarioImg}
            alt="Diccionario de señas"
            className="mx-auto h-32 mb-4"
          />

          <p className="text-gray-600">
            Haz click aquí para explorar las señas
          </p>
        </div>

        {/* CARD RUTA */}
        <div
          id="card-ruta"
          onClick={() => navigate("/ruta")}
          className="cursor-pointer bg-accent rounded-2xl p-6 text-center shadow-lg
                       hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
        >
          <h2 className="text-xl font-semibold text-primary mb-4">
            Ruta de aprendizaje
          </h2>

          <img
            src={rutaImg}
            alt="Ruta de aprendizaje"
            className="mx-auto h-32 mb-4"
          />

          <p className="text-primary">
            Haz click aquí para aprender lengua de señas paso a paso
          </p>
        </div>

        {/* CARD TRADUCTOR */}
        <div
          id="card-traductor"
          onClick={() => navigate("/traductor")}
          className="cursor-pointer bg-white rounded-2xl p-6 text-center shadow-lg
                       hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
        >
          <h2 className="text-xl font-semibold text-primary mb-4">
            Traductor en tiempo real
          </h2>

          <img
            src={traductorImg}
            alt="Traductor de señas"
            className="mx-auto h-32 mb-4"
          />

          <p className="text-gray-600">
            Haz click aquí para traducir señas al instante
          </p>
        </div>

      </div>
    </div>
  );
}

export default HomePages;


