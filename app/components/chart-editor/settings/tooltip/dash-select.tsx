import { useTooltipOptionStore } from '@/store/editor'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { memo } from 'react'

type DashSelectProps = {
  cursorLineStyle: string
}

function DashSelect ({ cursorLineStyle }: DashSelectProps) {
  const cursorLineStyleDasharray = useTooltipOptionStore.use.cursorLineStyleDasharray()
  const updateCursorLineStyleDasharray = useTooltipOptionStore.use.updateCursorLineStyleDasharray()
  if (cursorLineStyle !== 'dash') return null
  return (
    <Select
      onValueChange={updateCursorLineStyleDasharray}
      value={cursorLineStyleDasharray}
    >
      <SelectTrigger>
        <SelectValue defaultValue='2 2' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='1 1'>1, 1</SelectItem>
        <SelectItem value='2 2'>2, 2</SelectItem>
        <SelectItem value='3 3'>3, 3</SelectItem>
        <SelectItem value='4 4'>4, 4</SelectItem>
        <SelectItem value='5 5'>5, 5</SelectItem>
      </SelectContent>
    </Select>
  )
}

export default memo(DashSelect)
