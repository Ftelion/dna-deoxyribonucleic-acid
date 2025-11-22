import {FC} from 'react'
import {useTranslation} from 'react-i18next'
import cn from 'classnames'
import {DnaIcon} from '@/shared/ui/Icon/ui/DnaIcon'

interface IDNAViewHeaderProps {
    isSideMenuOpen: boolean
    drawerWidth: number
    isResizing: boolean
}

export const DNAViewHeader: FC<IDNAViewHeaderProps> = ({isSideMenuOpen, drawerWidth, isResizing}) => {
    const {t} = useTranslation()

    return (
        <div
            className={cn(
                'text-center mb-4',
                !isResizing && 'transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)'
            )}
            style={{
                marginRight: isSideMenuOpen ? `${drawerWidth + 20}px` : '0',
            }}
        >
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2 flex items-center justify-center gap-3 group cursor-default">
                <DnaIcon className="transition-all duration-300 ease-out group-hover:scale-110 group-hover:rotate-12" />
                <span>DNA Explorer</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-300">{t('DNA_EXPLORER_SUBTITLE')}</p>
        </div>
    )
}
