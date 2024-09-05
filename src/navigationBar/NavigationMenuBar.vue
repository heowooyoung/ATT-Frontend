<template>
  <v-navigation-drawer v-model="drawer" app temporary :width="70">
    <v-list dense>
      <v-list-item v-for="(item, index) in sidebarItems" :key="index" @click="item.action">
        <v-list-item-icon>
          <v-icon> {{ item.icon }}</v-icon>
        </v-list-item-icon>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-app-bar app flat dense>
    <v-btn icon @click="toggleDrawer">
      <v-icon>mdi-menu</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import router from '@/router'
import { mapState, mapActions } from 'vuex'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NavigationMenuBar',
  data() {
    return {
      drawer: false,
      sidebarItems: [
        { icon: 'mdi-home', action: () => this.goToHomePage() },
        { icon: 'mdi-forum', action: () => this.goToBoardList() },
        { icon: this.isAuthenticated ? 'mdi-logout' : 'mdi-login', action: () => this.isAuthenticated ? this.requestLogoutToDjango() : this.signIn() }
      ]
    };
  },
  computed: {
    ...mapState('authenticationModule', ['isAuthenticated'])
  },
  methods: {
    ...mapActions('authenticationModule', ['requestLogoutToDjango']),
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    goToHomePage() {
      router.push('/')
    },
    signIn() {
      router.push('/account/login')
    },
    goToBoardList() {
      router.push('/board/list')
    },
  },
})
</script>

<style scoped>
.transparent-nav-bar {
  background-color: transparent; 
  box-shadow: none; 
  border: none; 
  padding: 0; 
}

.nav-content-container {
  width: 100%; 
  max-width: 1200px; 
  margin: 0 auto; 
  padding: 0 115px; 
}

.transparent-btn {
  color: black; 
  transition: background-color 0.3s;
}

.transparent-btn:hover {
  background-color: #ADD8E6; 
}

.logo-image {
  height: 60px; 
  width: 80px; 
  object-fit: contain; 
  display: block;
}
</style>