export type WinnerLink = {
  href: string
  target?: '_self' | '_blank'
}

export type WinnerImage = {
  url?: string
  dimensions?: {
    width: number
    height: number
  }
}

export type Winner = {
  name?: string
  project?: string
  category?: string
  year?: string
  image?: WinnerImage
  imageAlt?: string
  projectLink?: WinnerLink
  linkedin?: WinnerLink
  x?: WinnerLink
  instagram?: WinnerLink
}
