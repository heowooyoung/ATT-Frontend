<template>
  <v-container class="signup-container">
    <v-form @submit.prevent="onSubmit" class="signup-form">
      <h1>회원가입</h1>
      <v-text-field v-model="user.email" label="이메일" type="email" hide-details class="no-border"></v-text-field>
      <v-text-field v-model="user.password" label="비밀번호" type="password" hide-details class="no-border" required></v-text-field>
      <v-text-field v-model="user.passwordConfirm" label="비밀번호 확인" type="password" hide-details class="no-border" required></v-text-field>
      <v-text-field v-model="user.name" label="이름" hide-details class="no-border" required></v-text-field>
      <v-text-field v-model="user.nickname" label="닉네임" hide-details class="no-border" required></v-text-field>
      <v-select v-model="user.mbti" :items="mbtiOptions" label="MBTI" hide-details class="no-border" required></v-select>
      <v-radio-group v-model="user.gender" label="성별" class="no-border" required>
        <v-radio label="남자" value="M"></v-radio>
        <v-radio label="여자" value="F"></v-radio>
      </v-radio-group>
      <v-checkbox v-model="isAgreeChecked" label="인증 약관 전체동의" required></v-checkbox>
      <v-btn type="submit" color="primary" class="submit-btn">가입하기</v-btn>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

const user = reactive({
  password: '',
  passwordConfirm: '',
  email: '',
  name: '',
  nickname: '',
  mbti: '',
  gender: '',
});

const isAgreeChecked = ref(false);
const mbtiOptions = ref<string[]>([]);

const checkEmailDuplicate = async (): Promise<boolean> => {
  try {
    const response = await axios.post(`${process.env.VUE_APP_BASE_URL}/api/check-email/`, {
      email: user.email,
    });
    return response.data.is_duplicate;
  } catch (error) {
    console.error('Failed to check email duplication:', error);
    return false;
  }
};

const checkNicknameDuplicate = async (): Promise<boolean> => {
  try {
    const response = await axios.post(`${process.env.VUE_APP_BASE_URL}/api/check-nickname/`, {
      nickname: user.nickname,
    });
    return response.data.is_duplicate;
  } catch (error) {
    console.error('Failed to check nickname duplication:', error);
    return false;
  }
};

const onSubmit = async () => {
  if (isAgreeChecked.value && user.email && user.password && user.password === user.passwordConfirm) {
    const isEmailDuplicate = await checkEmailDuplicate();
    if (isEmailDuplicate) {
      alert('이미 사용 중인 이메일입니다. 다른 이메일을 입력해주세요.');
      return;
    }

    const isNicknameDuplicate = await checkNicknameDuplicate();
    if (isNicknameDuplicate) {
      alert('이미 사용 중인 닉네임입니다. 다른 닉네임을 입력해주세요.');
      return;
    }

    try {
      await axios.post(`${process.env.VUE_APP_BASE_URL}/api/register/`, {
        email: user.email,
        password: user.password,
        name: user.name,
        nickname: user.nickname,
        mbti: user.mbti,
        gender: user.gender,
      });

      alert('회원가입이 성공적으로 처리되었습니다!');
      await router.push('/account/login');
    } catch (error) {
      console.error('Registration failed:', error);
      alert('회원가입 실패');
    }
  } else {
    alert('모든 필수 입력 항목을 작성하고 약관에 동의해주세요.');
  }
};

const fetchMbtiOptions = async () => {
  try {
    const response = await axios.get(`${process.env.VUE_APP_BASE_URL}/api/mbti-options/`);
    mbtiOptions.value = response.data.mbti_options;
  } catch (error) {
    console.error('Failed to fetch MBTI options:', error);
  }
};

onMounted(fetchMbtiOptions);
</script>

<style scoped>
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.signup-form {
  max-width: 400px;
  width: 100%;
  text-align: center;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.signup-form h1 {
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
}

.signup-form .v-text-field,
.signup-form .v-select,
.signup-form .v-radio-group {
  margin-bottom: 20px;
  border: none;
}

.signup-form .no-border .v-input__control {
  border-bottom: none;
}

.signup-form .v-input__slot {
  border: none;
  background-color: transparent;
}

.signup-form .v-input__append-inner {
  margin-right: 0;
}

.signup-form .v-input--hide-details .v-input__details {
  display: none;
}

.signup-form .v-checkbox {
  margin-bottom: 30px;
}

.submit-btn {
  width: 100%;
  height: 50px;
}
</style>