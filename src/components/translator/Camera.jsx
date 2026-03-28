import { useEffect, useRef } from "react";

export default function CameraView({ onLandmarks }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const handsRef = useRef(null);

  useEffect(() => {
    // Cargar MediaPipe desde CDN
    const script1 = document.createElement("script");
    script1.src = "https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js";

    const script2 = document.createElement("script");
    script2.src = "https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js";

    const script3 = document.createElement("script");
    script3.src = "https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js";

    document.head.appendChild(script1);
    document.head.appendChild(script2);

    script3.onload = () => initMediaPipe();
    document.head.appendChild(script3);

    function initMediaPipe() {
      const hands = new window.Hands({
        locateFile: (file) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
      });

      hands.setOptions({
        maxNumHands: 2,
        modelComplexity: 0,
        minDetectionConfidence: 0.7,
        minTrackingConfidence: 0.5,
      });

      hands.onResults((results) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Dibujar video invertido
        ctx.save();
        ctx.scale(-1, 1);
        ctx.drawImage(results.image, -canvas.width, 0, canvas.width, canvas.height);
        ctx.restore();

        if (results.multiHandLandmarks?.length > 0) {
          results.multiHandLandmarks.forEach((landmarks) => {
            const mirrored = landmarks.map((lm) => ({ ...lm, x: 1 - lm.x }));

            // Dibujar con utilidades de MediaPipe desde window
            window.drawConnectors(ctx, mirrored, window.HAND_CONNECTIONS, {
              color: "#00FF88",
              lineWidth: 2,
            });
            window.drawLandmarks(ctx, mirrored, {
              color: "#FF0055",
              lineWidth: 1,
              radius: 4,
            });
          });

          const handsData = results.multiHandLandmarks.map((hand) =>
            hand.map((lm) => ({ x: lm.x, y: lm.y, z: lm.z }))
          );
          onLandmarks(handsData);
        } else {
          onLandmarks([]);
        }
      });

      handsRef.current = hands;
      startCamera();
    }

    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "user",
            width: { ideal: 640 },
            height: { ideal: 480 },
          },
          audio: false,
        });

        const video = videoRef.current;
        if (!video) return;
        video.srcObject = stream;
        video.onloadedmetadata = () => {
          video.play();
          processFrame();
        };
      } catch (err) {
        console.error("Error accediendo a la cámara:", err);
      }
    }

    async function processFrame() {
      const video = videoRef.current;
      if (video && handsRef.current && !video.paused) {
        await handsRef.current.send({ image: video });
      }
      animationRef.current = requestAnimationFrame(processFrame);
    }

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((t) => t.stop());
      }
      if (handsRef.current) handsRef.current.close();
    };
  }, [onLandmarks]);

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <video
        ref={videoRef}
        style={{ display: "none" }}
        playsInline
        muted
      />
      <canvas
        ref={canvasRef}
        width={640}
        height={480}
        className="w-full rounded-xl"
      />
    </div>
  );
}