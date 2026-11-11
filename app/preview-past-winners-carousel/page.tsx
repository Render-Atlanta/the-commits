import { notFound } from 'next/navigation'

import { PastWinnersCarousel } from '@/components/PastWinnersCarousel'

export default function PreviewPastWinnersCarouselPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <PastWinnersCarousel
        heading="Past Winners"
        intro="The builders, maintainers, and projects honored in previous years."
      />
    </main>
  )
}
