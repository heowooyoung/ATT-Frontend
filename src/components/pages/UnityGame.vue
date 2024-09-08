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
      date: '',
      dateQuestion: '',
      location: '',
      locationQuestion: '',
      unityInstance: null,
      chatHistory: [],
      messageList: [],
      sceneNumber: "0",
    };
  },
  methods: {
    // Chatbot Part
    ...mapActions(userInputModule, ['sendMessageToFastAPI','requestAnswerToFastAPI','requestDateQuestionToFastAPI',
      'requestDateAnswerToFastAPI','requestLocationQuestionToFastAPI','requestLocationAnswerToFastAPI'
    ]),

    // 무조건 일대일 대응 채팅
    async sendMessageToChatBot() {
      if (this.userMessage.trim() === "") return; // 아무 것도 안 보냈다면 처리하지 않음
      // Unity에서 받은 메시지를 대화 기록에 추가
      this.chatHistory.push({ role: "user", content: this.userMessage }); // gpt 형식에 맞게 변경
      this.userInputMessage = this.userMessage;

      // 내가 어디서 만날지 물어볼때 장소 QnA 진행
      // if (this.userMessage.toString().trim().includes("어디")) {
      //         const question = this.chatHistory
      //         this.sendLocationQnAToChatBot(question)
      // }
      this.userMessage = ""; // 메시지를 보낸 후 초기화
      console.log("sendMessageToChatBot message:", this.userInputMessage);

      // `sendMessageToFastAPI`의 결과를 기다림
      await this.sendMessageToFastAPI({ "data": this.userInputMessage });

      let response = null;
      // 응답이 올 때까지 무조건 기다리는 부분 => polling 
      while (!response) {
        try {
          // 응답이 성공적으로 올 때까지 계속 요청
          const potentialResponse = await this.requestAnswerToFastAPI();
          
          if (potentialResponse && potentialResponse.generatedText) {
            // 응답이 성공적이라면 response에 결과 저장
            response = potentialResponse;
            this.chatBotOutput = response.generatedText; // 챗봇 응답 저장
            console.log('ENFP 응답: ', this.chatBotOutput);
            this.chatHistory.push({ role: 'assistant', content: this.chatBotOutput[0] }); // gpt 형식에 맞게 변경
           
            // 요일 정보가 메세지에 들어있다면, 질문을 던짐
            if (this.chatBotOutput.toString().trim().includes("요일")) {
              const question = this.chatHistory
              this.sendDateQnAToChatBot(question)
            }
            // 장소 정보가 메세지에 들어있다면, 질문을 던짐
            if (this.chatBotOutput.toString().trim().includes("어디")) {
              const question = this.chatHistory
              this.sendLocationQnAToChatBot(question)
            }
            this.sendMessageToUnity(this.chatBotOutput);  // 챗봇 응답 Unity 화면에 출력
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
    // 날짜 QnA
    async sendDateQnAToChatBot(question) {
      console.log('요일', question)
      this.dateQuestion = [question]
      console.log('dateQuestion', this.dateQuestion)
      await this.requestDateQuestionToFastAPI({ "data": this.dateQuestion});
      let response = null;
      
      while (!response) {
        try {
          const DateResponse = await this.requestDateAnswerToFastAPI();
          
          if (DateResponse && DateResponse.generatedText) {
            response = DateResponse;
            this.date = response.generatedText; // 챗봇 응답 저장
            console.log('약속 날짜: ', this.date);
            console.log('value', this.date[0])
            this.sendMeetingDateToUnity(this.date[0]);
            this.date = ''; // 응답 저장소 초기화
          } else {
            console.log('답변이 아직 준비되지 않았습니다, 다시 시도합니다...');
          }
        } catch (error) {
          console.error("답변을 기다리는 중 오류가 발생했습니다:", error);
        }
        await new Promise(resolve => setTimeout(resolve, 2000)); // 2초 대기
      }
    },
    // 장소 QnA
    async sendLocationQnAToChatBot(question) {
      console.log('장소', question)
      this.locationQuestion = [question]
      await this.requestLocationQuestionToFastAPI({ "data": this.locationQuestion});
      let response = null;
      
      while (!response) {
        try {
          const LocationResponse = await this.requestLocationAnswerToFastAPI();
          
          if (LocationResponse && LocationResponse.generatedText) {
            response = LocationResponse;
            this.location = response.generatedText; // 챗봇 응답 저장
            console.log('약속 장소: ', this.location);
            console.log('value', this.location[0])
            this.sendMeetingLocationToUnity(this.location[0]);
            this.location = ''; // 응답 저장소 초기화
          } else {
            console.log('답변이 아직 준비되지 않았습니다, 다시 시도합니다...');
          }
        } catch (error) {
          console.error("답변을 기다리는 중 오류가 발생했습니다:", error);
        }
        await new Promise(resolve => setTimeout(resolve, 2000)); // 2초 대기
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
          if (this.sceneNumber === "0") {  // SceneNumber가 0일 때: 메시지를 문장 단위로 여러개 전송
            message.forEach((sentence, index) => {
              setTimeout(() => {
                this.unityInstance.SendMessage('GameManager', 'VueEvent', sentence.trim());
              }, index * 1000); // index * 1000 밀리초 (1초 간격)으로 시간차를 두어 보냅니다.
            });
          }
          else if (this.sceneNumber === "1") {  // SceneNumber가 1일 때: 메시지를 통째로 전송
            message.forEach((sentence, index) => {
              this.chatBotMessage += sentence;
            });
            this.unityInstance.SendMessage('GameManager', 'VueEvent', this.chatBotMessage);
            this.chatBotMessage = "";
          } else {
            console.warn(`Unexpected sceneNumber: ${this.sceneNumber}`);
          }
        } 
        else {
          console.error("Unity instance is not ready.");
      }
    },
    sendMeetingDateToUnity(date)  // 약속 날짜 데이터 전송
    {
      if (this.unityInstance)
      {
        this.unityInstance.SendMessage('GameManager', 'DateEvent', date);
        console.log("this.date", date);
      }
    },
    sendMeetingLocationToUnity(place)  // 약속 장소 데이터 전송
    {
      if (this.unityInstance)
      {
        this.unityInstance.SendMessage('GameManager', 'PlaceEvent', place);
        console.log("this.place", place);
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
      const [sceneNumber, userMessage] = message.split('[SceneNumber]');
      console.log("Scenenumber received from Unity:", sceneNumber);
      console.log("Message received from Unity:", userMessage);
      this.sceneNumber = sceneNumber;
      this.userMessage = userMessage;
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
  height: 90vh;
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
</style>