'use client'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { ScrollArea } from '@/components/ui/scroll-area'
import GraphStylesSection from './graph-styles/graph-styles-section'
import VisualizationsSelect from './visualizations-select'
import PanelOptionsSection from './panel-options/panel-options-section'
import TooltipSection from './tooltip/tooltip-section'
import LegendSection from './legend/legend-section'
import XAxisSection from './x-axis/x-axis-section'
import YAxisSection from './y-axis/y-axis-section'
import YAxisSecondarySection from './y-axis-secondary/y-axis-secondary-section'

function SettingsPanel () {
  return (
    <ScrollArea className='h-min-0 rounded-xl'>
      <div className='h-full'>
        <div className='p-1'>
          <VisualizationsSelect />
        </div>
        <div className='h-[calc(100%-60px)]'>
          <div className='flex p-2'>

            <Accordion className='w-full' type='single' collapsible>
              <AccordionItem value='panel-options'>
                <AccordionTrigger>Panel options</AccordionTrigger>
                <AccordionContent>
                  <PanelOptionsSection />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value='tooltip'>
                <AccordionTrigger>Tooltip</AccordionTrigger>
                <AccordionContent>
                  <TooltipSection />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value='legend'>
                <AccordionTrigger>Legend</AccordionTrigger>
                <AccordionContent>
                  <LegendSection />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value='x-axis'>
                <AccordionTrigger>X-Axis</AccordionTrigger>
                <AccordionContent>
                  <XAxisSection />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value='y-axis'>
                <AccordionTrigger>Y-Axis</AccordionTrigger>
                <AccordionContent>
                  <ScrollArea className='h-[300px] rounded-xl'>
                    <YAxisSection />
                  </ScrollArea>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value='y-axis-scondary'>
                <AccordionTrigger>Y-Axis (Scondary)</AccordionTrigger>
                <AccordionContent>
                  <ScrollArea className='h-[300px] rounded-xl'>
                    <YAxisSecondarySection />
                  </ScrollArea>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value='graph-styles'>
                <AccordionTrigger>Graph styles</AccordionTrigger>
                <AccordionContent>
                  <GraphStylesSection />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}

export default SettingsPanel
