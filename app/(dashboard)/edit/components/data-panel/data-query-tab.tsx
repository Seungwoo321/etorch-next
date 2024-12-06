import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useDataQueryStore } from '@/store/edit'
import QueryOptionCard from './query-option-card'
import { v4 as uuidv4 } from 'uuid'
import { QueryOption } from '@/lib/definitions'

function DataQueryTab () {
  const [openPanelLocal, setOpenPanelLocal] = useState<string[]>([])
  const [queryOptions, setQueryOptions] = useState<QueryOption[]>([])
  const openPanels = useDataQueryStore.use.openPanels()
  const items = useDataQueryStore.use.items()
  const openPanel = useDataQueryStore.use.openPanel()
  const addItem = useDataQueryStore.use.addItem()
  const handleAddPanel = useCallback(() => {
    const id = uuidv4()
    addItem({
      id,
      origin: '',
      code: '',
      unit: ''
    })
    openPanel(id)
  }, [addItem, openPanel])

  useEffect(() => {
    setOpenPanelLocal(openPanels)
  }, [openPanels])

  useEffect(() => {
    setQueryOptions(items)
  }, [items])
  
  return (
    <>
      <div className="grid gap-4">
        {queryOptions.map(item => (
          <QueryOptionCard
            option={item}
            key={item.id}
            id={item.id}
            open={openPanelLocal.includes(item.id)}
          />
        ))}
      </div>
      <Button
        className="rounded-xl w-full"
        type="button"
        onClick={handleAddPanel}
      >
        <Plus className="mr-2" />
        Add Query
      </Button>
    </>
  )
}

export default memo(DataQueryTab)
