import { useParams } from 'react-router-dom'

export default function Reto() {
  const { id } = useParams()

  return (
    <div className="min-h-screen bg-secondary p-8 space-y-8">
      <h2 className="text-2xl font-bold text-primary">
        Reto {id}
      </h2>

      {[1, 2, 3].map((leccion) => (
        <div key={leccion} className="bg-white p-6 rounded-lg">
          <h3 className="font-semibold mb-2">
            Lección {leccion}
          </h3>

          <div className="h-40 bg-gray-200 mb-4 flex items-center justify-center">
            Imagen de la seña
          </div>

          <p className="mb-2">¿Cuál seña es esta?</p>

          <div className="space-y-1">
            <label><input type="radio" name={`l${leccion}`} /> Opción A</label><br />
            <label><input type="radio" name={`l${leccion}`} /> Opción B</label><br />
            <label><input type="radio" name={`l${leccion}`} /> Opción C</label>
          </div>
        </div>
      ))}
    </div>
  )
}

