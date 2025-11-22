import {FC} from 'react'
import {useTranslation} from 'react-i18next'
import InfoCard from '@/shared/ui/InfoCard/ui/InfoCard'

interface ISelectedPairInfoProps {
    selectedId: number | null
}

/**
 * Компонент для отображения информации о выбранной паре
 */
export const SelectedPairInfo: FC<ISelectedPairInfoProps> = ({selectedId}) => {
    const {t} = useTranslation()

    if (selectedId === null) {
        return null
    }

    return (
        <InfoCard>
            <h3 className="text-[#2563eb] text-sm font-semibold mb-2">
                {t('PAIR_FACT_TITLE', 'Интересный факт о паре №{{number}}', {number: selectedId + 1})}
            </h3>
            <p className="text-[#1e40af] font-normal text-sm">
                {t(`PAIR_FACT_${selectedId + 1}`, 'Интересный факт о этой паре')}
            </p>
        </InfoCard>
    )
}
