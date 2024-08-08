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
      'requestUserInfoToDjango',
    ]),

    async setRedirectData () {
        const code = this.$route.query.code
        await this.requestAccessTokenToDjangoRedirection({ code })

        const userInfo = await this.requestUserInfoToDjango()
        const email = userInfo.email
        console.log('userInfo:', userInfo)
        console.log('email:', userInfo.email)
    }
  },
  async created () {
      await this.setRedirectData()
  }
}
</script>