import {
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card'
import {
  usePanelOptionStore
} from '@/store/edit'

function PreviewCardHeader () {
  const title = usePanelOptionStore.use.title()
  const description = usePanelOptionStore.use.description()
  if (title === '') return null
  return (
    <CardHeader className="flex">
      <CardTitle>
        {title}
      </CardTitle>
      {description !== '' && (
        <CardDescription>
          {description}
        </CardDescription>
      )}
    </CardHeader>
  )
}

export default PreviewCardHeader
