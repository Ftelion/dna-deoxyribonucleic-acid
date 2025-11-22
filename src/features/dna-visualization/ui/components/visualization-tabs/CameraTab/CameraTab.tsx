import {FC} from 'react'
import {TabWrapper} from '../TabWrapper'
import {useDNAViewStore} from '../../../../model/stores/useDNAViewStore'
import {ICameraTabProps} from './types'
import {MemoizedCoordinateSection} from './components/CoordinateSection'
import {createHandleCoordinateChange} from './lib/helpers'
import ResetButton from '@/shared/ui/Buttons/ui/ResetButton'

export const CameraTab: FC<ICameraTabProps> = ({resetCamera}) => {
    const {cameraPosition, cameraTarget, setCameraPosition, setCameraTarget} = useDNAViewStore((s) => ({
        cameraPosition: s.cameraPosition,
        cameraTarget: s.cameraTarget,
        setCameraPosition: s.setCameraPosition,
        setCameraTarget: s.setCameraTarget,
    }))

    const handleCoordinateChange = createHandleCoordinateChange(
        setCameraPosition,
        setCameraTarget,
        cameraPosition,
        cameraTarget
    )

    return (
        <TabWrapper titleKey="CAMERA_SECTION" tabKey="camera">
            <div className="space-y-6">
                <MemoizedCoordinateSection
                    titleKey="CAMERA_POSITION"
                    type="position"
                    values={cameraPosition}
                    onChange={handleCoordinateChange}
                />

                <MemoizedCoordinateSection
                    titleKey="CAMERA_TARGET"
                    type="target"
                    values={cameraTarget}
                    onChange={handleCoordinateChange}
                />

                <ResetButton onClick={resetCamera} />
            </div>
        </TabWrapper>
    )
}
