import { Badge } from '@/components/ui/badge'
import { useDataQueryStore } from '@/store/edit'
import { Database } from 'lucide-react'

function DataQueryTabTitle () {
  const items = useDataQueryStore.use.items()
  return (
    <>
      <Database className='mr-2' size={18} />
      Queries
      <Badge variant='default' className='ml-1 py-0'> {items.length} </Badge>
    </>
  )
}

export default DataQueryTabTitle
