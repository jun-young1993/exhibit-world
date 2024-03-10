import { Html, useProgress } from '@react-three/drei'

export default function CanvasLoader() {
  const { progress } = useProgress()
  return <Html center>{progress} % loaded</Html>
}