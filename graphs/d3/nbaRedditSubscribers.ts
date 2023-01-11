const MARGIN = { LEFT: 60, RIGHT: 30, TOP: 10, BOTTOM: 60 };
const WIDTH = 800 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 700 - MARGIN.TOP - MARGIN.BOTTOM;
const height = HEIGHT + MARGIN.TOP + MARGIN.BOTTOM;
const width = WIDTH + MARGIN.LEFT + MARGIN.RIGHT;

import { sortBy } from '@utilities';
import * as d3 from 'd3';
import { TeamData } from 'types/nbaTeamData';

export function addRedditBarChart(teamData: TeamData[], ref: React.RefObject<any>) {
  d3.select('#reddit-graph').remove();

  const svg = d3
    .select(ref.current)
    .append('svg')
    .attr('id', 'reddit-graph')
    .attr('viewBox', `0 0 ${width} ${height}`);

  const g = svg.append('g').attr('transform', `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

  g.append('text')
    .attr('class', 'x axis-label')
    .attr('x', WIDTH / 2)
    .attr('y', HEIGHT + 60)
    .attr('font-size', '20px')
    .attr('text-anchor', 'middle')
    .style('fill', '#14376c')
    .text('Reddit subscribers');

  sortBy<TeamData>((d) => d.subscribers, teamData);
  teamData = sortBy<TeamData>((d) => d.subscribers, teamData);

  const x = d3
    .scaleLinear()
    .domain([0, d3.max(teamData, (d) => d.subscribers)])
    .range([0, WIDTH]);

  const y = d3
    .scaleBand()
    .domain(teamData.map((d) => d.name))
    .range([0, HEIGHT])
    .paddingInner(0.2)
    .paddingOuter(0.2);

  const xAxisCall = d3.axisBottom(x).ticks(5).tickSize(5);
  g.append('g')
    .attr('class', 'x axis')
    .attr('transform', `translate(0, ${HEIGHT + 10})`)
    .call(xAxisCall);

  const yAxisCall = d3.axisLeft(y).tickSize(0);
  g.append('g').attr('class', 'y axis').call(yAxisCall);

  const rects = g.selectAll('rect').data(teamData);
  const images = g.selectAll('image').data(teamData);

  rects
    .enter()
    .append('rect')
    .attr('y', (d) => y(d.name))
    .attr('x', 0)
    .attr('width', 0)
    .attr('height', y.bandwidth)
    .attr('fill', (d) => d.color)
    .transition()
    .duration(1000)
    .ease(d3.easeLinear)
    .attr('width', (d) => x(d.subscribers));

  const imageSize = 20;
  images
    .enter()
    .append('image')
    .attr('xlink:href', (d) => d.logo)
    .attr('x', '0')
    .attr('y', (d) => y(d.name) - 1)
    .attr('width', `${imageSize}px`)
    .attr('height', `${imageSize}px`)
    .transition()
    .duration(1000)
    .ease(d3.easeLinear)
    .attr('x', (d) => x(d.subscribers) + 3);
}
