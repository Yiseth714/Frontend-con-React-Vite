import { driver } from "driver.js";
import "driver.js/dist/driver.css";

// 👇 instancia global (FUERA de la función)
const driverObj = driver({
  animate: true,
  opacity: 0.6,
  padding: 10,
  allowClose: true,
  overlayClickNext: true,
  doneBtnText: "Listo ✨",
  closeBtnText: "Cerrar",
  nextBtnText: "Siguiente →",
  prevBtnText: "← Atrás",
});

export const tourHome = () => {
  // 👇 MUY IMPORTANTE: limpiar cualquier tour anterior
  driverObj.destroy();

  driverObj.setSteps([
    {
      element: "#titulo-home",
      popover: {
        title: "Bienvenido(a) 👋",
        description: "Este es el inicio de tu experiencia en SeñaGo",
        side: "bottom",
      },
    },
    {
      element: "#card-diccionario",
      popover: {
        title: "Diccionario 📚",
        description: "Explora todas las señas disponibles y aprende su significado",
        side: "bottom",
      },
    },
    {
      element: "#card-ruta",
      popover: {
        title: "Ruta de aprendizaje 🧠",
        description: "Aprende paso a paso desde lo básico hasta niveles más avanzados",
        side: "bottom",
      },
    },
    {
      element: "#card-traductor",
      popover: {
        title: "Traductor en tiempo real 🎥",
        description: "Usa tu cámara para interpretar señas al instante",
        side: "bottom",
      },
    },
  ]);

  driverObj.drive();
};