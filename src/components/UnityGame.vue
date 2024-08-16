<template>
  <div class="unity-container">
    <iframe src="/Unity.html" class="unity-frame"></iframe>
  </div>
</template>

<script>

function unityEvent(message) {
  console.log("Received from Unity: ", message)
}

export default {
  name: 'UnityComponent',
  data() {
    return {
      message: ''
    };
  },
  mounted() {
    window.unityEvent = (data) => {
      this.message = data; // Unity로부터 받은 데이터를 Vue 데이터에 저장
      console.log(this.message);
    };
  },
}
</script>

<style scoped>
.unity-container {
  display: flex;
  justify-content: center; /* 가로 중앙 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
  margin-top: 35px;
  height: 605px;
}

.unity-frame {
  width: 96%;
  height: 100%;
  border: none;
}
</style>
