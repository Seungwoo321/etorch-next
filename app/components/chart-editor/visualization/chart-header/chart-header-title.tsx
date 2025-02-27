import {
  CardTitle
} from '@/components/ui/card'
import { memo } from 'react'
type ChartHeaderTitleProps = {
  title: string
}
function ChartHeaderTitle ({ title }: ChartHeaderTitleProps) {
  if (title === '') return null
  return (
    <CardTitle>
      {title}
    </CardTitle>
  )
}

export default memo(ChartHeaderTitle)
