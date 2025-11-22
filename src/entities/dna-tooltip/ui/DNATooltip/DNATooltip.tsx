import {FC} from 'react'
import {useDNATooltip} from '../../lib/useDNATooltip'
import {TooltipItem} from '../TooltipItem/TooltipItem'

const DNATooltip: FC = () => {
    const {tooltipDataList, hasTooltips} = useDNATooltip()

    if (!hasTooltips) {
        return null
    }

    return (
        <div className="absolute bottom-8 left-8 flex flex-col gap-3 pointer-events-none z-10">
            {tooltipDataList.map((tooltipData) => (
                <TooltipItem key={tooltipData.id} tooltipData={tooltipData} />
            ))}
        </div>
    )
}

export default DNATooltip
