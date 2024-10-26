import SelectTimeRange from '@/components/shared/select-time-range'

export default function Home () {
  return (
    <div className="container relative max-w-screen-2xl pt-8 h-full">
      <div className="flex-col md:flex h-full">
        <div className="flex items-center justify-end space-x-2 h-7">
          <div>
            <SelectTimeRange />
          </div>
        </div>
        Home
      </div>
    </div>
  )
}
