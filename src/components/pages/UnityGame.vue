<template>
  <div>
    <div id="unity-container" class="unity-desktop">
      <canvas ref="unityCanvas" id="unity-canvas"></canvas>
      <div style="margin-bottom: 10px"></div>
      <p>Unity에서 받은 메시지!!: {{ unityMessage }}</p>
      <button class="sendMessageToUnity-button" @click="sendMessageToUnity('Hello from Vue!')">Send Message to Unity</button>
    </div>

    <!-- ChatBot Container -->
    <div>
      <h1>ChatBot</h1>
      <div v-for="(message, index) in chatHistory" :key="index" class="message">
        <strong>{{ message.sender }}:</strong> {{ message.text }}
      </div>

      <input
        v-model="unityMessage"
        @keyup.enter="sendMessageToChatBot"
        placeholder="메세지를 입력하세요..."
      />
      <button @click="sendMessageToChatBot">Send</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
const userInputModule = 'userInputModule'

export default {
  name: 'unity-game',
  data() {
    return {
      unityMessage: '',
      userInput: '',
      unityInstance: null,
      chatHistory: [],
    };
  },
  methods: {
    // Chatbot Part
    ...mapActions(userInputModule, ['sendMessageToFastAPI','requestAnswerToFastAPI']),

    async sendMessageToChatBot() {
      // 아무 것도 안 보냈다면 처리 x
      if (this.unityMessage.trim() === "") return;
      
      const userMessage = this.unityMessage;
      // sender 부분 User 대신 닉네임으로 가져와도 될 듯?
      this.chatHistory.push({ sender: "Unity", text: userMessage })
      this.userInputMessage = this.unityMessage
      this.unityMessage = '' // 메세지 보냈다면 초기화하기
      console.log("sendMessageToChatBot message :",this.userInputMessage)
      // 메세지 챗봇에게 보내기 action으로 구현
      await this.sendMessageToFastAPI({"data": this.userInputMessage})

      // 얘도 await 해줘야 응답이 옴
      const response = await this.requestAnswerToFastAPI()
      
      //console.log('response? :', response)
      this.chatBotOutput = response.generatedText
      console.log('istp 응답: ', this.chatBotOutput) // undefined 반환 
      this.chatHistory.push({sender: '이상형', text: this.chatBotOutput})

      this.chatBotOutput = ''
    },
    
    // Unity Part
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
        this.unityInstance.SendMessage('ButtonSend', 'VueEvent', message);
        // this.sendMessageToChatBot()
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
      console.log("mounted Message received from Unity:", message);
      this.unityMessage = message;  // Unity에서 받은 메시지를 저장
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