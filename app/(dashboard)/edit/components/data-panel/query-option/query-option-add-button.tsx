import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { memo, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useDataQueryStore } from '@/store/edit'

function QueryOptionAddButton() {
  const addItem = useDataQueryStore.use.addItem()
  const handleAddPanel = useCallback(() => {
    const id = uuidv4()
    addItem({
      id,
      origin: '',
      code: '',
      unit: ''
    })
  }, [])
  return (
    <Button
      className="rounded-xl w-full"
      type="button"
      onClick={handleAddPanel}
    >
      <Plus className="mr-2" />
      Add Query
    </Button>
  )
}

export default memo(QueryOptionAddButton)
