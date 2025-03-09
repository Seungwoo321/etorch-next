import { Button } from '@/components/ui/button'
import { RefreshCw } from 'lucide-react'
import { memo } from 'react'
type RefreshQueryIconProps = {
  className: string
  code: string
  onQueryDataRefresh: (code: string) => void
}

function RefreshQueryIcon ({ className, code, onQueryDataRefresh }: RefreshQueryIconProps) {
  return (
    <div className={className}>
      <Button
        className='w-full'
        disabled={!code}
        onClick={() => onQueryDataRefresh(code)}
      >
        <RefreshCw
          className='cursor-pointer'
        />
      </Button>
    </div>
  )
}

export default memo(RefreshQueryIcon)
