import {FC} from 'react'
import {useTranslation} from 'react-i18next'
import ResetButton from '@/shared/ui/Buttons/ui/ResetButton'
import {ITooltipData} from '@/entities/dna-tooltip/types/types'
import {ActiveTooltips} from './ActiveTooltips'
import {SelectedPairInfo} from './SelectedPairInfo'

interface IActivePairsSectionProps {
    tooltips: ITooltipData[]
    isDrawerSmall: boolean
    selectedId: number | null
    onResetPairs: () => void
}

/**
 * Компонент для секции активных пар с tooltip'ами и информацией
 */
export const ActivePairsSection: FC<IActivePairsSectionProps> = ({
    tooltips,
    isDrawerSmall,
    selectedId,
    onResetPairs,
}) => {
    const {t} = useTranslation()

    return (
        <>
            <ActiveTooltips tooltips={tooltips} isDrawerSmall={isDrawerSmall} />
            <SelectedPairInfo selectedId={selectedId} />
            <ResetButton onClick={onResetPairs}>{t('RESET_PAIRS', 'Сбросить пары')}</ResetButton>
        </>
    )
}
