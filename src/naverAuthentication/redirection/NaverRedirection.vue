<template>
    <div></div>    
</template>

<script>
import { mapActions } from 'vuex';

const naverAuthenticationModule = 'naverAuthenticationModule'
const accountModule = 'accountModule'
const authenticationModule = 'authenticationModule'

export default {
    methods: {
        ...mapActions(naverAuthenticationModule,
        ['requestAccessTokenToDjangoRedirection', 'requestNaverUserInfoToDjango']),
        ...mapActions(accountModule, ['requestEmailDuplicationCheckToDjango']),
        ...mapActions(authenticationModule, ['requestAddRedisAccessTokenToDjango']),
        
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

                if (accessToken) {
                    await this.requestAddRedisAccessTokenToDjango({ email, accessToken })
                } else {
                    console.error('AccessToken is missing');
                }

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
