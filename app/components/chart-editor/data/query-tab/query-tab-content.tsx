import { memo } from 'react'
import { useDataQueryStore } from '@/store/editor'
import QueryListCard from './query-list-card/query-list-card'
import QueryOptionAddButton from './query-list-card/add-query-button'

function DataQueryTab () {
  const items = useDataQueryStore.use.items()
  return (
    <>
      <div className='grid gap-4'>
        {items.map(item => (
          <QueryListCard
            key={item.id}
            {...item}
          />
        ))}
      </div>
      <QueryOptionAddButton />
    </>
  )
}

export default memo(DataQueryTab)
