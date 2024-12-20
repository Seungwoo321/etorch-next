import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from '@/components/ui/resizable'
import GlobalOption from './components/global-option'
import DataPanel from './components/data-panel/data-panel'
import OptionsPanel from './components/options-panel/options-panel'
import PreviewPanel from './components/preview-panel/preview-panel'
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
              <PreviewPanel/>
            </ResizablePanel>
            <ResizableHandle
              className="mt-2 mb-2 p-1"
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
