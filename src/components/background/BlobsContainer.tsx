import { BLOB_CONFIGS } from './utils/animation-constants'
import Blob from './Blob'
import InteractiveBlob from './InteractiveBlob'

export default function BlobsContainer() {
  return (
    <div className="fixed top-0 left-0 w-full h-full">
      <svg
        className="blobs-container"
        viewBox="0 0 100 100"
        aria-label="Animated blob background"
      >
        <title>Animated blob background</title>
        {BLOB_CONFIGS.map((config, index) => (
          <Blob key={index} config={config} />
        ))}
        <InteractiveBlob />
      </svg>
    </div>
  )
}
