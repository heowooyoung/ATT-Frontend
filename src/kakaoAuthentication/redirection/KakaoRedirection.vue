<template>
    <div></div>    
</template>

<script>
import { mapActions } from 'vuex';

const kakaoAuthenticationModule = 'kakaoAuthenticationModule'
const accountModule = 'accountModule'

export default {
    methods: {
        ...mapActions(kakaoAuthenticationModule,
        ['requestAccessTokenToDjangoRedirection', 'requestKakaoUserInfoToDjango']),

        async setRedirectData () {
            const code = this.$route.query.code
            await this.requestAccessTokenToDjangoRedirection({ code })

            const userInfo = await this.requestKakaoUserInfoToDjango()
            const email = userInfo.kakao_account.email
            console.log('userInfo:', userInfo)
            console.log('email:', email)
        },
    },

    async created () {
            await this.setRedirectData()
        }
}
</script>
