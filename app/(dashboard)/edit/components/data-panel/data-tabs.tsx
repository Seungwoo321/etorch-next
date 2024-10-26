'use client'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import {
  Database,
  Plus
} from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useDataQueryStore } from '@/store/edit'
import { v4 as uuidv4 } from 'uuid'
import DataQueryTab from './data-query-tab'

export default function DataTabs (): JSX.Element {
  const openPanel = useDataQueryStore.use.openPanel()
  const addItem = useDataQueryStore.use.addItem()
  const items = useDataQueryStore.use.items()
  const handleAddPanel = () => {
    const id = uuidv4()
    addItem({
      id,
      origin: '',
      code: '',
      unit: ''
    })
    openPanel(id)
  }

  return (
    <Tabs
      className="flex-col flex md:order-2 w-full h-full"
      defaultValue="query"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="query">
          <Database className="mr-2" size={18} />
          Queries
          <Badge variant="default" className="ml-1 py-0">
            {items.length}
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="data-mapping">Data mapping</TabsTrigger>
      </TabsList>
      <ScrollArea className="h-min-0 rounded-xl">
        <TabsContent value="query" className="space-y-4">
          <DataQueryTab/>
          <Button
            className="rounded-xl w-full"
            type="button"
            onClick={handleAddPanel}
          >
            <Plus className="mr-2" />
            Add Query
          </Button>
        </TabsContent>
        <TabsContent value="data-mapping">
          {/* <DataPanelDataMapping /> */}
        </TabsContent>
      </ScrollArea>
    </Tabs>
  )
}
