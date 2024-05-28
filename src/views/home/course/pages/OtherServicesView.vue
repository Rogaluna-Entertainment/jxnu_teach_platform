<template>
  <div class="demo">
   <div class="container">
     <div class="row">
       <div class="col-md-4 col-sm-6" v-for="(image, index) in images" :key="index">
         <div class="box">
           <img :src="image.src" :alt="image.alt">
           <div class="box-content">
             <a :href="image.link1" target="_blank"> <h3 class="title">{{ image.title }}</h3></a>
             <span class="post">{{ image.post }}</span>
             <ul class="icon">
               <li><a :href="image.link1" target="_blank"><i class="fa fa-search"></i></a></li>
               <li><a href="#"><i class="fa fa-link"></i></a></li>
             </ul>
           </div>
         </div>
       </div>
     </div>
     <div class="row">
       <div class="col-md-4 col-sm-6" v-for="(image, index) in additionalImages" :key="index">
         <div class="box">
           <img :src="image.src" :alt="image.alt">
           <div class="box-content">
             <a :href="image.link2" target="_blank"><h3 class="title">{{ image.title }}</h3></a>
             <span class="post">{{ image.post }}</span>
             <ul class="icon">
               <li><a :href="image.link2" target="_blank"><i class="fa fa-search"></i></a></li>
               <li><a href="#"><i class="fa fa-link"></i></a></li>
             </ul>
           </div>
         </div>
       </div>
     </div>
   </div>
 </div>

</template>

<script>
import '@/icons/iconCommon/iconfont'
import OralTestDetailSectionVue from '@/components/sections/OralTestDetailSection.vue'

export default {
   components: {
       OralTestDetailSectionVue
   },
   data() {
       return {
         images: [
       { src: require('@/assets/01.jpg'), alt: 'Image 1', title: '美国之声', post: '',link1:'https://www.51voa.com/' },
       { src: require('@/assets/02.jpg'), alt: 'Image 2', title: 'CGTN', post: '',link1:'https://www.cgtn.com/tv' },
       { src: require('@/assets/03.jpg'), alt: 'Image 3', title: 'CHINADAILY', post: '',link1:'https://www.chinadaily.com.cn/' }
     ],
     additionalImages: [
       { src: require('@/assets/07.jpg'), alt: 'Image 4', title: 'CNN', post: '',link2:'https://edition.cnn.com/' },
       { src: require('@/assets/05.jpg'), alt: 'Image 5', title: 'TED', post: '',link2:'https://www.ted.com/talks' },
       { src: require('@/assets/06.jpg'), alt: 'Image 6', title: 'DICTIONARY', post: '',link2:'https://dictionary.cambridge.org/' }
     ]
       }
   },

}
</script>

<style lang="scss" scoped>
@import '@/css/div/tool-bar/generalStyle.scss';
.demo {
   display: flex;
   width: 100%;
   height: 100%;
   padding: 0%;
   background-color: #ffffff;
   flex-wrap: nowrap;
   flex-direction: row;
   justify-content: center;
   align-items: center;

}

.row {
   display: flex;
   align-items: center;
   flex-wrap: nowrap;
   align-content: flex-start;
   justify-content: center;
   flex-direction: row;

}

.box {
 font-family: 'Merriweather Sans', sans-serif;
 overflow: hidden;
 position: relative;
 z-index: 1;
 transition: all .5s;
 margin-bottom: 30px;
}

.box:hover {
 box-shadow: 3px 3px 5px #999;
}

.box:before,
.box:after {
 content: "";
 background: radial-gradient(circle at 23% 70%, rgba(255, 255, 255, 0.8), #fff 30%);
 width: 150%;
 height: 175%;
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
 width: 60%;
 height: 61%;
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
   width: 92%;
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

.box .title {
 color: #1e272e;
 font-size: 23px;
 font-weight: 700;
 text-transform: uppercase;
 margin: 0 0 3px 0;
}

.box .post {
 font-size: 16px;
 text-transform: capitalize;
 margin: 0 0 10px;
 display: block;
}

.box .icon {
 padding: 0;
 margin: 0;
 list-style: none;
}

.box .icon li {
 display: inline-block;
 margin: 0 4px;
}

.box .icon li a {
 color: #fff;
 background-color: #ff0000;
 font-size: 18px;
 text-align: center;
 line-height: 35px;
 height: 35px;
 width: 35px;
 border-radius: 50%;
 display: block;
 transition: all 0.3s;
}

.box .icon li a:hover {
 color: #1e272e;
 background-color: #fff;
 border-radius: 10%;
 box-shadow: 0 0 5px #1e272e inset;
}

@media only screen and (max-width: 990px) {
 .box {
   margin: 0 0 10px;
 }
}

@media only screen and (max-width: 479px) {
 .box .title {
   font-size: 20px;
 }
}



</style>