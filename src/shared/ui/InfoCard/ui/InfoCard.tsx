import {FC, ReactNode} from 'react'
import cn from 'classnames'

interface IInfoCardProps {
    children: ReactNode
    className?: string
}

/**
 * Компонент-обертка с градиентным фоном для информационных карточек "Интересный факт о паре №{{number}}"
 */
const InfoCard: FC<IInfoCardProps> = ({children, className = ''}) => {
    return (
        <div
            className={cn(
                'bg-gradient-to-br from-[rgba(59,130,246,0.06)] to-[rgba(147,197,253,0.06)] border border-[rgba(59,130,246,0.2)] rounded-xl p-4 shadow-[0_2px_8px_rgba(59,130,246,0.08)]',
                className
            )}
        >
            {children}
        </div>
    )
}

export default InfoCard
