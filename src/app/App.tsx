import {FC} from 'react'
import {Providers} from './providers/index'
import DNAView from '@/pages/dna-view/ui/DNAView'

const App: FC = () => {
    return (
        <Providers>
            <DNAView />
        </Providers>
    )
}

export default App
