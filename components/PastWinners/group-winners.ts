import { categoryRank } from './award-categories'
import { Winner } from './types'

export type YearGroup = {
  year: string
  winners: Winner[]
}

function yearValue(year?: string): number {
  const match = year?.match(/\d{4}/)
  return match ? Number(match[0]) : Number.NEGATIVE_INFINITY
}

export function yearKey(year?: string): string {
  const match = year?.match(/\d{4}/)
  return match ? match[0] : 'Undated'
}

function matchesYear(winner: Winner, yearFilter?: string): boolean {
  const query = yearFilter?.trim()
  if (!query) return true

  const queryYear = query.match(/\d{4}/)?.[0]
  if (queryYear) return yearKey(winner.year) === queryYear

  return (winner.year ?? '').trim().toLowerCase() === query.toLowerCase()
}

export function groupWinners(winners: Winner[], yearFilter?: string): YearGroup[] {
  const sorted = winners
    .map((winner, index) => ({ winner, index }))
    .filter(({ winner }) => matchesYear(winner, yearFilter))
    .sort((a, b) => {
      const yearDiff = yearValue(b.winner.year) - yearValue(a.winner.year)
      if (yearDiff !== 0) return yearDiff

      const categoryDiff = categoryRank(a.winner.category) - categoryRank(b.winner.category)
      if (categoryDiff !== 0) return categoryDiff

      return a.index - b.index
    })
    .map(({ winner }) => winner)

  const groups: YearGroup[] = []

  for (const winner of sorted) {
    const year = yearKey(winner.year)
    const current = groups[groups.length - 1]

    if (current?.year === year) current.winners.push(winner)
    else groups.push({ year, winners: [winner] })
  }

  return groups
}
