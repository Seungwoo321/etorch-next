'use client'
import React, { memo } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { useDataQueryStore } from '@/store/editor'
import { ScrollArea } from '@/components/ui/scroll-area'
import DataQueryTabTitle from './query-tab/data-query-tab-title'
import DataMappingTabTitle from './mapping-tab/mapping-tab-title'
import DataQueryTab from './query-tab/query-tab-content'
import DataMappingTab from './mapping-tab/mapping-tab-content'

function DataPanel () {
  const items = useDataQueryStore.use.items()
  return (
    <Tabs
      className='flex-col flex md:order-2 w-full h-full'
      defaultValue='query'
    >
      <TabsList className='grid w-full grid-cols-2'>
        <TabsTrigger value='query'>
          <DataQueryTabTitle querySize={items.length} />
        </TabsTrigger>
        <TabsTrigger value='data-mapping'>
          <DataMappingTabTitle />
        </TabsTrigger>
      </TabsList>
      <ScrollArea className='h-min-0 rounded-xl'>
        <TabsContent value='query' className='space-y-4'>
          <DataQueryTab />
        </TabsContent>
        <TabsContent value='data-mapping'>
          <DataMappingTab />
        </TabsContent>
      </ScrollArea>
    </Tabs>
  )
}

export default memo(DataPanel)
