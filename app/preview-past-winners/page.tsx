import { notFound } from 'next/navigation'

import { PastWinners } from '@/components/PastWinners'

export default function PreviewPastWinnersPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <PastWinners
        heading="Past Winners"
        intro="The builders, maintainers, and projects honored in previous years."
      />
    </main>
  )
}
