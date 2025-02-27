import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from '@/components/ui/resizable'
import GlobalOption from '../shared/global-option'
import DataPanel from './data/data-panel'
import VisualizationPanel from './visualization/visualization-panel'
import SettingsPanel from './settings/settings-panel'

function ChartEditor () {
  return (
    <ResizablePanelGroup
      direction='horizontal'
    >
      <ResizablePanel
        defaultSize={80}
        minSize={50}
      >
        <ResizablePanelGroup
          direction='vertical'
        >
          <ResizablePanel
            order={1}
            defaultSize={60}
            minSize={5}
          >
            <GlobalOption />
            <VisualizationPanel />
          </ResizablePanel>
          <ResizableHandle
            className='mt-2 mb-2 p-1'
            withHandle
          />
          <ResizablePanel
            order={2}
            defaultSize={40}
          >
            <DataPanel />
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
      <ResizableHandle
        className='ml-2 mr-2 w-2'
        withHandle
      />
      <ResizablePanel
        order={3}
        defaultSize={20}
      >
        <SettingsPanel />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default ChartEditor
