<template>
    <v-container>
      <v-form>
        <h2>회원가입 설문조사</h2>
  
        <h3>기본 정보</h3>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field label="나이 (만)" v-model="age" required></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-select label="성별" :items="['남성', '여성']" required></v-select>
          </v-col>
          <v-col cols="12" sm="6">
            <v-select :items="mbtiItems" required>
              <template v-slot:prepend>
                <v-icon left>mdi-account</v-icon> <!-- 원하는 아이콘 또는 구성 요소 -->
                <span>MBTI</span>
              </template>
            </v-select>
          </v-col>
        </v-row>
        
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="submitSurvey">
            제출하기
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-container>
  </template>
  
<script>
import { mapActions } from 'vuex';
import axiosInst from "@/utility/axiosInstance"

export default {
name: 'SurveyPage',
data() {
    return {
    age: '',
    gender: '',
    mbtiItems: ['ISTP', 'ISTJ', 'ISFP', 'ISFJ', 'INTP', 'INTJ', 'INFP', 'INFJ',
                'ESTP', 'ESTJ', 'ESFP', 'ESFJ', 'ENTP', 'ENTJ', 'ENFP', 'ENFJ'
    ], // MBTI 유형
    };
},
methods: {
    ...mapActions(['submitSurvey']),
    async submitSurvey() {
    const payload = {
        age: Number(this.age) || 0,
        gender: this.gender === '남성' ? 1 : 2,
        // mbti: this.mbtiItems ===
    };
    console.log('Survey payload:', payload);
    try {
        await axiosInst.djangoAxiosInst.post('/survey/register', payload); // Django 서버의 엔드포인트로 가정
        this.$router.push('/');
    } catch (error) {
        console.error('Survey submission failed:', error);
        
    }
    }
}
}
</script>