
import { useState } from "react";

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
    <div className="p-4 md:p-8">

      <h2 className="text-3xl font-bold text-primary mb-6">
        Diccionario de Lengua de Señas
      </h2>

      {/* Botones de sección */}
      <div className="flex gap-4 mb-6 flex-wrap">
        {["letras", "numeros", "palabras"].map(sec => (
          <button
            key={sec}
            onClick={() => {
              setSeccion(sec);
              setActivo(null);
              setBusqueda("");
            }}
            className={`px-4 py-2 rounded-lg font-semibold transition
              ${seccion === sec
                ? "bg-primary text-white"
                : "bg-white text-primary hover:bg-primary hover:text-white"}
            `}
          >
            {sec === "letras" && "Abecedario"}
            {sec === "numeros" && "Números"}
            {sec === "palabras" && "Palabras"}
          </button>
        ))}
      </div>

      {/* Buscador */}
      <input
        type="text"
        placeholder={`Buscar en ${seccion}...`}
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="mb-8 w-full max-w-sm p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
      />

      {/* ABECEDARIO */}
      {seccion === "letras" && (
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4 mb-8">
          {letrasFiltradas.map(letra => (
            <button
              key={letra}
              onClick={() => setActivo({ tipo: "letra", valor: letra })}
              className="p-3 bg-white rounded-lg font-bold text-primary hover:bg-primary hover:text-white transition"
            >
              {letra}
            </button>
          ))}
        </div>
      )}

      {/* NÚMEROS */}
      {seccion === "numeros" && (
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4 mb-8">
          {numerosFiltrados.map(num => (
            <button
              key={num}
              onClick={() => setActivo({ tipo: "numero", valor: num })}
              className="p-3 bg-white rounded-lg font-bold text-primary hover:bg-primary hover:text-white transition"
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
          <div key={cat.titulo} className="mb-8">
            <h3 className="text-xl font-bold text-primary mb-4">
              {cat.titulo}
            </h3>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
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
                  className="p-3 bg-white rounded-lg text-primary text-sm hover:bg-primary hover:text-white transition"
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
        <div className="bg-white p-6 rounded-lg text-center max-w-md mx-auto animate-fadeIn">
          <h3 className="text-xl font-semibold mb-4">
            {activo.texto || activo.valor}
          </h3>

          <img
            src={
              activo.tipo === "letra"
                ? `/src/assets/images/abecedario/${activo.valor}.png.jpeg`
                : activo.tipo === "numero"
                  ? `/src/assets/images/numeros/${activo.valor}.jpeg`
                  : `/src/assets/images/palabras/${activo.carpeta}/${activo.archivo}`
            }
            alt="Seña"
            className="mx-auto w-48 h-48 object-contain"
          />
        </div>
      )}
    </div>
  );
}




