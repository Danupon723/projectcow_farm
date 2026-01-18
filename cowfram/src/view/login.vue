<template>
  <v-app>
    <v-container fluid class="pa-0 fill-height login-container">
      <v-row no-gutters class="fill-height">
        <v-col
          cols="12"
          md="7"
          lg="8"
          class="welcome-section d-none d-md-flex align-center justify-center flex-column text-white pa-12"
        >
          <div class="welcome-content">
            <v-chip
              color="rgba(255,255,255,0.2)"
              text-color="white"
              class="mb-6 px-4 py-4"
              label
              variant="flat"
              style="backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.2);"
            >
              <v-icon start size="small">mdi-cow</v-icon>
              Smart Dairy Farm v2.1.0
            </v-chip>

            <h1 class="text-h2 font-weight-black mb-6 leading-tight">
              จัดการฟาร์มวัวนม <br />
              <span class="text-highlight">อย่างมืออาชีพ</span>
            </h1>
            
            <p class="text-h6 font-weight-light mb-10 opacity-90" style="line-height: 1.6;">
              ติดตามสุขภาพโค, ปริมาณน้ำนม, และจัดการตารางการให้อาหาร <br>
              เพื่อผลผลิตที่มีคุณภาพและยั่งยืนสำหรับฟาร์มของคุณ
            </p>
            
            <div class="d-flex align-center mt-4">
              <div class="stat-card">
                <div class="text-h4 font-weight-bold">Healthy</div>
                <div class="text-caption font-weight-medium">Livestock Care</div>
              </div>
              <div class="mx-6 text-h4 font-weight-thin opacity-30">|</div>
              <div class="stat-card">
                <div class="text-h4 font-weight-bold">Fresh</div>
                <div class="text-caption font-weight-medium">Milk Quality</div>
              </div>
            </div>
          </div>
          
          <div class="bg-shape-1"></div>
          <div class="bg-shape-2"></div>
        </v-col>

        <v-col
          cols="12"
          md="5"
          lg="4"
          class="d-flex align-center justify-center bg-white"
        >
          <div class="login-wrapper pa-8 pa-sm-12">
            <div class="d-md-none text-center mb-10">
              <v-avatar color="green-darken-2" size="80" elevation="6" class="mb-4">
                <v-icon color="white" size="45">mdi-cow</v-icon>
              </v-avatar>
              <h2 class="text-h4 font-weight-black color-farm">Smart Dairy Farm</h2>
            </div>

            <div class="mb-10">
              <h2 class="text-h3 font-weight-bold color-farm mb-2 form-title">ยินดีต้อนรับ</h2>
              <div class="d-flex align-center">
                <v-divider class="me-3" thickness="4" color="green-darken-1" style="width: 50px; opacity: 1;"></v-divider>
                <p class="text-body-1 text-medium-emphasis mb-0">เข้าสู่ระบบจัดการฟาร์มของคุณ</p>
              </div>
            </div>

            <v-form ref="loginForm" @submit.prevent="handleLogin">
              <v-text-field
                v-model="formData.email"
                label="อีเมลผู้ใช้งาน / ไอดีพนักงาน"
                placeholder="admin@dairyfarm.com"
                variant="outlined"
                prepend-inner-icon="mdi-account-circle-outline"
                class="mb-4"
                color="green-darken-2"
                :rules="[v => !!v || 'กรุณากรอกข้อมูลผู้ใช้งาน']"
                required
              ></v-text-field>

              <v-text-field
                v-model="formData.password"
                label="รหัสผ่าน"
                :type="showPassword ? 'text' : 'password'"
                variant="outlined"
                prepend-inner-icon="mdi-lock-open-outline"
                :append-inner-icon="showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                @click:append-inner="showPassword = !showPassword"
                class="mb-2"
                color="green-darken-2"
                :rules="[v => !!v || 'กรุณากรอกรหัสผ่าน']"
                required
              ></v-text-field>

              <div class="d-flex justify-end mb-8">
                <v-btn variant="text" color="green-darken-3" size="small" class="text-none font-weight-bold">
                  ลืมรหัสผ่านใช่หรือไม่?
                </v-btn>
              </div>

              <v-btn
                block
                size="x-large"
                color="green-darken-2"
                elevation="4"
                rounded="lg"
                class="login-btn mb-8"
                :loading="loading"
                type="submit"
              >
                เข้าสู่ระบบฟาร์ม
                <v-icon end>mdi-chevron-right</v-icon>
              </v-btn>

              <div class="text-center">
                <span class="text-body-2 text-medium-emphasis">ยังไม่เป็นสมาชิก?</span>
                <v-btn variant="text" color="green-darken-2" router link to="/register" class="text-body-2 font-weight-bold px-2 text-none">
                  ติดต่อเจ้าของฟาร์ม
                </v-btn>
              </div>
            </v-form>
            
            <div class="text-center text-caption text-disabled mt-12">
              <v-icon size="x-small" class="me-1">mdi-leaf</v-icon>
              2026 Smart Dairy Farm Management. All rights reserved.
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const loginForm = ref(null);
const showPassword = ref(false);
const loading = ref(false);

const formData = ref({
  email: '',
  password: ''
});

const API_URL = 'http://localhost:7000/api/auth';

const handleLogin = async () => {
  const { valid } = await loginForm.value.validate();
  if (!valid) return;

  loading.value = true;
  try {
    const res = await axios.post(`${API_URL}/login`, formData.value);
    if (res.data.success || res.data.token) {
      alert('เข้าสู่ระบบสำเร็จ กำลังพาคุณไปยังหน้าจัดการฟาร์ม');
    } else {
      alert(res.data.message || 'อีเมลหรือรหัสผ่านไม่ถูกต้อง');
    }
  } catch (err) {
    alert(err.response?.data?.message || 'ไม่สามารถเชื่อมต่อระบบฟาร์มได้ในขณะนี้');
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;600;700&display=swap');

.login-container {
  font-family: 'Kanit', sans-serif !important;
  background-color: #f9fbf9;
}

/* ปรับสีพื้นหลังฝั่งซ้ายเป็นโทนเขียวฟาร์ม/ธรรมชาติ */
.welcome-section {
  background: linear-gradient(135deg, #1b5e20 0%, #2e7d32 50%, #43a047 100%);
  position: relative;
  overflow: hidden;
}

.text-highlight {
  color: #fff200; /* สีเหลืองทองแบบทุ่งหญ้า/แสงแดด */
  background: linear-gradient(to right, #fff200, #a8e063);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 800;
}

/* กราฟิกทรงอินทรีย์ (Organic Shapes) */
.bg-shape-1 {
  position: absolute;
  width: 800px;
  height: 800px;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%);
  border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
  top: -150px;
  left: -150px;
}

.bg-shape-2 {
  position: absolute;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(168, 224, 99, 0.15) 0%, rgba(168, 224, 99, 0) 70%);
  border-radius: 50%;
  bottom: -100px;
  right: -50px;
}

.color-farm {
  color: #1b5e20;
}

.stat-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  padding: 20px 30px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-align: center;
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: scale(1.05);
}

.login-btn {
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 1px;
}

/* ปรับแต่ง Input Field ให้ดูโค้งมนเข้ากับธีม */
:deep(.v-field--variant-outlined) {
  border-radius: 12px !important;
}
</style>