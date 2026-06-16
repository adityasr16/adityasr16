'use client'

import { useRef, useState, useCallback } from 'react'

interface CameraCaptureProps {
  onCapture: (base64: string, mimeType: string) => void
  loading?: boolean
  label?: string
}

export default function CameraCapture({ onCapture, loading, label = 'Analyse' }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [streaming, setStreaming] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
        setStreaming(true)
        setPreview(null)
      }
    } catch {
      alert('Camera access denied. Use file upload instead.')
    }
  }, [])

  const capture = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return
    const video = videoRef.current
    const canvas = canvasRef.current
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    canvas.getContext('2d')?.drawImage(video, 0, 0)
    const dataUrl = canvas.toDataURL('image/jpeg', 0.85)
    const base64 = dataUrl.split(',')[1]
    setPreview(dataUrl)
    setStreaming(false)
    const stream = video.srcObject as MediaStream
    stream?.getTracks().forEach(t => t.stop())
    video.srcObject = null
    onCapture(base64, 'image/jpeg')
  }, [onCapture])

  const handleFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => {
      const dataUrl = ev.target?.result as string
      setPreview(dataUrl)
      const base64 = dataUrl.split(',')[1]
      const mimeType = file.type || 'image/jpeg'
      onCapture(base64, mimeType)
    }
    reader.readAsDataURL(file)
  }, [onCapture])

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="relative w-full max-w-md aspect-[3/4] bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800">
        {streaming && (
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            playsInline
            muted
          />
        )}
        {preview && !streaming && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="capture" className="w-full h-full object-cover" />
        )}
        {!streaming && !preview && (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-zinc-500">
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm">Camera or upload a photo</span>
          </div>
        )}
        {loading && (
          <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-3">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 rounded-full border-2 border-purple-500 animate-ping opacity-50" />
              <div className="absolute inset-0 rounded-full border-2 border-t-transparent border-purple-500 animate-spin" />
            </div>
            <span className="text-sm text-purple-300 animate-pulse">AI is working…</span>
          </div>
        )}
        {/* Scanner overlay when streaming */}
        {streaming && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute left-4 top-4 w-6 h-6 border-t-2 border-l-2 border-purple-400 rounded-tl-sm" />
            <div className="absolute right-4 top-4 w-6 h-6 border-t-2 border-r-2 border-purple-400 rounded-tr-sm" />
            <div className="absolute left-4 bottom-4 w-6 h-6 border-b-2 border-l-2 border-purple-400 rounded-bl-sm" />
            <div className="absolute right-4 bottom-4 w-6 h-6 border-b-2 border-r-2 border-purple-400 rounded-br-sm" />
            <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-scan top-0" />
          </div>
        )}
      </div>

      <canvas ref={canvasRef} className="hidden" />

      <div className="flex gap-3 w-full max-w-md">
        {!streaming ? (
          <>
            <button
              onClick={startCamera}
              disabled={loading}
              className="flex-1 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-medium transition-colors disabled:opacity-50"
            >
              Open Camera
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={loading}
              className="flex-1 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-medium transition-colors disabled:opacity-50"
            >
              Upload Photo
            </button>
          </>
        ) : (
          <button
            onClick={capture}
            className="flex-1 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold text-base transition-all shadow-lg shadow-purple-900/30"
          >
            {label}
          </button>
        )}
      </div>

      {preview && !loading && (
        <button
          onClick={() => { setPreview(null); setStreaming(false) }}
          className="text-zinc-500 text-sm hover:text-zinc-300 transition-colors"
        >
          Try another photo
        </button>
      )}

      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </div>
  )
}
