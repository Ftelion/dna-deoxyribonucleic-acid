import {FC, ReactNode, CSSProperties} from 'react'
import './PairCard.css'

interface IPairCardProps {
    color: string
    label: string
    description: ReactNode
}

/**
 * Компонент для отображения карточки типа пары
 */
const PairCard: FC<IPairCardProps> = ({color, label, description}) => {
    return (
        <div
            className="group p-3 mb-3 rounded-xl bg-gradient-to-br from-[var(--pair-color-20)] to-[var(--pair-color-10)] border border-[var(--pair-color-40)] shadow-lg shadow-[var(--pair-color-20)] transition-all duration-200 ease-out cursor-default hover:from-[var(--pair-color-30)] hover:to-[var(--pair-color-20)] hover:border-[var(--pair-color-60)] hover:translate-x-0.5"
            style={
                {
                    '--pair-color': color,
                    '--pair-color-10': color + '10',
                    '--pair-color-20': color + '20',
                    '--pair-color-30': color + '30',
                    '--pair-color-40': color + '40',
                    '--pair-color-60': color + '60',
                } as CSSProperties
            }
        >
            <div className="flex items-center gap-3 mb-2">
                <div className="w-3.5 h-3.5 rounded-full bg-[var(--pair-color)] border-2 border-[var(--pair-color)] flex-shrink-0 transition-all duration-300 ease-out group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[var(--pair-color-40)]" />
                <span className="font-semibold text-md transition-all duration-300 ease-out text-pair-card group-hover:text-pair-card-hover">
                    {label}
                </span>
            </div>
            <p className="font-normal text-sm pl-7 transition-all duration-300 ease-out text-pair-card group-hover:text-pair-card-hover">
                {description}
            </p>
        </div>
    )
}

export default PairCard
