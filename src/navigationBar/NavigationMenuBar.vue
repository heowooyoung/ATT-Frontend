<template>
    <v-app-bar color="#ebeb48" height="48">
      <v-toolbar-title>
        <v-btn text @click="goToHome" class="navbar-title-btn">
          <span> IF </span>
        </v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn v-if="!isAuthenticated" text @click="signIn" class="btn-text">
        <v-icon left>mdi-login</v-icon>
        <span>LOGIN</span>
      </v-btn>
  
      <v-menu v-if="isAuthenticated" close-on-content-click>
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" class="btn-text" style="margin-right: 16px">
            <v-icon class="mdi-icon">mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in myPageItems"
            :key="index"
            @click="item.action">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </template>
  
  <script scoped>
  import "@mdi/font/css/materialdesignicons.css";
  import router from "@/router";
  import { mapActions, mapState } from "vuex";
  const authenticationModule = "authenticationModule";
  
  export default {
    data() {
      return {
        myPageItems: [
          {
            title: "MY PAGE",
            action: () => {this.goToMyPage();},
          },
          {
            title: "LOGOUT",
            action: () => {this.signOut()},
          },
        ],
      };
    },
    computed: {
      ...mapState(authenticationModule, ["isAuthenticated"]),
    },
    methods: {
      ...mapActions(authenticationModule, ["requestLogoutToDjango"]),
      goToHome() {
        router.push("/")
      },
      signIn() {
        router.push("/account/login")
      },
      signOut() {
        this.requestLogoutToDjango()
        router.push("/")
      },
      goToMyPage() {
        router.push("/account/mypage")
      },
    },
    mounted() {
      console.log("navigation bar mounted()")
      const userToken = localStorage.getItem("userToken")
      if (userToken)
      {
        console.log("You already has a userToken!")
        this.$store.state.authenticationModule.isAuthenticated = true
      }
    },
  };
  </script>
  
  <style scoped>
  .navbar-title-btn {
    color: black;
    font-size: 24px;
    font-weight: bold;
  }
  
  .mdi-icon {
    color: black;
    font-size: 36px;
  }
  
  .btn-text {
    font-size: 18px;
    margin-right: 16px;
    color: black;
  }
  
  .v-btn {
    text-transform: uppercase;
  }
  
  .v-btn:hover .btn-text {
    color: white;
  }
  
  .v-btn:focus .btn-text {
    color: white;
  }
  </style>