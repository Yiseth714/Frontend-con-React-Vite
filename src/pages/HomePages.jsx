import { useNavigate } from "react-router-dom";

import diccionarioImg from "../assets/images/diccionario.png";
import rutaImg from "../assets/images/ruta.jpeg";
import traductorImg from "../assets/images/traductor.png";

function HomePages() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-secondary flex flex-col">

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-grow flex flex-col items-center justify-center px-6">

        <h1 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12">
          Bienvenido a nuestra App de Lengua de Señas
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">

          {/* CARD DICCIONARIO */}
          <div
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
      </main>

      {/* FOOTER */}
      <footer className="bg-primary text-white text-center py-4">
        <p className="text-sm">
          © 2025 App de Lengua de Señas · Accesibilidad e inclusión
        </p>
      </footer>

    </div>
  );
}

export default HomePages;


