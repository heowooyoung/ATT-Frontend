<template>
    <div></div>    
</template>

<script>
import { mapActions } from 'vuex';

const authenticationModule = 'naverAuthenticationModule'
const accountModule = 'accountModule'

export default {
    methods: {
        ...mapActions(authenticationModule,
        ['requestAccessTokenToDjangoRedirection', 'requestNaverUserInfoToDjango']),
        ...mapActions(accountModule, ['requestEmailDuplicationCheckToDjango']),
        
        async setRedirectData () {
            const code = this.$route.query.code
            await this.requestAccessTokenToDjangoRedirection({ code })

            const userInfo = await this.requestNaverUserInfoToDjango()
            const email = userInfo.response.email
            console.log('userInfo: ', userInfo)
            console.log('email: ', email)

            const isEmailDuplication = await this.requestEmailDuplicationCheckToDjango(email)
        
            if (isEmailDuplication === true) {
                console.log('기존 가입 고객입니다.')
                const accessToken = localStorage.getItem("accessToken")

                this.$router.push('/')
                } else {
                        console.log('신규 가입 고객입니다.')
                        this.$router.push('/account/naver-register')
                }
        },
    },
    async created () {
            await this.setRedirectData()
        }
}
</script>
