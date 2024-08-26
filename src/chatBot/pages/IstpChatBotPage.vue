<template>
    <div>
      <h1>Fine-Tuned OpenAI ISTPChatBot</h1>
      <div v-for="(message, index) in chatHistory" :key="index" class="message">
        <strong>{{ message.sender }}:</strong> {{ message.text }}
      </div>
      <input
        v-model="userInput"
        @keyup.enter="sendMessage"
        placeholder="메세지를 입력하세요..."
      />
      <button @click="sendMessage">Send</button>
    </div>
  </template>
  
<script>
import { mapActions } from "vuex";
const userInputModule = 'userInputModule'  
export default {
data() {
    return {
    userInput: "",
    chatHistory: [],
    };
},
methods: {
    ...mapActions(userInputModule, ['requestResponseToFastAPI']),

    async sendMessage() {
        if (this.userInput.trim() === "") return;

        const userMessage = this.userInput;
        this.chatHistory.push({ sender: "User", text: userMessage })
        this.userInputMessage = this.userInput
        this.userInput = '' // 메세지 보냈다면 초기화하기
        
        // 메세지 챗봇에게 보내기 action으로 구현
        const response = await this.requestResponseToFastAPI({"data": this.userInputMessage})
        console.log('istp 응답: ',response)
        //const response = await this.requestResponseToFastAPI()
        this.chatBotOutput = response.generatedText
        this.chatHistory.push({sender: 'Ai', text: this.chatBotOutput})

        this.chatBotOutput = ''
    },
},
};
</script>
  
<style>
.message {
margin-bottom: 10px;
}
input {
margin-top: 10px;
padding: 5px;
}
button {
margin-left: 10px;
padding: 5px 10px;
}
</style>
