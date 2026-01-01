import { BLOB_CONFIGS } from './utils/animation-constants'
import Blob from './Blob'
import InteractiveBlob from './InteractiveBlob'

const setBlobRef1 = (el: SVGCircleElement | null) => {
  if (el) {
    el.style.transform = 'scale(1)'
  }
}

const setBlobRef2 = (el: SVGCircleElement | null) => {
  if (el) {
    el.style.transform = 'scale(1)'
  }
}

const setBlobRef3 = (el: SVGCircleElement | null) => {
  if (el) {
    el.style.transform = 'scale(1)'
  }
}

const setBlobRef4 = (el: SVGCircleElement | null) => {
  if (el) {
    el.style.transform = 'scale(1)'
  }
}

const setBlobRef5 = (el: SVGCircleElement | null) => {
  if (el) {
    el.style.transform = 'scale(1)'
  }
}

export default function BlobsContainer() {
  return (
    <svg
      className="blobs-container"
      viewBox="0 0 100 100"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        filter: 'url(#goo)',
        willChange: 'transform',
        transformOrigin: '50% 50%',
      }}
      aria-label="Animated blob background"
    >
      <title>Animated blob background</title>
      <Blob config={BLOB_CONFIGS[0]} innerRef={setBlobRef1} />
      <Blob config={BLOB_CONFIGS[1]} innerRef={setBlobRef2} />
      <Blob config={BLOB_CONFIGS[2]} innerRef={setBlobRef3} />
      <Blob config={BLOB_CONFIGS[3]} innerRef={setBlobRef4} />
      <Blob config={BLOB_CONFIGS[4]} innerRef={setBlobRef5} />
      <InteractiveBlob />
    </svg>
  )
}
