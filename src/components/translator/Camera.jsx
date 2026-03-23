import { useEffect, useRef } from "react";
import { Hands } from "@mediapipe/hands";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import { HAND_CONNECTIONS } from "@mediapipe/hands";

export default function CameraView({ onLandmarks }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const handsRef = useRef(null);

  useEffect(() => {
    const hands = new Hands({
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

      ctx.save();
      ctx.scale(-1, 1);
      ctx.drawImage(results.image, -canvas.width, 0, canvas.width, canvas.height);
      ctx.restore();

      if (results.multiHandLandmarks?.length > 0) {
        results.multiHandLandmarks.forEach((landmarks) => {
          const mirrored = landmarks.map((lm) => ({ ...lm, x: 1 - lm.x }));
          drawConnectors(ctx, mirrored, HAND_CONNECTIONS, {
            color: "#00FF88", lineWidth: 2,
          });
          drawLandmarks(ctx, mirrored, {
            color: "#FF0055", lineWidth: 1, radius: 4,
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

    startCamera();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((t) => t.stop());
      }
      hands.close();
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