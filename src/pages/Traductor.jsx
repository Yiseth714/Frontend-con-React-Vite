
import { useEffect, useRef, useState } from 'react'

const API_BASE_URL = import.meta.env.VITE_TRANSLATOR_API_URL || 'http://127.0.0.1:5000'
const FRAME_INTERVAL_MS = 80

function Traductor() {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const streamRef = useRef(null)
  const frameTimerRef = useRef(null)
  const sendingFramesRef = useRef(false)
  const requestInFlightRef = useRef(false)
  const lastSpokenSignatureRef = useRef('')

  const [cameraReady, setCameraReady] = useState(false)
  const [running, setRunning] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [words, setWords] = useState([])
  const [recording, setRecording] = useState(false)
  const [prediction, setPrediction] = useState(null)
  const [mirrorCamera, setMirrorCamera] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(true)

  const applyRealtimePayload = (payload) => {
    setRunning(Boolean(payload?.running))
    setTranslatedText(payload?.text || '')
    setWords(Array.isArray(payload?.words) ? payload.words : [])
    setRecording(Boolean(payload?.recording))
    setPrediction(payload?.prediction || null)
  }

  const callTranslatorApi = async (path, options = {}) => {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
      ...options,
    })

    const payload = await response.json().catch(() => ({}))
    if (!response.ok) {
      throw new Error(payload?.error || `Error HTTP ${response.status}`)
    }
    return payload
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null
    }

    setCameraReady(false)
  }

  const startCamera = async () => {
    if (streamRef.current) {
      return
    }

    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'user' },
      audio: false,
    })

    streamRef.current = stream
    if (videoRef.current) {
      videoRef.current.srcObject = stream
    }
    setCameraReady(true)
  }

  const stopFrameLoop = () => {
    sendingFramesRef.current = false
    requestInFlightRef.current = false

    if (frameTimerRef.current) {
      clearTimeout(frameTimerRef.current)
      frameTimerRef.current = null
    }
  }

  const startFrameLoop = () => {
    if (sendingFramesRef.current) {
      return
    }

    sendingFramesRef.current = true

    const sendFrame = async () => {
      if (!sendingFramesRef.current) {
        return
      }

      if (requestInFlightRef.current) {
        frameTimerRef.current = setTimeout(sendFrame, FRAME_INTERVAL_MS)
        return
      }

      const video = videoRef.current
      const canvas = canvasRef.current

      if (!video || !canvas || video.readyState < 2) {
        frameTimerRef.current = setTimeout(sendFrame, FRAME_INTERVAL_MS)
        return
      }

      requestInFlightRef.current = true

      try {
        canvas.width = video.videoWidth || 640
        canvas.height = video.videoHeight || 480
        const ctx = canvas.getContext('2d')
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
        const image = canvas.toDataURL('image/jpeg', 0.7)

        const payload = await callTranslatorApi('/frame', {
          method: 'POST',
          body: JSON.stringify({ image }),
        })

        applyRealtimePayload(payload)
        setError('')
      } catch (apiError) {
        setError(apiError.message || 'No fue posible procesar el frame.')
      } finally {
        requestInFlightRef.current = false
        if (sendingFramesRef.current) {
          frameTimerRef.current = setTimeout(sendFrame, FRAME_INTERVAL_MS)
        }
      }
    }

    sendFrame()
  }

  const handleStart = async () => {
    setLoading(true)
    setError('')

    try {
      await startCamera()
      const payload = await callTranslatorApi('/start', { method: 'POST' })
      applyRealtimePayload(payload)
      startFrameLoop()
    } catch (startError) {
      setError(startError.message || 'No fue posible iniciar el traductor.')
    } finally {
      setLoading(false)
    }
  }

  const handleStop = async ({ closeCamera = false } = {}) => {
    stopFrameLoop()

    try {
      const payload = await callTranslatorApi('/stop', { method: 'POST' })
      applyRealtimePayload(payload)
    } catch {
      setRunning(false)
    }

    if (closeCamera) {
      stopCamera()
    }
  }

  const handleResetText = () => {
    setTranslatedText('')
    setWords([])
    setPrediction(null)
    lastSpokenSignatureRef.current = ''
  }

  const pickFriendlySpanishVoice = () => {
    if (!('speechSynthesis' in window)) {
      return null
    }

    const voices = window.speechSynthesis.getVoices()
    if (!voices?.length) {
      return null
    }

    const preferredNames = [
      'Microsoft Elvira',
      'Microsoft Dalia',
      'Microsoft Helena',
      'Google español',
      'Google español de Estados Unidos',
      'Paulina',
      'Monica',
      'Luciana',
    ]

    const exactMatch = voices.find((voice) =>
      preferredNames.some((name) => voice.name.toLowerCase().includes(name.toLowerCase())),
    )
    if (exactMatch) {
      return exactMatch
    }

    const latinSpanish = voices.find((voice) => voice.lang?.toLowerCase().startsWith('es-co'))
    if (latinSpanish) {
      return latinSpanish
    }

    return voices.find((voice) => voice.lang?.toLowerCase().startsWith('es-')) || null
  }

  useEffect(() => {
    return () => {
      stopFrameLoop()
      stopCamera()
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  useEffect(() => {
    if (!audioEnabled || words.length === 0 || !words[0]) {
      return
    }

    const signature = `${words.length}:${words[0]}`
    if (lastSpokenSignatureRef.current === signature) {
      return
    }

    lastSpokenSignatureRef.current = signature

    if (!('speechSynthesis' in window)) {
      return
    }

    const utterance = new SpeechSynthesisUtterance(words[0])
    const selectedVoice = pickFriendlySpanishVoice()

    if (selectedVoice) {
      utterance.voice = selectedVoice
      utterance.lang = selectedVoice.lang
    } else {
      utterance.lang = 'es-ES'
    }

    utterance.rate = 0.9
    utterance.pitch = 1.08
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)
  }, [words, audioEnabled])

  return (
    <div className="min-h-screen bg-secondary px-4 py-8 md:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-12">
        <section className="rounded-2xl bg-white p-4 shadow-lg md:p-6 lg:col-span-9">
          <h1 className="mb-4 text-2xl font-bold text-primary">Traductor en tiempo real</h1>
          <p className="mb-4 text-sm text-gray-600">
            Este modo traduce senas usando la camara en vivo. No permite subir videos.
          </p>

          <div className="overflow-hidden rounded-xl bg-black">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className={`aspect-video h-auto max-h-[70vh] w-full object-cover ${
                mirrorCamera ? '-scale-x-100' : ''
              }`}
            />
          </div>
          <canvas ref={canvasRef} className="hidden" />

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleStart}
              disabled={loading || running}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
            >
              {loading && !running ? 'Iniciando...' : 'Iniciar traduccion'}
            </button>
            <button
              type="button"
              onClick={() => handleStop({ closeCamera: false })}
              disabled={loading || !running}
              className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-primary disabled:opacity-50"
            >
              Detener traduccion
            </button>
            <button
              type="button"
              onClick={() => handleStop({ closeCamera: true })}
              disabled={loading || !cameraReady}
              className="rounded-lg border border-primary px-4 py-2 text-sm font-semibold text-primary disabled:opacity-50"
            >
              Apagar camara
            </button>
            <button
              type="button"
              onClick={handleResetText}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700"
            >
              Limpiar texto
            </button>
            <button
              type="button"
              onClick={() => setMirrorCamera((prev) => !prev)}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700"
            >
              {mirrorCamera ? 'Quitar espejo' : 'Invertir camara'}
            </button>
            <button
              type="button"
              onClick={() => setAudioEnabled((prev) => !prev)}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700"
            >
              {audioEnabled ? 'Audio activado' : 'Audio desactivado'}
            </button>
          </div>

          <div className="mt-4 rounded-lg bg-gray-50 p-3 text-sm">
            <p>
              <span className="font-semibold">Camara:</span> {cameraReady ? 'activa' : 'apagada'}
            </p>
            <p>
              <span className="font-semibold">Estado:</span> {running ? 'traduciendo' : 'en espera'}
            </p>
            <p>
              <span className="font-semibold">Captura actual:</span> {recording ? 'grabando sena' : 'sin captura'}
            </p>
            {prediction && (
              <p>
                <span className="font-semibold">Ultima prediccion:</span> {prediction.word} (
                {(prediction.confidence * 100).toFixed(1)}%)
              </p>
            )}
          </div>

          {error && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>
          )}
        </section>

        <section className="rounded-2xl bg-white p-4 shadow-lg md:p-6 lg:col-span-3">
          <h2 className="mb-4 text-xl font-bold text-primary">Resultado</h2>

          <div className="min-h-28 rounded-xl bg-gray-50 p-4">
            {translatedText ? (
              <p className="text-lg font-semibold text-primary">{translatedText}</p>
            ) : (
              <p className="text-sm text-gray-500">La traduccion aparecera aqui cuando detecte senas.</p>
            )}
          </div>

          <div className="mt-5">
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">Palabras detectadas</h3>
            <div className="flex min-h-12 flex-wrap gap-2 rounded-xl bg-gray-50 p-3">
              {words.length === 0 && <span className="text-sm text-gray-500">Aun no hay resultados.</span>}
              {words.map((word, index) => (
                <span
                  key={`${word}-${index}`}
                  className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                >
                  {word}
                </span>
              ))}
            </div>
          </div>

          <p className="mt-6 text-xs text-gray-500">
            Configura la URL del backend con <code>VITE_TRANSLATOR_API_URL</code> si no usas{' '}
            <code>http://127.0.0.1:5000</code>.
          </p>
        </section>
      </div>
    </div>
  )
}

export default Traductor
