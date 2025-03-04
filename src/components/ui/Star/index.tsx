import { useId } from 'react'

interface RateProps {
  value: number
  maxStars?: number
  size?: number
  activeColor?: string
  inactiveColor?: string
  spacing?: number
}

interface StarIconProps {
  filled: number
  activeColor?: string
  inactiveColor?: string
  spacing?: number
}

const StarIcon = ({
  filled,
  activeColor = '#ffd700',
  inactiveColor = '#e0e0e0',
  spacing = 0,
}: StarIconProps) => {
  const clipId = useId()

  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      style={{ display: 'inline-block', marginRight: spacing }}
    >
      <path
        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
        fill={inactiveColor}
      />

      <path
        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
        fill={activeColor}
        clipPath={`url(#${clipId})`}
      />

      <defs>
        <clipPath id={clipId}>
          <rect x="0" y="0" width={24 * filled} height="24" />
        </clipPath>
      </defs>
    </svg>
  )
}

export const Rate = ({
  value = 0,
  maxStars = 5,
  size = 24,
  activeColor = '#ffd700',
  inactiveColor = '#e0e0e0',
  spacing = 0,
}: RateProps) => {
  const stars = Array.from({ length: maxStars }, (_, index) => {
    const integerPart = Math.floor(value)
    const decimalPart = value - integerPart

    let filled = 0
    if (index < integerPart) {
      filled = 1
    } else if (index === integerPart && decimalPart > 0) {
      filled = decimalPart
    }

    return (
      <StarIcon
        key={index}
        filled={filled}
        activeColor={activeColor}
        inactiveColor={inactiveColor}
        spacing={spacing}
      />
    )
  })

  return <div style={{ fontSize: size, display: 'flex', alignItems: 'center' }}>{stars}</div>
}
