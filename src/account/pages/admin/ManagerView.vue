<template>
  <v-container>
    <h1>회원 정보 관리</h1>
    <v-row>
      <v-col cols="12" md="3">
        <v-select v-model="selectedGender" :items="genderOptions" label="성별" dense outlined></v-select>
      </v-col>
      <v-col cols="12" md="3">
        <v-select v-model="selectedLoginType" :items="loginTypeOptions" label="로그인 타입" dense outlined></v-select>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field v-model="searchQuery" label="검색어를 입력하세요" append-icon="mdi-magnify" dense outlined></v-text-field>
      </v-col>
    </v-row>

    <v-data-table :headers="headers" :items="filteredUsers" :items-per-page="itemsPerPage" v-model:page="page" :footer-props="{itemsPerPageOptions: [5, 10, 20],}" item-key="id" class="elevation-1">
      <template #top>
        <v-toolbar flat>
          <v-toolbar-title>회원 목록</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="fetchUsers">새로고침</v-btn>
        </v-toolbar>
      </template>

      <template #item="{ item }">
        <tr>
          <td>{{ item.id }}</td> 
          <td>{{ item.email }}</td>
          <td>{{ item.nickname }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.gender }}</td>
          <td>{{ item.mbti }}</td>
          <td>{{ item.loginType }}</td>
        </tr>
      </template>
    </v-data-table>

    <v-pagination v-model="page" :length="pageCount" :total-visible="7" class="my-4"></v-pagination>
    <h1>모델 피드백 하기</h1>
    <v-btn color="primary" @click="ModelFeedback">모델 피드백 하는 버튼</v-btn>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { User } from '@/account/store/states'; 

const router = useRouter();

const headers = ref([
  { text: 'No', value: 'id' },
  { text: '이메일', value: 'email' },
  { text: '닉네임', value: 'nickname' },
  { text: '이름', value: 'name' },
  { text: '성별', value: 'gender' },
  { text: 'MBTI', value: 'mbti' },
  { text: '로그인 타입', value: 'loginType' },
]);

const users = ref<User[]>([]);
const searchQuery = ref('');
const selectedGender = ref('');
const selectedLoginType = ref('');
const itemsPerPage = ref(10);
const page = ref(1);

const genderOptions = ref(['전체', 'M', 'F']);
const loginTypeOptions = ref(['전체', 'Google', 'Kakao', 'Naver']);

const fetchUsers = async () => {
  try {
    const token = localStorage.getItem('access');
    const response = await axios.get(`${process.env.VUE_APP_BASE_URL}/api/users/`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    users.value = response.data || [];
  } catch (error) {
    console.error('Failed to fetch users:', error);
    if (error.response && error.response.status === 401) {
      alert('인증이 필요합니다. 로그인 페이지로 이동합니다.');
      router.push('/account/login');
    } else {
      users.value = [];
    }
  }
};

const filteredUsers = computed(() => {
  return users.value
    ? users.value.filter(user => {
        const matchesSearch = searchQuery.value
          ? user.name.includes(searchQuery.value) ||
            user.email.includes(searchQuery.value) ||
            user.nickname.includes(searchQuery.value)
          : true;

        const matchesGender = selectedGender.value && selectedGender.value !== '전체'
          ? user.gender === selectedGender.value
          : true;

        const matchesLoginType = selectedLoginType.value && selectedLoginType.value !== '전체'
          ? user.loginType === selectedLoginType.value
          : true;

        return matchesSearch && matchesGender && matchesLoginType;
      })
      .slice((page.value - 1) * itemsPerPage.value, page.value * itemsPerPage.value)
    : [];
});

const pageCount = computed(() => {
  return Math.ceil(users.value.length / itemsPerPage.value);
});

const ModelFeedback = () => {
  alert("서비스 준비중입니다.");
};

onMounted(() => {
  fetchUsers();
});
</script>

<style scoped>
h1 {
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
}

.v-data-table {
  margin-top: 20px;
}

.v-text-field {
  margin-bottom: 20px;
}
</style>