<template>
  <div>
    <div id="unity-container" class="unity-desktop">
      <canvas ref="unityCanvas" id="unity-canvas"></canvas>
      <div style="margin-bottom: 10px"></div>
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
      userMessage: '',
      chatBotMessage: '',
      unityInstance: null,
      chatHistory: [],
      messageList: [],
    };
  },
  methods: {
    // Chatbot Part
    ...mapActions(userInputModule, ['sendMessageToFastAPI','requestAnswerToFastAPI']),

    // 무조건 일대일 대응 채팅
    async sendMessageToChatBot() {
  
      if (this.userMessage.trim() === "") return; // 아무 것도 안 보냈다면 처리하지 않음
      // Unity에서 받은 메시지를 대화 기록에 추가
      this.chatHistory.push({ sender: "나", text: this.userMessage });
      this.userInputMessage = this.userMessage;
      this.userMessage = ""; // 메시지를 보낸 후 초기화
      console.log("sendMessageToChatBot message:", this.userInputMessage);

      // `sendMessageToFastAPI`의 결과를 기다림
      let res = await this.sendMessageToFastAPI({ "data": this.userInputMessage });

      let response = null;

      // 응답이 올 때까지 무조건 기다리는 부분
      while (!response) {
        try {
          // 응답이 성공적으로 올 때까지 계속 요청
          const potentialResponse = await this.requestAnswerToFastAPI();
          
          if (potentialResponse && potentialResponse.generatedText) {
            // 응답이 성공적이라면 response에 결과 저장
            response = potentialResponse;
            this.chatBotOutput = response.generatedText; // 챗봇 응답 저장
            console.log('ENFP 응답: ', this.chatBotOutput);
            this.sendMessageToUnity(this.chatBotOutput);  // 챗봇 응답 Unity 화면에 출력

            this.chatHistory.push({ sender: '이상형', text: this.chatBotOutput });
            this.chatBotOutput = ''; // 응답 저장소 초기화
          } else {
            console.log('응답이 아직 준비되지 않았습니다, 다시 시도합니다...');
          }
        } catch (error) {
          console.error("응답을 기다리는 중 오류가 발생했습니다:", error);
          // 오류가 발생해도 무조건 다시 시도하도록 설정
        }
        // 비동기 함수 호출 사이에 지연 시간을 두어 서버에 과부하를 줄 수 있는 빠른 루프 방지
        await new Promise(resolve => setTimeout(resolve, 2000)); // 1초 대기
      }
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
          message.forEach((sentence, index) => {
            setTimeout(() => {
              this.unityInstance.SendMessage('ButtonSend', 'VueEvent', sentence.trim());
            }, index * 1000); // index * 1000 밀리초 (1초 간격)으로 시간차를 두어 보냅니다.
          });
          // for (let sentence of message) {
          //   this.unityInstance.SendMessage('ButtonSend', 'VueEvent', sentence.trim());
          // }
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
      this.userMessage = message;  // Unity에서 받은 메시지를 저장
      this.sendMessageToChatBot();
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