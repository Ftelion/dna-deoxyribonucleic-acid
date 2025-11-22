import {FC} from 'react'
import cn from 'classnames'

interface IChevronIconProps {
    isOpen: boolean
    iconColor?: string
    className?: string
}

export const ChevronIcon: FC<IChevronIconProps> = ({
    isOpen,
    iconColor = '#2E85FF',
    className = 'w-5 h-5 text-gray-500',
}) => {
    return (
        <svg
            className={cn(
                className,
                'align-middle transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
                {
                    'rotate-180 drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)]': isOpen,
                    'rotate-0': !isOpen,
                }
            )}
            width="18"
            height="18"
            viewBox="0 0 10 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M8.70033 0.266004C8.9212 0.100765 9.23495 0.145895 9.40053 0.36659C9.56589 0.587428 9.5206 0.901143 9.29994 1.06679L5.29994 4.06679C5.12229 4.19981 4.87798 4.19981 4.70033 4.06679L0.700333 1.06679L0.625137 0.997449C0.471324 0.823534 0.455159 0.559681 0.599747 0.36659C0.744689 0.173518 1.0029 0.11504 1.21303 0.214246L1.29994 0.266004L5.00014 3.04042L8.70033 0.266004Z"
                fill={iconColor}
            />
        </svg>
    )
}
