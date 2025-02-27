import { Badge } from '@/components/ui/badge'
import { Database } from 'lucide-react'
import { memo } from 'react'

type DataQueryTabTitleProps = {
  querySize: number
}
function DataQueryTabTitle ({ querySize }: DataQueryTabTitleProps) {
  return (
    <>
      <Database className='mr-2' size={18} />
      Queries
      <Badge variant='default' className='ml-1 py-0'> {querySize} </Badge>
    </>
  )
}

export default memo(DataQueryTabTitle)
