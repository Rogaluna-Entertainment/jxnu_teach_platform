<template>
  <div ref="wordCloud" class="word-cloud"></div>
</template>

<script>
import * as d3 from 'd3';
import cloud from 'd3-cloud';

export default {
  props: {
    words: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    try {
      this.generateWordCloud();
      setInterval(this.updateWordCloud, 10000); // Call updateWordCloud every 10 seconds
    } catch(e) {
      console.log(e);
    }
  },
  methods: {
    generateWordCloud() {
      const width = window.innerWidth / 2;
      const height = window.innerHeight * 0.75; // 75% of the viewport height
      const words = this.words.concat(this.words); // Double the number of words

      const layout = cloud()
        .size([width, height])
        .words(words.map((word) => ({ text: word, size: Math.random() * 50 + 30 }))) // Adjusted font size range
        .padding(10) // Adjust padding between words
        .rotate(0) // All words are horizontal
        .font('Impact')
        .fontSize((d) => d.size)
        .on('end', this.draw);

      layout.start();
    },
    updateWordCloud() {
      d3.select(this.$refs.wordCloud).selectAll('svg')
        .transition()
        .duration(1000)
        .style('opacity', 0)
        .remove()
        .end()
        .then(() => {
          this.generateWordCloud();
        });
    },
    draw(words) {
      const width = window.innerWidth;
      const height = window.innerHeight * 0.75;

      const svg = d3.select(this.$refs.wordCloud)
        .append('svg')
        .attr('width', width)
        .attr('height', height);

      const text = svg.append('g')
        .attr('transform', `translate(${width / 4},${height / 2})`)
        .selectAll('text')
        .data(words)
        .enter().append('text')
        .style('font-size', (d) => `${d.size}px`)
        .style('font-family', 'Impact')
        .style('fill', () => d3.schemeCategory10[Math.floor(Math.random() * 10)])
        .attr('text-anchor', 'middle')
        .attr('transform', (d) => `translate(${d.x * 0.95},${d.y * 0.95})rotate(${d.rotate})`) // Adjust dispersion to keep within screen
        .style('opacity', 0)
        .text((d) => d.text);

      text.transition().duration(1000).style('opacity', 1);
    },
  },
};
</script>

<style scoped>
.word-cloud {
  position: relative;
  width: 100%;
  height: 75vh; /* Set height to 75% of the viewport height */
  overflow: hidden; /* Ensure no scrollbars in app */
  padding: 10px; /* Add padding to prevent clipping */
  box-sizing: border-box; /* Include padding in element's total width and height */
}
</style>
