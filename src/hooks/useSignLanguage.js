import { useRef, useState, useEffect, useCallback } from "react";

const WS_URL = import.meta.env.VITE_WS_URL || "wss://192.168.1.69:8000/api/v1/traductor/ws";

export function useSignLanguage() {
  const wsRef = useRef(null);
  const [connected, setConnected] = useState(false);
  const [currentWord, setCurrentWord] = useState("");
  const [confidence, setConfidence] = useState(0);
  const [history, setHistory] = useState([]);
  const [status, setStatus] = useState("waiting");
  const lastWordRef = useRef("");

  const speakWord = useCallback((word) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "es-ES";
    utterance.rate = 0.9;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  }, []);

  useEffect(() => {
    const connect = () => {
      const ws = new WebSocket(WS_URL);
      wsRef.current = ws;

      ws.onopen = () => setConnected(true);

      ws.onclose = () => {
        setConnected(false);
        setTimeout(connect, 3000);
      };

      ws.onerror = (e) => console.error("WebSocket error:", e);

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.type === "prediction") {
          setCurrentWord(data.word);
          setConfidence(data.confidence);
          setStatus("idle");

          if (data.word !== lastWordRef.current) {
            lastWordRef.current = data.word;
            setHistory(prev => [
              { word: data.word, confidence: data.confidence, time: Date.now() },
              ...prev.slice(0, 9)
            ]);
            speakWord(data.word);  // ← ahora sí está declarada antes
          }

        } else if (data.type === "capturing") {
          setStatus("capturing");

        } else if (data.type === "waiting") {
          setStatus("waiting");
        }
      };
    };

    connect();
    return () => wsRef.current?.close();
  }, [speakWord]);  // ← agregar speakWord como dependencia

  const sendLandmarks = useCallback((landmarks) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ landmarks }));
    }
  }, []);


  return { connected, currentWord, confidence, history, status, sendLandmarks };
}
