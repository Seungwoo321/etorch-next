'use client'
import { memo } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import DataQueryTabTitle from './data-query-tab-title'
import DataMappingTabTitle from './data-mapping-tab-title'
import DataQueryTab from './data-query-tab'

function DataTabs (): JSX.Element {
  return (
    <Tabs
      className="flex-col flex md:order-2 w-full h-full"
      defaultValue="query"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="query">
          <DataQueryTabTitle/>
        </TabsTrigger>
        <TabsTrigger value="data-mapping">
          <DataMappingTabTitle/>
        </TabsTrigger>
      </TabsList>
      <ScrollArea className="h-min-0 rounded-xl">
        <TabsContent value="query" className="space-y-4">
          <DataQueryTab/>
        </TabsContent>
        <TabsContent value="data-mapping">
          {/* <DataPanelDataMapping /> */}
        </TabsContent>
      </ScrollArea>
    </Tabs>
  )
}

export default memo(DataTabs)
