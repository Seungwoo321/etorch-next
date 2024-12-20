import { Button } from '@/components/ui/button'
import { QueryOption } from '@/lib/definitions'
import { useDataQueryStore, useGlobalOptionStore } from '@/store/edit'
import { Trash2 } from 'lucide-react'
import { fetchIndicatorValues } from '@/lib/data'
import { memo } from 'react'
type QueryOptionRemoveButtonProps = {
  className: string
  cardId: string
}

function QueryOptionRemoveButton({ className, cardId }: QueryOptionRemoveButtonProps) {
  // const dataValues = useDataQueryStore.use.dataValues()
  const setDataValues = useDataQueryStore.use.setDataValues()
  const setUnitDataKeyList = useDataQueryStore.use.setUnitDataKeyList()
  const removeItem = useDataQueryStore.use.removeItem()

  console.log(cardId)
  const handleRemoveItem = () => {
    removeItem(cardId)
    // removeDataValues(id)
    // removeUnitDataKeyList(option.unit, option.code)
    // updateXAxisDataKey('')
    // updateYAxisDataKey('')
    // updateYAxisUnit('')
  }
  // const handleFetchData = async () => {
  //   const data = await fetchIndicatorValues({
  //     origin: option.origin,
  //     code: option.code,
  //     frequency,
  //     timeRagne
  //   })
  //   setDataValues(option.id, data)
  //   setUnitDataKeyList(option.unit, [...Object.keys(data[0]).filter(v => v !== 'value'), option.code])
  // }
  return (
    <div className={className}>
      <Button
      // variant={dataValues[option.id] ? 'default' : 'outline'}
      // onClick={handleFetchData}
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
