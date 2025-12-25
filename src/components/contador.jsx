import { useState } from "react";

function Contador() {
  const [numero, setNumero] = useState(0);

  const sumar = () => {
    setNumero(numero + 1);
  };

  const restar = () => {
    setNumero(numero - 1);
  };

  return (
    <div>
      <h3>Resultado: {numero}</h3>

      <button onClick={sumar}>Sumar</button>
      <button onClick={restar}>Restar</button>
    </div>
  );
}

export default Contador;
