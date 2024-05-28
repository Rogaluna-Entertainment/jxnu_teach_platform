<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
  display: flex;
  flex-direction: column; /* 或者 'row'，根据需要 */
  height: 100%;
}

html, body {
  width: 100%;
  height: 100%;
  margin: 0 !important;
  padding: 0 !important;
  max-height: none !important;
  max-width: none !important;

  overflow: auto;
}

.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

@import '@/icons/iconFile/iconfont.css'
</style>
