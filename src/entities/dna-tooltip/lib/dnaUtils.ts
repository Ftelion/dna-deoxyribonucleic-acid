import {DNA_NUCLEOTIDES} from '@/shared/lib/theme/colors'
import type {DNANucleotideColor} from '@/shared/types/colors'

/**
 * Получаем цвет нуклеотида по индексу (чередуем A-T и G-C)
 */
export const getNucleotideColor = (index: number): DNANucleotideColor => {
    return index % 2 === 0 ? DNA_NUCLEOTIDES.adenineThymine : DNA_NUCLEOTIDES.guanineCytosine
}

/**
 * Получаем тип базовой пары по индексу пары
 */
export const getBasePairType = (pairId: number): 'AT' | 'GC' => {
    return pairId % 2 === 0 ? 'AT' : 'GC'
}
