import React from 'react'
import { useDataQueryStore } from '@/store/edit'
import QueryOptionCard from './query-option-card'
function DataQueryTab () {
  const items = useDataQueryStore.use.items()
  return (
    <div className="grid gap-4">
      {items.map(item => (
        <QueryOptionCard
          key={item.id}
          id={item.id}
        />
      ))}
    </div>
  )
}

export default DataQueryTab
