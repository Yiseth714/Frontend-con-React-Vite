import { useNavigate } from "react-router-dom";

function HomePages() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-secondary flex flex-col items-center justify-center px-6">

      {/* TÍTULO */}
      <h1 className="text-3xl md:text-4xl font-bold text-primary text-center mb-14">
        Bienvenido a nuestra App de Lengua de Señas
      </h1>

      {/* CONTENEDOR DE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">

        {/* CARD DICCIONARIO */}
        <div
          onClick={() => navigate("/diccionario")}
          className="
            cursor-pointer
            bg-white
            rounded-2xl
            p-10
            text-center
            shadow-lg
            transition-all
            duration-300
            hover:-translate-y-2
            hover:shadow-2xl
          "
        >
          <h2 className="text-2xl font-semibold text-primary mb-4">
            Diccionario
          </h2>
          <p className="text-gray-600">
            Explora las señas y sus significados
          </p>
        </div>

        {/* CARD RUTA DE APRENDIZAJE (DESTACADA) */}
        <div
          onClick={() => navigate("/ruta")}
          className="
            cursor-pointer
            bg-accent
            rounded-2xl
            p-10
            text-center
            shadow-xl
            transition-all
            duration-300
            hover:-translate-y-3
            hover:shadow-2xl
          "
        >
          <h2 className="text-2xl font-semibold text-primary mb-4">
            Ruta de aprendizaje
          </h2>
          <p className="text-primary">
            Aprende lengua de señas paso a paso
          </p>
        </div>

        {/* CARD TRADUCTOR */}
        <div
          onClick={() => navigate("/traductor")}
          className="
            cursor-pointer
            bg-white
            rounded-2xl
            p-10
            text-center
            shadow-lg
            transition-all
            duration-300
            hover:-translate-y-2
            hover:shadow-2xl
          "
        >
          <h2 className="text-2xl font-semibold text-primary mb-4">
            Traductor en tiempo real
          </h2>
          <p className="text-gray-600">
            Interpreta señas al instante
          </p>
        </div>

      </div>
    </div>
  );
}

export default HomePages;

