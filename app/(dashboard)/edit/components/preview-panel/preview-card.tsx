'use client'
import { usePanelOptionStore } from '@/store/edit'
import {
  Card,
  CardContent
} from '@/components/ui/card'
import PreviewCardHeader from './preview-card-header'
import TimeSeriesLineChart from './time-series-chart'

function PreviewCard () {
  const isTransparentBackground = usePanelOptionStore.use.isTransparentBackground()
  return (
    <Card className={`flex flex-col h-[calc(100%-2.5rem)] ${isTransparentBackground ? '' : 'bg-primary-foreground'}`}>
      <PreviewCardHeader />
      <CardContent className="flex h-[calc(100%-90px)] flex-grow">
        <TimeSeriesLineChart />
      </CardContent>
    </Card>
  )
}

export default PreviewCard
