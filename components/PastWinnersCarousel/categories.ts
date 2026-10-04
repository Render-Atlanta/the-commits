import {
  AWARD_CATEGORIES,
  categoryLabel,
  type AwardCategory,
} from '@/components/PastWinners/award-categories'

export const CAROUSEL_AWARD_CATEGORIES = AWARD_CATEGORIES

export type CarouselAwardCategory = AwardCategory

export function carouselCategoryLabel(category?: string): string | undefined {
  return categoryLabel(category)
}
