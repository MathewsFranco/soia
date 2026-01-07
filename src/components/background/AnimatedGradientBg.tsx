import BlobFilter from './BlobFilter'
import BlobsContainer from './BlobsContainer'
import LogoOverlay from './LogoOverlay'

export default function AnimatedGradientBg() {
  return (
    <section className='h-[100vh] flex justify-center items-center'>
      <BlobFilter />
      <BlobsContainer />
      <LogoOverlay />
    </section>
  )
}
