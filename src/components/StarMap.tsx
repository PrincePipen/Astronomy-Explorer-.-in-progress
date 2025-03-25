import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { CelestialObject } from '../types';

interface StarMapProps {
  width: number;
  height: number;
  objects: CelestialObject[];
}

export const StarMap: React.FC<StarMapProps> = ({ width, height, objects }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !objects.length) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const projection = d3.geoStereographic()
      .scale(height / 2)
      .translate([width / 2, height / 2])
      .rotate([0, -90]);

    // Draw stars
    svg.selectAll("circle")
      .data(objects)
      .enter()
      .append("circle")
      .attr("cx", d => {
        const [x] = projection([d.rightAscension, d.declination]) || [0];
        return x;
      })
      .attr("cy", d => {
        const [, y] = projection([d.rightAscension, d.declination]) || [0];
        return y;
      })
      .attr("r", d => Math.max(2, (6 - d.magnitude)))
      .attr("fill", d => d.type === 'star' ? "#ffffff" : "#ffd700")
      .attr("class", "cursor-pointer hover:fill-blue-400 transition-colors")
      .append("title")
      .text(d => d.name);

  }, [width, height, objects]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      className="bg-gray-900 rounded-lg"
    />
  );
};
