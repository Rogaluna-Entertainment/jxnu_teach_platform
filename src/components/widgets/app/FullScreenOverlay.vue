<template>
  <div>
    <i class="open-button el-icon-menu" @click="showOverlay"></i>
    <transition name="overlay-fade">
      <div v-if="isOverlayVisible" class="overlay">
        <button @click="hideOverlay" class="close-button">&times;</button>
        <transition name="content-fade">
          <div v-if="isOverlayVisible" class="overlay-content">
            <div class="login-page">
              <div class="menu-item login-button">主页</div>
              <div class="menu-item login-button" @click="jumpToLogin">登录</div>
              <div class="menu-item login-button">管理员登录</div>
              <div class="menu-item cancel-button" @click="hideOverlay">取消</div>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'FullScreenOverlay',
  data() {
    return {
      isOverlayVisible: false,
    };
  },
  methods: {
    showOverlay() {
      this.isOverlayVisible = true;
    },
    hideOverlay() {
      this.isOverlayVisible = false;
    },
    jumpToLogin() {
      this.$router.push({ name: 'login' });
    }
  },
};
</script>

<style scoped>

.open-button {
  transition: all 0.3s ease-in-out; /* Smooth transition for hover effects */
}

.open-button:hover {
  color: gray; /* Change text color on hover */
  transform: scale(1.1); /* Slightly enlarge the button on hover */
  background-color: rgba(0, 0, 0, 0); /* Transparent background */
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8); /* Semi-transparent background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.close-button {
  position: absolute;
  top: 8px;
  right: 16px;
  font-size: 35px;
  color: white;
  background: none;
  border: none;
  cursor: pointer;
}

.overlay-content {
  color: white;
  text-align: center;
}

.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.menu-item {
  color: white;
  margin: 10px 0;
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 20vw;
  height: 10vh;
}

.login-button {
  background-color: white;
  color: black;
  border-radius: 5px;
}

.cancel-button {
  color: white;
  border: 1px solid white;
  border-radius: 5px;
}

/* CSS transitions for the overlay */
.overlay-fade-enter-active, .overlay-fade-leave-active {
  transition: opacity 0.5s;
}

.overlay-fade-enter, .overlay-fade-leave-to /* .overlay-fade-leave-active in <2.1.8 */
{
  opacity: 0;
}

/* CSS transitions for the content */
.content-fade-enter-active, .content-fade-leave-active {
  transition: all 0.5s ease;
}

.content-fade-enter, .content-fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
