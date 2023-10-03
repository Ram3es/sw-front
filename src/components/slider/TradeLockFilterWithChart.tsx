import React, { useEffect, useState } from 'react';
import Slider from 'react-slider';
import * as d3 from 'd3-selection'

interface IOnePointSliderProps {
    data: number[]
    sliderValue: number
    maskId: string
    colorsArr?: string[]
    barWidthArr?: number[]
    onChange: (value: number) => void
    
}

const TradeLockFilterWithChart = ({ data, maskId, barWidthArr, colorsArr, sliderValue,  onChange }:IOnePointSliderProps) => {
    const maxValue = Math.max(...data)

  const handleSliderChange = (value: number) => {
    onChange(value)
    d3.select(`#${maskId}`).select('rect')
      .attr('width', `${((value + 1) * ((208 / data.length) * 100 / 208))}%`)
  }

    useEffect(() => {
    const svgWidth = 208
    const svgHeight = 51
    const barWidth = svgWidth / data.length

    const svg = d3.select(`#${maskId}Container`)
    .append('svg')
    .attr('width', svgWidth)
    .attr('height', svgHeight)

    svg.append('mask')
      .attr('id', maskId)
      .append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', `${((sliderValue + 1) * ((208 / data.length) * 100 / 208))}%`)
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
      .attr('fill', (_d: number, i: number) => colorsArr?.[i] ?? 'rgb(255,143,39)') // Default color (will be masked)
      .attr('mask', `url(#${maskId})`)

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
    return () => {
        svg.remove()
    }
    }, [])
    return (
    <div className=' pt-4'>
      <div id={`${maskId}Container`} style={{ width: '208px', height: '51px' }} />
      <Slider
        className={`bg-gray-300 w-[calc(100%_-_22px)]`}
        min={0}
        max={data.length -1}
        step={1}
        withTracks={false}
        value={sliderValue}
        renderThumb={(props, _state) => <div {...props}> <span className="w-3 h-3 bg-white thumb-corners-polygon absolute translate-x-1/3 "></span></div>}
        onChange={handleSliderChange}
      />
    </div>
    );
};

export default TradeLockFilterWithChart;