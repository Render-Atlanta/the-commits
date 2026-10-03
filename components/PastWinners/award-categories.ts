export const AWARD_CATEGORIES = [
  { value: 'commit-of-the-year', label: 'Commit of the Year' },
  { value: 'maintainer-of-the-year', label: 'Maintainer of the Year' },
  { value: 'small-large-project-of-the-year', label: 'Small & Large Project of the Year' },
  { value: 'rising-star-contributor', label: 'Rising Star Contributor' },
  { value: 'documentation-design-excellence', label: 'Documentation & Design Excellence' },
  { value: 'open-source-for-good', label: 'Open Source for Good' },
  { value: 'corporate-contributor-of-the-year', label: 'Corporate Contributor of the Year' },
  { value: 'community-choice-award', label: 'Community Choice Award' },
  { value: 'unsung-hero-award', label: 'Unsung Hero Award' },
] as const

export type AwardCategory = (typeof AWARD_CATEGORIES)[number]['value']

const CATEGORY_LABELS = new Map<string, string>(
  AWARD_CATEGORIES.map(category => [category.value, category.label])
)

export function categoryLabel(category?: string): string | undefined {
  if (!category) return undefined
  return CATEGORY_LABELS.get(category)
}

export function categoryRank(category?: string): number {
  const index = AWARD_CATEGORIES.findIndex(item => item.value === category)
  return index === -1 ? AWARD_CATEGORIES.length : index
}
