'use client'
import { usePanelOptionStore } from '@/store/editor'
import {
  Card,
  CardContent
} from '@/components/ui/card'
import ChartHeader from './chart-header'
import ChartArea from './chart-area'

function VisualizationPanel () {
  const isTransparentBackground = usePanelOptionStore.use.isTransparentBackground()
  return (
    <Card className={`flex flex-col h-[calc(100%-2.5rem)] ${isTransparentBackground ? '' : 'bg-primary-foreground'}`}>
      <ChartHeader />
      <CardContent className='flex h-[calc(100%-90px)] flex-grow'>
        <ChartArea />
      </CardContent>
    </Card>
  )
}

export default VisualizationPanel
