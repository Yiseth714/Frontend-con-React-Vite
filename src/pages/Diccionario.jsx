import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Abecedario
const letras = [
  "A", "B", "C", "D", "E", "F", "G",
  "H", "I", "J", "K", "L", "M",
  "N", "Ñ", "O", "P", "Q", "R", "S",
  "T", "U", "V", "W", "X", "Y", "Z"
];

// Números
const numeros = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
  "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
  "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"];

// Palabras por categorías
const categoriasPalabras = [
  {
    titulo: "Saludos y cortesía",
    carpeta: "saludos-cortesia",
    items: [
      { texto: "Hola", archivo: "hola.png.png" },
      { texto: "Adiós", archivo: "adios.png.png" },
      { texto: "Buenos días", archivo: "buenos-dias.png.png" },
      { texto: "Buenas tardes", archivo: "buenas-tardes.png.png" },
      { texto: "Buenas noches", archivo: "buenas-noches.png.png" },
      { texto: "Gracias", archivo: "gracias.png.png" },
      { texto: "Por favor", archivo: "por-favor.png.png" },
      { texto: "Sí", archivo: "si.png.png" },
      { texto: "No", archivo: "no.png.png" },
      { texto: "De nada", archivo: "de-nada.png.png" },
      { texto: "Cuidado", archivo: "cuidado.png.png" }
    ]
  },
  
  {
    titulo: "Comidas y bebidas",
    carpeta: "comidas-bebidas",
    items: [
      { texto: "Comida", archivo: "comida-dibujo.png" },
      { texto: "Bebida", archivo: "bebida-dibujo.png" },
      { texto: "Arroz", archivo: "arroz-dibujo.png" },
      { texto: "Leche", archivo: "leche-dibujo.png" },
      { texto: "Naranja", archivo: "naranja-dibujo.png" },
      { texto: "Desayuno", archivo: "desayuno-dibujo.png" },
      { texto: "Hambre", archivo: "hambre-dibujo.png" },
      { texto: "Sed", archivo: "sed-dibujo.png" }
    ]
  },
  {
    titulo: "Partes del cuerpo",
    carpeta: "cuerpo",
    items: [
      { texto: "Cabeza", archivo: "cabeza.png" },
      { texto: "Boca", archivo: "boca.png" },
      { texto: "Brazo", archivo: "brazo.png" },
      { texto: "Cuerpo", archivo: "cuerpo.png" },
      { texto: "Pierna", archivo: "pierna.png" },
      { texto: "Pie", archivo: "pie.png" }
    ]
  }
];

export default function Diccionario() {
  const navigate = useNavigate();
  const [seccion, setSeccion] = useState("letras");
  const [activo, setActivo] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  const letrasFiltradas = letras.filter(l =>
    l.toLowerCase().includes(busqueda.toLowerCase())
  );

  const numerosFiltrados = numeros.filter(n =>
    n.includes(busqueda)
  );

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      {/* Botón Volver */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 bg-gradient-to-r from-primary to-blue-600 text-white px-5 py-2.5 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg mb-6"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="font-medium">Volver</span>
      </button>

      <h2 className="text-3xl font-bold text-primary mb-8 text-center">
        Diccionario de Lengua de Señas
      </h2>

      {/* Botones de sección */}
      <div className="flex gap-3 mb-6 flex-wrap justify-center">
        {["letras", "numeros", "palabras"].map(sec => (
          <button
            key={sec}
            onClick={() => {
              setSeccion(sec);
              setActivo(null);
              setBusqueda("");
            }}
            className={`px-6 py-3 rounded-xl font-semibold transition-all shadow-md
              ${seccion === sec
                ? "bg-gradient-to-r from-primary to-blue-600 text-white"
                : "bg-white text-gray-700 border-2 border-gray-200 hover:border-primary hover:text-primary"}
            `}
          >
            {sec === "letras" && "Abecedario"}
            {sec === "numeros" && "Números"}
            {sec === "palabras" && "Palabras"}
          </button>
        ))}
      </div>

      {/* Buscador */}
      <div className="relative mb-8">
        <input
          type="text"
          placeholder={`Buscar en ${seccion}...`}
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full p-4 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
        />
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* ABECEDARIO */}
      {seccion === "letras" && (
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-9 gap-3 mb-8">
          {letrasFiltradas.map(letra => (
            <button
              key={letra}
              onClick={() => setActivo({ tipo: "letra", valor: letra })}
              className={`p-4 rounded-xl font-bold text-lg transition-all shadow-md hover:shadow-lg
                ${activo?.tipo === "letra" && activo?.valor === letra
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-primary hover:text-white border border-gray-200"}
              `}
            >
              {letra}
            </button>
          ))}
        </div>
      )}

      {/* NÚMEROS */}
      {seccion === "numeros" && (
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-10 gap-3 mb-8">
          {numerosFiltrados.map(num => (
            <button
              key={num}
              onClick={() => setActivo({ tipo: "numero", valor: num })}
              className={`p-4 rounded-xl font-bold text-lg transition-all shadow-md hover:shadow-lg
                ${activo?.tipo === "numero" && activo?.valor === num
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-primary hover:text-white border border-gray-200"}
              `}
            >
              {num}
            </button>
          ))}
        </div>
      )}

      {/* PALABRAS */}
      {seccion === "palabras" && categoriasPalabras.map(cat => {
        const itemsFiltrados = cat.items.filter(i =>
          i.texto.toLowerCase().includes(busqueda.toLowerCase())
        );

        if (!itemsFiltrados.length) return null;

        return (
          <div key={cat.titulo} className="mb-10">
            <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-gray-200">
              {cat.titulo}
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {itemsFiltrados.map(item => (
                <button
                  key={item.texto}
                  onClick={() =>
                    setActivo({
                      tipo: "palabra",
                      texto: item.texto,
                      carpeta: cat.carpeta,
                      archivo: item.archivo
                    })
                  }
                  className={`p-4 rounded-xl text-base font-medium transition-all shadow-md hover:shadow-lg
                    ${activo?.tipo === "palabra" && activo?.texto === item.texto
                      ? "bg-primary text-white"
                      : "bg-white text-gray-700 hover:bg-primary hover:text-white border border-gray-200"}
                  `}
                >
                  {item.texto}
                </button>
              ))}
            </div>
          </div>
        );
      })}

      {/* VISOR */}
      {activo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setActivo(null)}>
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">
                {activo.texto || activo.valor}
              </h3>
              <button
                onClick={() => setActivo(null)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex justify-center mb-6">
              <img
                src={
                  activo.tipo === "letra"
                    ? `/src/assets/images/abecedario/${activo.valor}.png.jpeg`
                    : activo.tipo === "numero"
                      ? `/src/assets/images/numeros/${activo.valor}.jpeg`
                      : `/src/assets/images/palabras/${activo.carpeta}/${activo.archivo}`
                }
                alt="Seña"
                className="w-64 h-64 object-contain rounded-xl bg-gray-50"
              />
            </div>

            <p className="text-center text-gray-500 text-sm">
              Toca fuera para cerrar
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
