import {DNA_NUCLEOTIDES, LIGHTING_COLORS, UI_COLORS, TOOLTIP_COLORS} from '../lib/theme/colors'

export type DNANucleotideColor = (typeof DNA_NUCLEOTIDES)[keyof typeof DNA_NUCLEOTIDES]
export type LightingColor = (typeof LIGHTING_COLORS)[keyof typeof LIGHTING_COLORS]
export type UIPrimaryButtonColor = (typeof UI_COLORS.button.primary)[keyof typeof UI_COLORS.button.primary]
export type UISecondaryButtonColor = (typeof UI_COLORS.button.secondary)[keyof typeof UI_COLORS.button.secondary]
export type TooltipColor = (typeof TOOLTIP_COLORS)[keyof typeof TOOLTIP_COLORS]
export type TooltipShadowColor = (typeof TOOLTIP_COLORS.shadow)[keyof typeof TOOLTIP_COLORS.shadow]
