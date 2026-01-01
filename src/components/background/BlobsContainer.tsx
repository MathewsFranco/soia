import { BLOB_CONFIGS } from './utils/animation-constants'
import Blob from './Blob'
import InteractiveBlob from './InteractiveBlob'

export default function BlobsContainer() {
  return (
    <svg
      className="blobs-container"
      viewBox="0 0 100 100"
      aria-label="Animated blob background"
    >
      <title>Animated blob background</title>
      <Blob config={{ ...BLOB_CONFIGS[0], }} />
      <Blob config={{ ...BLOB_CONFIGS[1], }} />
      <Blob config={{ ...BLOB_CONFIGS[2], }} />
      <Blob config={{ ...BLOB_CONFIGS[3], }} />
      <Blob config={{ ...BLOB_CONFIGS[4], }} />
      <InteractiveBlob />
    </svg>
  )
}
