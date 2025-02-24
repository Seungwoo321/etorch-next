import {
  CardHeader
} from '@/components/ui/card'
import {
  usePanelOptionStore
} from '@/store/edit'
import PreviewCardHeaderTitle from './preview-panel-header-title'
import PreviewCardHeaderDescription from './preview-panel-header-description'
function PreviewCardHeader () {
  const title = usePanelOptionStore.use.title()
  const description = usePanelOptionStore.use.description()
  return (
    <CardHeader className='flex'>
      <PreviewCardHeaderTitle title={title} />
      <PreviewCardHeaderDescription description={description} />
    </CardHeader>
  )
}

export default PreviewCardHeader
