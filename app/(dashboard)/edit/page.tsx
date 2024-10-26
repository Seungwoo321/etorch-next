import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from '@/components/ui/resizable'
import DataTabs from './components/data-panel/data-tabs'
import GlobalOption from './components/global-option'
import OptionsPanel from './components/options-panel/options-panel'
import PreviewCard from './components/preview-panel/preview-card'
// import { redirect } from 'next/navigation'
// import { createClient } from '@/lib/supabase/server'
export default async function Page (): Promise<JSX.Element> {
  // const supabase = await createClient()

  // const { data, error } = await supabase.auth.getUser()
  // if (error || !data?.user) {
  //   redirect('/login')
  // }
  return (
    <div className="py-3 h-full">
      <ResizablePanelGroup
        direction="horizontal"
      >
        <ResizablePanel
          defaultSize={80}
          minSize={50}
        >
          <ResizablePanelGroup
            direction="vertical"
          >
            <ResizablePanel
              order={1}
              defaultSize={60}
              minSize={5}
            >
              <GlobalOption/>
              <PreviewCard/>
            </ResizablePanel>
            <ResizableHandle
              className="mt-2 mb-2 p-1"
              withHandle
            />
            <ResizablePanel
              order={2}
              defaultSize={40}
            >
              <DataTabs />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle
          className="ml-2 mr-2 w-2"
          withHandle
        />
        <ResizablePanel
          order={3}
          defaultSize={20}
        >
          <OptionsPanel/>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
