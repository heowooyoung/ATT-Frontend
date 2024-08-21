<template>
  <div id="unity-container" class="unity-desktop">
    <canvas ref="unityCanvas" id="unity-canvas"></canvas>
    <div style="margin-bottom: 10px"></div>
    <p>Unity에서 받은 메시지: {{ unityMessage }}</p>
    <button class="sendMessageToUnity-button" @click="sendMessageToUnity('Hello from Vue!')">Send Message to Unity</button>
  </div>
</template>

<script>
export default {
  name: 'unity-game',
  data() {
    return {
      unityMessage: '',
      unityInstance: null,
    };
  },
  methods: {
    initializeUnity() {
      const canvas = this.$refs.unityCanvas;
      const script = document.createElement("script");
      script.src = "/unity-build/build.loader.js";
      script.onload = () => {
        window.createUnityInstance(canvas, {
          dataUrl: "/unity-build/build.data",
          frameworkUrl: "/unity-build/build.framework.js",
          codeUrl: "/unity-build/build.wasm",
        }).then((unityInstance) => {
          this.unityInstance = unityInstance;
          console.log("Unity instance initialized.");
          this.resizeUnityCanvas();
        }).catch((message) => {
          console.error("Unity instance initialization failed:", message);
        });
      };
      document.body.appendChild(script);
    },
    sendMessageToUnity(message) {
      if (this.unityInstance) {
        this.unityInstance.SendMessage('chatPanel', 'VueEvent', message);
      } else {
        console.error("Unity instance is not ready.");
      }
    },
    resizeUnityCanvas() {
      const canvas = this.$refs.unityCanvas;
      const container = document.getElementById('unity-container');
      const aspectRatio = 16 / 9; // Unity 프로젝트의 실제 비율에 맞게 조정
      
      let newWidth = container.clientWidth;
      let newHeight = newWidth / aspectRatio;

      if (newHeight > container.clientHeight) {
        newHeight = container.clientHeight;
        newWidth = newHeight * aspectRatio;
      }

      canvas.style.width = `${newWidth}px`;
      canvas.style.height = `${newHeight}px`;
    }
  },
  mounted() {
    window.unityEvent = (message) => {
      console.log("Message received from Unity:", message);
      this.unityMessage = message;
    };

    this.initializeUnity();
    window.addEventListener('resize', this.resizeUnityCanvas);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.resizeUnityCanvas);
  }
};
</script>

<style scoped>
#unity-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#unity-canvas {
  max-width: 100%;
  max-height: 100%;
  outline: none;
}

.sendMessageToUnity-button{
  background-color: rgb(235, 235, 72);
  color: black;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 10px;
  font-size: 20px;
  font-weight: bold;
  width: 300px;
  margin-top: 10px;
  margin-bottom: 50px;
}
</style>