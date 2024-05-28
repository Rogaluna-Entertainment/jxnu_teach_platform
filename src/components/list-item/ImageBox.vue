<template>
  <div class="box" @mouseover="isHovered = true" @mouseleave="isHovered = false">
    <div class="word" :class="{ hidden: isHovered }">
      <i :class="icon" class="iconn"></i>
      {{ words }}
    </div>
    <div class="box-content" @click="onClick()">
      <div class="words">{{ words }}</div>
      <i class="fas fa-search" :title="formattedPost"></i>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      isHovered: false
    };
  },
  props: {
    icon: {
      type: String,
      required: true
    },
    words: {
      type: String,
      required: true
    },
    post: {
      type: String,
      required: true
    }
  },
  computed: {
    formattedPost() {
      // Replace the # character with a line break
      return this.post.replace(/#/g, '\n');
    }
  },
  methods: {
    onClick() {
      switch(this.words) {
        case '学习公告':
        this.$router.push({
          path: `/home/courseDetail/123/courseListView`
        });
        break;
        case 'AI资源生成及智能管理':
        this.$router.push({
          path: `/home/courseDetail/123/teachingMaterials`
        });
        break;
        case '自生成课程':
        this.$router.push({
          path: `/home/courseDetail/123/chapter`
        });
        break;
        case '学生学情分析报告':
        this.$router.push({
          path: `/home/courseDetail/123/progressMonitoring`
        });
        break;
        case 'AI及其他服务':
        this.$router.push({
          path: `/home/courseDetail/123/oralPractice`
        });
        break;

      }
      // this.$router.push({ 
      //     name: 'courseDetail', 
      //     params: { courseId: 123 }
      // })
    }
  }
}

</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');

.box {
  background-color: lightblue;
  border: none;
  font-family: 'Merriweather Sans', sans-serif;
  overflow: hidden;
  position: relative;
  z-index: 1;
  transition: all .5s;
  height: 225px;
  width:450px;
  color: white;

  display: flex;
  font-size: 40px;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  text-align: center;
  text-shadow: 1px 1px 3px #999999;
  user-select: none; /* Make the text unselectable */
  cursor: default; /* Default cursor */
}

.box .word {
  font-size: 40px;
  font-weight: bold;
  color: white;
  text-shadow: 1px 1px 3px #999999;
  transition: opacity 0.3s ease; /* Add transition for smooth effect */
}

.box .word.hidden {
  opacity: 0; /* Hide the content */
}

.words {
  font-size: 40px;
  font-weight: bold;
  color: steelblue;
  text-shadow: 1px 1px 3px #999999;
  position: relative;
}

.iconn{
  background:none;
  font-size:40px;
  color:white;
}
.words::after {
  content: attr(data-words);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: white;
  mix-blend-mode: difference; /* This will invert the colors where the text overlaps a non-white background */
}

.box:hover {
  box-shadow: 3px 3px 5px #999;
  cursor: pointer; /* Change cursor to pointer on hover */
}

.box:before,
.box:after {
  content: "";
  background: radial-gradient(circle at 23% 70%, rgba(255, 255, 255, 0.8), #fff 30%);
  width: 150%;
  height: 150%;
  opacity: 0;
  transform: rotate(45deg);
  position: absolute;
  top: -10.5%;
  right: -150%;
  z-index: 1;
  transition: all 0.35s ease;
}

.box:after {
  background: rgba(255, 255, 255, 0.5);
  width: 65%;
  height: 65%;
  right: auto;
  left: -20%;
  top: -65%;
}

.box:hover:before {
  opacity: 1;
  right: -85%;
}

.box:hover:after {
  opacity: 1;
  top: -42%;
}

.box img {
  width: 100%;
  height: auto;
  transition: all 0.5s ease;
}

.box:hover img {
  transform: scale(1.2);
}

.box .box-content {
  text-align: right;
  transform: translateY(-50%);
  position: absolute;
  top: 50%;
  right: -100%;
  z-index: 2;
  transition: all .5s;
}

.box:hover .box-content {
  right: 5%;
}

.box .post {
  font-size: 16px;
  text-transform: capitalize;
  margin: 0 0 10px;
  display: block;
  color: black;
  user-select: none; /* Make the text unselectable */
}

.box .icon li {
  display: inline-block;
  margin: 0 4px;
}

.box .icon li a {
  color: #fff;
  background-color: #1e272e;
  font-size: 18px;
  text-align: center;
  line-height: 35px;
  height: 35px;
  width: 35px;
  border-radius: 50%;
  display: block;
  transition: all 0.3s;
  user-select: none; /* Make the text unselectable */
}

.box .icon li a:hover {
  color: #1e272e;
  background-color: #fff;
  border-radius: 10%;
  box-shadow: 0 0 5px #1e272e inset;
}

@media only screen and (max-width: 990px) {
  .box {
    margin: 0 0 30px;
  }
}

@media only screen and (max-width: 479px) {
  .box .title {
    font-size: 20px;
  }
}

.fas.fa-search {
  font-size: 30px;
  color: black;
  cursor: pointer;
  transition: color 0.3s ease;
}

.fas.fa-search:hover {
  color: white;
}
</style>
