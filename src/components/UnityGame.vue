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
  height: 100vh; /* 화면 전체 높이를 사용 */
}

.unity-frame {
  width: 50%; /* 필요에 따라 조정 가능 50으로하니 가운데로 옴*/ 
  height: 80vh; /* 필요에 따라 조정 가능 */
  border: none;
}
</style>
