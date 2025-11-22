import {FC} from 'react'
import {useTranslation} from 'react-i18next'
import {SectionTitle} from '@/shared/ui/Typography/ui/SectionTitle'
import {DNA_NUCLEOTIDES} from '@/shared/lib/theme/colors'
import PairCard from '../PairCard/PairCard'
import cn from 'classnames'

interface IPairInfoProps {
    className?: string
}

const PairInfo: FC<IPairInfoProps> = ({className = ''}) => {
    const {t} = useTranslation()

    const pairData = [
        {
            color: DNA_NUCLEOTIDES.adenineThymine,
            labelKey: 'AT_PAIRS_LABEL',
            descriptionKey: 'AT_BOND_DESC',
        },
        {
            color: DNA_NUCLEOTIDES.guanineCytosine,
            labelKey: 'GC_PAIRS_LABEL',
            descriptionKey: 'GC_BOND_DESC',
        },
    ]

    return (
        <div className="pl-1 pr-2 mb-6">
            <SectionTitle titleKey="PAIR_TYPES_INFO" color="light-gray" />
            <div className={cn('pl-2 pr-1', className)}>
                {pairData.map((pair) => (
                    <PairCard
                        key={pair.labelKey}
                        color={pair.color}
                        label={t(pair.labelKey)}
                        description={t(pair.descriptionKey)}
                    />
                ))}
            </div>
        </div>
    )
}

export default PairInfo
