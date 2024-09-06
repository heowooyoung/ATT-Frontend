<template>
  <v-app>
    <navigation-menu-bar/>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavigationMenuBar from './navigationBar/NavigationMenuBar.vue';

export default defineComponent({
  components: { 
    NavigationMenuBar,
   },
  name: 'App',

  data () {
    return {
      //
    }
  },
})
</script>

<style>
.v-application {
  font-family: 'KimjungchulMyungjo', sans-serif !important;
  font-family: 'LINESeed', sans-serif !important;
}
@font-face {
  font-family:'KimjungchulMyungjo';
  src: url('assets/fonts/KimjungchulMyungjo-Regular.ttf') format('truetype');
  font-weight: 400;
}
@font-face {
  font-family:'KimjungchulMyungjo';
  src: url('assets/fonts/KimjungchulMyungjo-Light.ttf') format('truetype');
  font-weight: 300;
}
@font-face {
  font-family:'KimjungchulMyungjo';
  src: url('assets/fonts/KimjungchulMyungjo-Bold.ttf') format('truetype');
  font-weight: 700;
}
@font-face {
  font-family:'LINESeed';
  src: url('assets/fonts/LINESeedKR-Rg.ttf') format('truetype');
  font-weight: 400;
}
@font-face {
  font-family:'LINESeed';
  src: url('assets/fonts/LINESeedKR-Th.ttf') format('truetype');
  font-weight: 300;
}
@font-face {
  font-family:'LINESeed';
  src: url('assets/fonts/LINESeedKR-Bd.ttf') format('truetype');
  font-weight: 700;
}
</style>