import { driver } from "driver.js";
import "driver.js/dist/driver.css";

// 👇 instancia global
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
        description: "Implementa tus conocimientos adquiridos en el diccionario con nuestra ruta de aprendizaje",
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

// NUEVO TOUR DICCIONARIO
export const tourDiccionario = () => {
  driverObj.destroy();

  driverObj.setSteps([
    {
      element: "#secciones-diccionario",
      popover: {
        title: "Secciones 📚",
        description:
          "Aquí puedes cambiar entre abecedario, números y palabras. Cada sección te muestra diferentes tipos de señas.",
        side: "bottom",
      },
    },
    {
      element: "#letra-ejemplo",
      popover: {
        title: "Selecciona una letra 🔤",
        description:
          "Haz click en cualquier letra, número o palabra para ver cómo se representa en lengua de señas.",
        side: "bottom",
      },
    },
  ]);

  driverObj.drive();
};

// NUEVO TOUR RETOS

export const tourRetos = () => {
  driverObj.destroy();

  driverObj.setSteps([
    {
      element: "#reto-1",
      popover: {
        title: "Primer reto 📚",
        description:
          "Completa las 3 lecciones de este reto para desbloquear el siguiente. ¡Así avanzas en tu aprendizaje!",
        side: "bottom",
      },
    },
  ]);

  driverObj.drive();
};