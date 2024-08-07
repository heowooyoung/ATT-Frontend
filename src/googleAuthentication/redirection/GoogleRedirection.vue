<template>
  <div></div>
</template>

<script>
import { mapActions } from 'vuex'

const googleAuthenticationModule = 'googleAuthenticationModule'

export default {
  methods: {
    ...mapActions(googleAuthenticationModule, [
      'requestAccessTokenToDjangoRedirection',
    ]),

    async setRedirectData () {
        const code = this.$route.query.code
        await this.requestAccessTokenToDjangoRedirection({ code })
        const accessToken = localStorage.getItem("accessToken")
    }
  },
  async created () {
      await this.setRedirectData()
  }
}
</script>