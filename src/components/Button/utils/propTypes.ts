import icons from '../../Icon/icons'

export const tuple = <T extends string[]>(...args: T) => args

export const buttonTypes = tuple('default', 'menu-default', 'primary', 'menu-primary')
export const labelTypes = tuple(
  'primary',
  'secondary',
  'green',
  'gray-icon',
  'orange-icon',
  'sticky-icon',
  'green-icon'
)
export const iconsNames = tuple(...Object.keys(icons))

export type ButtonTypes = (typeof buttonTypes)[number]
export type IconNames = (typeof iconsNames)[number]
export type LabelTypes = (typeof labelTypes)[number]
