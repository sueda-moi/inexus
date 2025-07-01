'use client';

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { feature } from 'topojson-client';
import type { Objects, Topology } from 'topojson-specification';
import type { GeoJsonProperties, FeatureCollection } from 'geojson';

const CustomGeoMap: React.FC = () => {
    const ref = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        const drawMap = async () => {
            const width = 800;
            const height = 450;

            const svg = d3.select(ref.current);
            svg.selectAll('*').remove();

            // Load TopoJSON data
            const world = await d3.json('/world-110m.json');
            if (!world || typeof world !== 'object' || !('objects' in world)) {
                console.error('Invalid TopoJSON data');
                return;
            }

            // Properly type the Topology
            const worldTyped = world as Topology<Objects<GeoJsonProperties>>;

            // Convert to GeoJSON FeatureCollection
            const countries = feature(
                worldTyped,
                worldTyped.objects.countries
            ) as FeatureCollection;

            // countries.features.forEach((f) => {

            //     if (f.properties?.name === 'China') {
            //         console.log('China ID:', f.id);
            //     }
            //     if (f.properties?.name === 'Taiwan') {
            //         console.log('Taiwan ID:', f.id);
            //     }
            //     if (f.properties?.name === 'Japan') {
            //         console.log('Japan ID:', f.id);
            //     }

            // });

            const blueRegionIds = [156, 158, 392]; // China, Taiwan, Japan

            const projection = d3
                .geoMercator()
                .scale(120)
                .translate([width / 2, height / 1.5]);

            const path = d3.geoPath().projection(projection);

            svg
                .attr('width', '100%')
                .attr('height', height)
                .attr('viewBox', `0 0 ${width} ${height}`)
                .append('g')
                .selectAll('path')
                .data(countries.features)
                .enter()
                .append('path')
                .attr('d', path)
                .attr('fill', d => {
                    const id = Number(d.id ?? -1);
                    return blueRegionIds.includes(id) ? '#3498db' : '#e0e0e0';
                })
                .attr('stroke', '#555')
                .attr('stroke-width', 0.5)
                .on('mouseover', function (event, d) {
                    const id = Number(d.id ?? -1);
                    d3.select(this).attr('fill', blueRegionIds.includes(id) ? '#217dbb' : '#b0d4ff');
                })
                .on('mouseout', function (event, d) {
                    const id = Number(d.id ?? -1);
                    d3.select(this).attr('fill', blueRegionIds.includes(id) ? '#3498db' : '#e0e0e0');
                });
        };

        drawMap();
    }, []);

    return <svg ref={ref} className="geo-map-svg" />;
};

export default CustomGeoMap;
