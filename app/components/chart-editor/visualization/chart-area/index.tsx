import {
  ComposedChart,
  // Bar,
  // Area,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  // ReferenceLine,
  ResponsiveContainer,
  type TooltipProps
  // Brush
} from 'recharts'
import {
  useLegendOptionStore,
  usePanelOptionStore,
  useTooltipOptionStore,
  useDataQueryStore,
  useXAxisOptionStore,
  useYAxisOptionStore,
  useYAxisSecondaryOptionStore
} from '@/store/editor'
import React, { JSX, memo } from 'react'
interface ChartDataItem {
  code: string
  yAxisId: number
}
function ChartArea (): JSX.Element {
  const rawData = useDataQueryStore.use.rawData()
  const mregedData = useDataQueryStore.use.mergedData()
  const isTransparentBackground = usePanelOptionStore.use.isTransparentBackground()
  const tooltipMode = useTooltipOptionStore.use.tooltipMode()
  const cursorLineStyle = useTooltipOptionStore.use.cursorLineStyle()
  const cursorLineStyleWidth = useTooltipOptionStore.use.cursorLineStyleWidth()
  const cursorLineStyleDasharray = useTooltipOptionStore.use.cursorLineStyleDasharray()

  const legendVisibility = useLegendOptionStore.use.legendVisibility()
  const legendLayout = useLegendOptionStore.use.legendLayout()
  const legendAlign = useLegendOptionStore.use.legendAlign()
  const legendVerticalAlign = useLegendOptionStore.use.legendVerticalAlign()

  const xAxisDataKey = useXAxisOptionStore.use.xAxisDataKey()
  const xAxisVisibility = useXAxisOptionStore.use.xAxisVisibility()
  const xAxisType = useXAxisOptionStore.use.xAxisType()
  const xAxisTickCount = useXAxisOptionStore.use.xAxisTickCount()
  const xAxisTickAngle = useXAxisOptionStore.use.xAxisTickAngle()
  const xAxisDomainMin = useXAxisOptionStore.use.xAxisDomainMin()
  const xAxisDomainMax = useXAxisOptionStore.use.xAxisDomainMax()
  const xAxisAxisLine = useXAxisOptionStore.use.xAxisAxisLine()
  const xAxisTickSize = useXAxisOptionStore.use.xAxisTickSize()
  const xAxisTickLine = useXAxisOptionStore.use.xAxisTickLine()
  const xAxisColor = useXAxisOptionStore.use.xAxisColor()

  const yAxisUnit = useYAxisOptionStore.use.yAxisUnit()
  const yAxisDataKey = useYAxisOptionStore.use.yAxisDataKey()
  const yAxisVisibility = useYAxisOptionStore.use.yAxisVisibility()
  const yAxisType = useYAxisOptionStore.use.yAxisType()
  const yAxisTickCount = useYAxisOptionStore.use.yAxisTickCount()
  const yAxisDomainMin = useYAxisOptionStore.use.yAxisDomainMin()
  const yAxisDomainMax = useYAxisOptionStore.use.yAxisDomainMax()
  const yAxisAxisLine = useYAxisOptionStore.use.yAxisAxisLine()
  const yAxisTickSize = useYAxisOptionStore.use.yAxisTickSize()
  const yAxisTickLine = useYAxisOptionStore.use.yAxisTickLine()
  const yAxisColor = useYAxisOptionStore.use.yAxisColor()

  const yAxisSecondaryUnit = useYAxisSecondaryOptionStore.use.yAxisSecondaryUnit()
  const yAxisSecondaryDataKey = useYAxisSecondaryOptionStore.use.yAxisSecondaryDataKey()
  const yAxisSecondaryVisibility = useYAxisSecondaryOptionStore.use.yAxisSecondaryVisibility()
  const yAxisSecondaryType = useYAxisSecondaryOptionStore.use.yAxisSecondaryType()
  const yAxisSecondaryTickCount = useYAxisSecondaryOptionStore.use.yAxisSecondaryTickCount()
  const yAxisSecondaryDomainMin = useYAxisSecondaryOptionStore.use.yAxisSecondaryDomainMin()
  const yAxisSecondaryDomainMax = useYAxisSecondaryOptionStore.use.yAxisSecondaryDomainMax()
  const yAxisSecondaryAxisLine = useYAxisSecondaryOptionStore.use.yAxisSecondaryAxisLine()
  const yAxisSecondaryTickSize = useYAxisSecondaryOptionStore.use.yAxisSecondaryTickSize()
  const yAxisSecondaryTickLine = useYAxisSecondaryOptionStore.use.yAxisSecondaryTickLine()
  const yAxisSecondaryColor = useYAxisSecondaryOptionStore.use.yAxisSecondaryColor()

  const chartData = rawData.reduce<ChartDataItem[]>((acc, cur) => {
    const { unit, code } = cur
    const addToChartData = (unitCheck: string, dataKey: string, yAxisId: number) => {
      if (unit === unitCheck && dataKey === code) {
        acc.push({ code, yAxisId })
      }
    }
    addToChartData(yAxisUnit, yAxisDataKey, 1)
    addToChartData(yAxisSecondaryUnit, yAxisSecondaryDataKey, 2)
    return acc
  }, [])

  return (
    <ResponsiveContainer className={isTransparentBackground ? '' : 'bg-primary-foreground'} width='100%' height='100%' minHeight={0} minWidth={0}>
      <ComposedChart width={200} height={300} data={mregedData} margin={{ top: 24, right: 20, bottom: 8, left: 0 }}>

        <CartesianGrid
          vertical
          horizontal
          stroke='var(--muted)'
          strokeDasharray='0'
        />

        <XAxis
          hide={!xAxisVisibility}
          dataKey={xAxisDataKey}
          stroke={xAxisColor}
          type={xAxisType}
          domain={[xAxisDomainMin, xAxisDomainMax]}
          tickCount={xAxisTickCount}
          angle={xAxisTickAngle}
          tickSize={xAxisTickSize}
          tickLine={xAxisTickLine}
          axisLine={xAxisAxisLine}
          allowDecimals
          allowDataOverflow
        />

        <YAxis
          label={{ value: yAxisUnit, position: 'insideTopLeft', offset: 20, angle: 90 }}
          hide={!yAxisVisibility}
          dataKey={yAxisDataKey}
          stroke={yAxisColor}
          type={yAxisType}
          domain={[yAxisDomainMin, yAxisDomainMax]}
          tickCount={yAxisTickCount}
          tickSize={yAxisTickSize}
          tickLine={yAxisTickLine}
          axisLine={yAxisAxisLine}
          allowDecimals
          allowDataOverflow
          minTickGap={5}
          yAxisId={1}
        />

        <YAxis
          label={{ value: yAxisSecondaryUnit, position: 'insideTopRight', offset: 20, angle: -90 }}
          hide={!yAxisSecondaryVisibility}
          dataKey={yAxisSecondaryDataKey}
          stroke={yAxisSecondaryColor}
          type={yAxisSecondaryType}
          domain={[yAxisSecondaryDomainMin, yAxisSecondaryDomainMax]}
          tickCount={yAxisSecondaryTickCount}
          tickSize={yAxisSecondaryTickSize}
          tickLine={yAxisSecondaryTickLine}
          axisLine={yAxisSecondaryAxisLine}
          allowDecimals
          allowDataOverflow
          minTickGap={5}
          yAxisId={2}
          orientation='right'
        />

        {chartData.map((item) => (
          <Line
            key={`line-${item.code}`}
            type='monotone'
            dataKey={item.code}
            stroke='rgb(115, 191, 105)'
            yAxisId={item.yAxisId}
          />
        ))}
        {/* {panelsData.map((panel) => (
          <Area
            key={`area-${panel.indicatorCode}`}
            type="monotone"
            dataKey={panel.indicatorCode}
            stroke={'rgb(115, 191, 105)'}
            yAxisId={1}
          />
        ))} */}
        {/* {panelsData.map((panel) => (
          <Bar
            key={`bar-${panel.indicatorCode}`}
            type="monotone"
            dataKey={panel.indicatorCode}
            stroke={'rgb(115, 191, 105)'}
            yAxisId={1}
          />
        ))} */}
        {/* <XAxis dataKey="date" stroke="#777474" />
        {lineChartItems.map(({ code, yAxisId, label }) => (
          <YAxis
            key={`yAxis-${code}${yAxisId}`}
            label={label}
            stroke="#777474"
            yAxisId={yAxisId}
            orientation={yAxisId === "2" ? "right" : "left"}

          />
        ))} */}
        {/* {lineChartItems.map(({ code, referenceLineColor, referenceLineType, yAxisId }, index) => (
          referenceLineType !== "N/A"
            ? <ReferenceLine
                key={`ref-${referenceLineType}-${index}`}
                y={referenceLine[code]}
                yAxisId={yAxisId}
                strokeDasharray="3 3"
                stroke={referenceLineColor}
                ifOverflow="extendDomain"
            />
            : null)
        )} */}
        {/* <Brush /> */}
        {legendVisibility && (
          <Legend
            layout={legendLayout}
            verticalAlign={legendVerticalAlign}
            align={legendAlign}
          // width={140}
          // height={120}
          // iconSize={14}
          // iconType="line" // line plainLine square rect circle cross diamond star triangle wye
          />
        )}

        <Tooltip
          active={tooltipMode === 'default' ? undefined : (tooltipMode === 'active')}
          cursor={{ stroke: 'var(--muted-foreground)', strokeWidth: cursorLineStyleWidth, strokeDasharray: cursorLineStyle === 'dash' ? cursorLineStyleDasharray : '' }}
          content={<CustomTooltip />}
        />
      </ComposedChart>
    </ResponsiveContainer>
  )
}

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<Record<string, string | number>>
  label?: string | number
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }: TooltipProps<string, string>) => {
  const maxWidth = useTooltipOptionStore.use.tooltiMaxWidth()
  if (active === true && payload?.length != null) {
    return (
      <div className='flex flex-col bg-background border-[1px] border-solid border-[rgba(204, 204, 220, 0.2)] overflow-hidden' style={{ width: `${maxWidth}px` }}>
        <div className='flex flex-col flex-1 p-2'>
          <div className='flex items-center'>
            <div className='text-ellipsis overflow-hidden cursor-pointer'>
              {label}
            </div>
          </div>
        </div>

        <div className='flex flex-col flex-1 gap-1 border-t-[1px] border-solid border-[rgba(204, 204, 220, 0.2)] p-2'>
          {payload.map((item, index) => (
            <div className='flex items-start justify-between mr-0' key={`${index}-${item.name}-${item.value}`}>
              <div className='flex items-center'>
                {item.name}
              </div>
              <div className='flex items-center'>
                <div className='text-ellipsis overflow-hidden cursor-pointer whitespace-normal break-words'>
                  {item.value}
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    )
  }
}

export default memo(ChartArea)
