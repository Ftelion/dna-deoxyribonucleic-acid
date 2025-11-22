import {FC} from 'react'
import cn from 'classnames'
import DNAScene from '@/features/dna-visualization/ui/DNAScene'
import './DNASceneContainer.css'

interface IDNASceneContainerProps {
    isSideMenuOpen: boolean
    drawerWidth: number
    isResizing: boolean
}

export const DNASceneContainer: FC<IDNASceneContainerProps> = ({isSideMenuOpen, drawerWidth, isResizing}) => {
    return (
        <div
            className={cn('relative border-2 border-gray-200 rounded-lg overflow-hidden shadow-lg', {
                'dna-scene-resizing': isResizing,
                'dna-scene-animated': !isResizing,
            })}
            style={{
                margin: isSideMenuOpen ? `0 ${drawerWidth + 20}px 0 1.5rem` : '0 1.5rem',
            }}
        >
            <DNAScene />
        </div>
    )
}
