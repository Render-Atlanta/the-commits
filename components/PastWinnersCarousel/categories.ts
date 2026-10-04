import { AWARD_CATEGORIES, categoryLabel } from '@/components/PastWinners/award-categories'

export const CAROUSEL_AWARD_CATEGORIES = [
  ...AWARD_CATEGORIES,
  { value: 'lifetime-achievement', label: 'Lifetime Achievement' },
] as const

export type CarouselAwardCategory = (typeof CAROUSEL_AWARD_CATEGORIES)[number]['value']

export function carouselCategoryLabel(category?: string): string | undefined {
  return (
    CAROUSEL_AWARD_CATEGORIES.find(item => item.value === category)?.label ??
    categoryLabel(category)
  )
}
