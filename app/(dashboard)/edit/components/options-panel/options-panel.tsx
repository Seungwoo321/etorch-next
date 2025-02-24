'use client'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import VisualizationsSelect from './visualizations-select'
import SelectionPanel from './selection/selection-panel'
import SelectionTooltip from './selection/selection-tooltip'
import SelectionLegend from './selection/selection-legend'
import SelectionXAxis from './selection/selection-x-axis'
import SelectionYAxis from './selection/selection-y-axis'
import SelectionYAxisSecondary from './selection/selection-y-axis-secondary'

import { ScrollArea } from '@/components/ui/scroll-area'
import type { JSX } from 'react'
function OptionsPanel (): JSX.Element {
  return (
    <ScrollArea className='h-min-0 rounded-xl'>
      <div className='h-full'>
        <div className='p-1'>
          {/* <VisualizationsComboBox/> */}
          <VisualizationsSelect />
        </div>
        <div className='h-[calc(100%-60px)]'>
          <div className='flex p-2'>

            <Accordion className='w-full' type='single' collapsible>
              <AccordionItem value='panel-options'>
                <AccordionTrigger>Panel options</AccordionTrigger>
                <AccordionContent>
                  <SelectionPanel />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value='tooltip'>
                <AccordionTrigger>Tooltip</AccordionTrigger>
                <AccordionContent>
                  <SelectionTooltip />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value='legend'>
                <AccordionTrigger>Legend</AccordionTrigger>
                <AccordionContent>
                  <SelectionLegend />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value='x-axis'>
                <AccordionTrigger>X-Axis</AccordionTrigger>
                <AccordionContent>
                  <SelectionXAxis />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value='y-axis'>
                <AccordionTrigger>Y-Axis</AccordionTrigger>
                <AccordionContent>
                  <ScrollArea className='h-[300px] rounded-xl'>
                    <SelectionYAxis />
                  </ScrollArea>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value='y-axis-scondary'>
                <AccordionTrigger>Y-Axis (Scondary)</AccordionTrigger>
                <AccordionContent>
                  <ScrollArea className='h-[300px] rounded-xl'>
                    <SelectionYAxisSecondary />
                  </ScrollArea>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value='graph-styles'>
                <AccordionTrigger>Graph styles</AccordionTrigger>
                <AccordionContent>
                  {/* <SelectionGraphStyle /> */}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}

export default OptionsPanel
