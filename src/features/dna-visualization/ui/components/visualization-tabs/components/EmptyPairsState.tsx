import {FC} from 'react'
import {useTranslation} from 'react-i18next'
import './EmptyPairsState.css'

/**
 * Компонент для отображения пустого состояния, когда нет активных пар
 */
export const EmptyPairsState: FC = () => {
    const {t} = useTranslation()

    return (
        <div className="empty-pairs">
            <p className="text">{t('NO_ACTIVE_PAIRS', 'Нет активных пар')}</p>
        </div>
    )
}
