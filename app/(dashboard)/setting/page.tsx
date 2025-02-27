import ChartEditor from '@/components/chart-editor'
import type { JSX } from 'react'

export default async function Page (): Promise<JSX.Element> {
  return (
    <div className='py-3 h-full'>
      <ChartEditor />
    </div>
  )
}
