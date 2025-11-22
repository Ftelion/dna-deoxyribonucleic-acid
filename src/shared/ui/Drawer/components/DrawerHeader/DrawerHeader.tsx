import {FC} from 'react'
import './DrawerHeader.css'

interface IDrawerHeaderProps {
    title?: string
    onClose: () => void
}

/**
 * Заголовок Drawer с кнопкой закрытия
 */
const DrawerHeader: FC<IDrawerHeaderProps> = ({title, onClose}) => (
    <>
        {title && (
            <div
                className="text-[1.5rem] font-bold -mt-1 bg-clip-text text-transparent"
                style={{
                    backgroundImage: `linear-gradient(135deg, var(--color-drawer-header-text-gradient-from), var(--color-drawer-header-text-gradient-to))`,
                }}
            >
                {title}
            </div>
        )}
        <button className="close-button" onClick={onClose}>
            &times;
        </button>
    </>
)

export default DrawerHeader
