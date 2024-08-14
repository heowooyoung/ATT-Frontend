<template>
  <div class="unity-container">
    <iframe src="/Unity.html" class="unity-frame"></iframe>
  </div>
</template>

<script>
export default {
  name: 'UnityComponent'
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
