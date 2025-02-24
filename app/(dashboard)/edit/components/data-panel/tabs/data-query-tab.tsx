import { memo } from 'react'
import { useDataQueryStore } from '@/store/edit'
import QueryOptionCard from '../query-option/query-option-card'
import QueryOptionAddButton from '../query-option/query-option-add-button'

function DataQueryTab () {
  const items = useDataQueryStore.use.items()
  return (
    <>
      <div className='grid gap-4'>
        {items.map(item => (
          <QueryOptionCard
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
