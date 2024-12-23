import { Button } from '@/components/ui/button'
import { useDataQueryStore } from '@/store/edit'
import { Trash2 } from 'lucide-react'
import { memo } from 'react'
type QueryOptionRemoveButtonProps = {
  className: string
  cardId: string
}

function QueryOptionRemoveButton({ className, cardId }: QueryOptionRemoveButtonProps) {
  const removeItem = useDataQueryStore.use.removeItem()
  const handleRemoveItem = () => {
    removeItem(cardId)
  }
  return (
    <div className={className}>
      <Button
        onClick={handleRemoveItem}
      >
        <Trash2
          className="cursor-pointer"
        />
      </Button>
    </div>
  )
}

export default memo(QueryOptionRemoveButton)
