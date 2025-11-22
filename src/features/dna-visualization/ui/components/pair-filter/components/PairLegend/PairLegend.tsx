import {FC} from 'react'
import PairLegendItem from '../PairLegendItem/PairLegendItem'
import {SectionTitle} from '@/shared/ui/Typography/ui/SectionTitle'
import {useDNAViewStore} from '@/features/dna-visualization/model/stores/useDNAViewStore'
import {DNA_PAIR_TYPES} from '@/shared/types'

interface IPairLegendProps {
    className?: string
}

/**
 * Компонент для отображения легенды типов пар в фильтре
 */
const PairLegend: FC<IPairLegendProps> = ({className = ''}) => {
    const {showATPairs, showGCPairs, setShowATPairs, setShowGCPairs} = useDNAViewStore((s) => ({
        showATPairs: s.showATPairs,
        showGCPairs: s.showGCPairs,
        setShowATPairs: s.setShowATPairs,
        setShowGCPairs: s.setShowGCPairs,
    }))

    const legendItems = [
        {
            labelKey: 'AT_PAIRS_LABEL',
            isActive: showATPairs,
            onToggle: () => setShowATPairs(!showATPairs),
            pairType: DNA_PAIR_TYPES.AT,
        },
        {
            labelKey: 'GC_PAIRS_LABEL',
            isActive: showGCPairs,
            onToggle: () => setShowGCPairs(!showGCPairs),
            pairType: DNA_PAIR_TYPES.GC,
        },
    ]

    return (
        <>
            <SectionTitle titleKey="PAIR_TYPES_FILTER" size="sm" color="light-gray" />
            <div className={className}>
                {legendItems.map((item) => (
                    <PairLegendItem
                        key={item.labelKey}
                        labelKey={item.labelKey}
                        isActive={item.isActive}
                        onToggle={item.onToggle}
                        pairType={item.pairType}
                    />
                ))}
            </div>
        </>
    )
}

export default PairLegend
