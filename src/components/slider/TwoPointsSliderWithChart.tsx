import { useEffect, useState } from 'react'
import * as d3 from 'd3-selection'
import Slider from 'react-slider'
import { format, formatToThousands } from '../../helpers/numberFormater'
import { useMarketOffersCtx } from '@/context/MarketOffers'

interface ITwoPointsSliderProps {
  data: number[]
  maxPrice: number
  maskId: string
  colorsArr?: string[]
  barWidthArr?: number[]
  isCurrency?: boolean 
  rangeLimit: number[]
  setRangeLimit: (value: number[]) => void
  updateFilterFn: () => void
}

const TwoPointsSliderWithChart = ({ data, maxPrice, maskId, colorsArr, barWidthArr, isCurrency = true, rangeLimit, setRangeLimit, updateFilterFn }: ITwoPointsSliderProps) => {
  const maxValue = Math.max(...data)

  useEffect(() => {
    const svgWidth = 208
    const svgHeight = 51
    const barWidth = svgWidth / data.length

    const svg = d3.select(`#${maskId}Container`)
      .append('svg')
      .attr('width', svgWidth)
      .attr('height', svgHeight)

    // Create the mask element
    svg.append('mask')
      .attr('id', maskId)
      .append('rect')
      .attr('x', `${rangeLimit[0] / maxPrice * 100}%`)
      .attr('y', 0)
      .attr('width', `${(rangeLimit[1] / maxPrice * 100) - rangeLimit[0] / maxPrice * 100}%`)
      .attr('height', svgHeight)
      .attr('fill', 'white') // Initial masking color (fully transparent)

    // Create the not-filled part with a different color
    svg.selectAll('rect.not-filled')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'not-filled')
      .attr('x', (_d: number, i: number) => barWidthArr?.[i]
        ? barWidthArr.reduce((prev, cur, curInd) => {
          if (curInd < i) {
            return prev + cur
          } else {
            return prev
          }
        }, 0) * svgWidth
        : i * barWidth)
      .attr('y', (d: number) => svgHeight - (d / maxValue) * svgHeight)
      .attr('width', (_d: number, i: number) => barWidthArr?.[i] ? barWidthArr[i] * svgWidth : barWidth)
      .attr('height', (d: number) => (d / maxValue) * svgHeight)
      .attr('fill', 'rgb(32, 32, 35)') // Color for not-filled part

    // Create the rect elements for the bars
    svg.selectAll('rect.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (_d: number, i: number) => barWidthArr?.[i]
        ? barWidthArr.reduce((prev, cur, curInd) => {
          if (curInd < i) {
            return prev + cur
          } else {
            return prev
          }
        }, 0) * svgWidth
        : i * barWidth)
      .attr('y', (d: number) => svgHeight - (d / maxValue) * svgHeight)
      .attr('width', (_d: number, i: number) => barWidthArr?.[i] ? barWidthArr[i] * svgWidth : barWidth)
      .attr('height', (d: number) => (d / maxValue) * svgHeight)
      .attr('fill', (_d: number, i: number) => colorsArr?.[i] ?? 'rgb(104, 66, 255)') // Default color (will be masked)
      .attr('mask', `url(#${maskId})`) // Apply the mask

    // Create the white lines to show the fill status
    svg.selectAll('rect.fill-status-line')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'fill-status-line')
      .attr('x', (_d: number, i: number) => i * barWidth)
      .attr('y', svgHeight - 3)
      .attr('width', barWidth)
      .attr('height', 3) // Height of the white line (adjust as needed)
      .attr('fill', 'white') // Color for the white line
      .attr('mask', `url(#${maskId})`) // Apply the mask

    // Clean up the SVG when the component is unmounted
    return () => {
      svg.remove()
    }
  }, [data])

  const handleSliderChange = (value: number[]) => {
    setRangeLimit(value)
    d3.select(`#${maskId}`).select('rect')
      .attr('x', `${value[0] / maxPrice * 100}%`)
      .attr('width', `${(value[1] / maxPrice * 100) - value[0] / maxPrice * 100}%`)
  }
  

  return (
    <div className='pt-5'>
      <div id={`${maskId}Container`} style={{ width: '208px', height: '51px' }} />
      <Slider
          className="w-full bg-gray-300"
          min={0}
          max={maxPrice}
          step={1}
          withTracks={false}
          value={rangeLimit}
          renderThumb={(props, _state) => 
            <div onMouseUp={() => updateFilterFn()} {...props}> 
              <span className="w-3 h-3 bg-white thumb-corners-polygon absolute -translate-x-1/2 "></span>
            </div>}
          onChange={handleSliderChange}
        />
      <div className='flex gap-2 pt-7'>
        <label className='w-full px-3 pt-1 pb-2 bg-darkGrey felx flex-col items-start'>
          <span className=' text-graySecondary text-[11px] font-Barlow text-start'>
            From
          </span>
          <div className='flex items-center gap-1 text-white text-[14px] font-Barlow'>
            {isCurrency ? '$' : ''}
            <input
              type="text"
              value={isCurrency ? format(rangeLimit[0] ?? 0) : formatToThousands(rangeLimit[0] ?? 0)}
              className='text-white text-[14px] font-Barlow text-start w-full bg-transparent border-0'
              onChange={(e) => {
                const amountCents = +e.target.value.replace(/[^0-9]/g, '')
                if (amountCents < 0) {
                  return
                } else if (amountCents >= rangeLimit[1]) {
                  handleSliderChange([rangeLimit[1], rangeLimit[1]])
                  return
                }
                handleSliderChange([amountCents, rangeLimit[1]])
              }}
            />
          </div>
        </label>
        <label className='w-full px-3 pt-1 pb-2 bg-darkGrey felx flex-col items-start'>
          <span className=' text-graySecondary text-[11px] font-Barlow text-start'>
            To
          </span>
          <div className='flex items-center gap-1 text-white text-[14px] font-Barlow'>
            {isCurrency ? '$' : ''}
            <input
            type="text"
            value={isCurrency ? format(rangeLimit[1] ?? 0) : formatToThousands(rangeLimit[1] ?? 0)}
            className='text-white text-[14px] font-Barlow text-start w-full bg-transparent border-0'
            onChange={(e) => {
              const amountCents = +e.target.value.replace(/[^0-9]/g, '')
              if (amountCents > (maxPrice ?? 0)) {
                return
              } else if (amountCents <= rangeLimit[0]) {
                handleSliderChange([rangeLimit[0], rangeLimit[0]])
                return
              }
              handleSliderChange([rangeLimit[0], amountCents])
            }}
           />
          </div>
        </label>
      </div>
    </div>
  )
}

export default TwoPointsSliderWithChart
