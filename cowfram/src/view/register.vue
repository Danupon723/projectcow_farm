<template>
  <v-app>
    <v-container fluid class="pa-0 fill-height register-container">
      <v-row no-gutters class="fill-height">
        <!-- ด้านซ้าย: Branding & Info (Desktop Only) -->
        <v-col
          cols="12"
          md="5"
          lg="4"
          class="info-section d-none d-md-flex align-center justify-center flex-column text-white pa-12"
        >
          <div class="info-content">
            <v-btn
              icon="mdi-arrow-left"
              variant="text"
              color="white"
              class="mb-8"
              @click="goToLogin"
            ></v-btn>
            
            <v-avatar color="rgba(255,255,255,0.2)" size="100" class="mb-6">
              <v-icon size="60" color="white">mdi-account-plus</v-icon>
            </v-avatar>

            <h2 class="text-h3 font-weight-black mb-4">เข้าร่วมกับเรา</h2>
            <p class="text-body-1 mb-8 opacity-80">
              เริ่มต้นการจัดการฟาร์มดิจิทัลวันนี้ เพื่อเพิ่มประสิทธิภาพการผลิตและติดตามสุขภาพโคของคุณได้อย่างแม่นยำ
            </p>

            <v-list bg-color="transparent" theme="dark">
              <v-list-item prepend-icon="mdi-check-circle" title="บันทึกข้อมูลน้ำนมรายวัน"></v-list-item>
              <v-list-item prepend-icon="mdi-check-circle" title="แจ้งเตือนรอบการฉีดวัคซีน"></v-list-item>
              <v-list-item prepend-icon="mdi-check-circle" title="วิเคราะห์ต้นทุนและกำไร"></v-list-item>
            </v-list>
          </div>
          <div class="leaf-pattern"></div>
        </v-col>

        <!-- ด้านขวา: Register Form Section -->
        <v-col
          cols="12"
          md="7"
          lg="8"
          class="d-flex align-center justify-center bg-white"
        >
          <div class="register-wrapper pa-8 pa-sm-16">
            <div class="mb-8">
              <h2 class="text-h4 font-weight-bold color-farm mb-2">ลงทะเบียนสมาชิกใหม่</h2>
              <p class="text-body-1 text-medium-emphasis">กรุณากรอกข้อมูลให้ครบถ้วนเพื่อสร้างบัญชีฟาร์มของคุณ</p>
            </div>

            <v-form ref="registerForm" @submit.prevent="handleRegister">
              <v-row>
                <!-- ชื่อ-นามสกุล -->
                <v-col cols="12" sm="6" class="py-1">
                  <v-text-field
                    v-model="regData.firstName"
                    label="ชื่อ"
                    variant="outlined"
                    color="green-darken-2"
                    :rules="[v => !!v || 'กรุณากรอกชื่อ']"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="py-1">
                  <v-text-field
                    v-model="regData.lastName"
                    label="นามสกุล"
                    variant="outlined"
                    color="green-darken-2"
                    :rules="[v => !!v || 'กรุณากรอกนามสกุล']"
                  ></v-text-field>
                </v-col>

                <!-- ชื่อฟาร์ม -->
                <v-col cols="12" class="py-1">
                  <v-text-field
                    v-model="regData.farmName"
                    label="ชื่อฟาร์ม / หน่วยงาน"
                    variant="outlined"
                    prepend-inner-icon="mdi-home-group"
                    color="green-darken-2"
                    :rules="[v => !!v || 'กรุณากรอกชื่อฟาร์ม']"
                  ></v-text-field>
                </v-col>

                <!-- อีเมล -->
                <v-col cols="12" class="py-1">
                  <v-text-field
                    v-model="regData.email"
                    label="อีเมล"
                    type="email"
                    variant="outlined"
                    prepend-inner-icon="mdi-email-outline"
                    color="green-darken-2"
                    :rules="[v => !!v || 'กรุณากรอกอีเมล', v => /.+@.+\..+/.test(v) || 'รูปแบบอีเมลไม่ถูกต้อง']"
                  ></v-text-field>
                </v-col>

                <!-- รหัสผ่าน -->
                <v-col cols="12" sm="6" class="py-1">
                  <v-text-field
                    v-model="regData.password"
                    label="รหัสผ่าน"
                    :type="showPass ? 'text' : 'password'"
                    variant="outlined"
                    color="green-darken-2"
                    :append-inner-icon="showPass ? 'mdi-eye-off' : 'mdi-eye'"
                    @click:append-inner="showPass = !showPass"
                    :rules="[v => !!v || 'กรุณากรอกรหัสผ่าน', v => v.length >= 6 || 'รหัสผ่านต้องมีอย่างน้อย 6 ตัว']"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="py-1">
                  <v-text-field
                    v-model="regData.confirmPassword"
                    label="ยืนยันรหัสผ่าน"
                    :type="showPass ? 'text' : 'password'"
                    variant="outlined"
                    color="green-darken-2"
                    :rules="[v => v === regData.password || 'รหัสผ่านไม่ตรงกัน']"
                  ></v-text-field>
                </v-col>

                <!-- ยอมรับเงื่อนไข -->
                <v-col cols="12" class="py-0">
                  <v-checkbox
                    v-model="regData.agree"
                    color="green-darken-2"
                    :rules="[v => !!v || 'คุณต้องยอมรับเงื่อนไข']"
                  >
                    <template v-slot:label>
                      <div class="text-body-2">
                        ฉันยอมรับ <a href="#" class="text-green-darken-2 font-weight-bold">ข้อตกลงและเงื่อนไขการใช้งาน</a>
                      </div>
                    </template>
                  </v-checkbox>
                </v-col>
              </v-row>

              <v-btn
                block
                size="x-large"
                color="green-darken-2"
                elevation="4"
                rounded="lg"
                class="mt-4 mb-6 font-weight-bold"
                :loading="loading"
                type="submit"
              >
                สร้างบัญชีผู้ใช้งาน
              </v-btn>

              <div class="text-center">
                <span class="text-body-2">เป็นสมาชิกอยู่แล้ว?</span>
                <v-btn
                  variant="text"
                  color="green-darken-2"
                  class="text-body-2 font-weight-bold px-2"
                  @click="goToLogin"
                >
                  เข้าสู่ระบบที่นี่
                </v-btn>
              </div>
            </v-form>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup>
import { ref, reactive } from 'vue'
import router from '../router'

const registerForm = ref(null)
const loading = ref(false)
const showPass = ref(false)

const regData = reactive({
  firstName: '',
  lastName: '',
  farmName: '',
  email: '',
  password: '',
  confirmPassword: '',
  agree: false
})

const handleRegister = async () => {
  const { valid } = await registerForm.value.validate()
  if (!valid) return

  loading.value = true

  try {
    // ==========================
    // จำลองเรียก API สมัครสมาชิก
    // ==========================
    await new Promise(resolve => setTimeout(resolve, 1500))

    // สมมติว่า backend ส่ง token กลับมา
    const fakeToken = 'farm_token_' + Date.now()

    // เก็บ token
    localStorage.setItem('token', fakeToken)

    alert('ลงทะเบียนสำเร็จ! ยินดีต้อนรับเข้าสู่ระบบฟาร์ม 🐄')

    // พาเข้า dashboard
    router.push('/admin/dashbord')
  } catch (err) {
    alert('เกิดข้อผิดพลาดในการสมัครสมาชิก')
    console.error(err)
  } finally {
    loading.value = false
  }
}

const goToLogin = () => {
  router.push('/')
}
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;600;700&display=swap');

.register-container {
  font-family: 'Kanit', sans-serif !important;
  background-color: #ffffff;
}

/* ส่วนข้อมูลฝั่งซ้าย (โทนเขียวฟาร์ม) */
.info-section {
  background: linear-gradient(180deg, #1b5e20 0%, #388e3c 100%);
  position: relative;
  overflow: hidden;
}

.info-content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 320px;
}

.leaf-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.1;
  background-image: radial-gradient(#ffffff 1px, transparent 1px);
  background-size: 20px 20px;
}

.register-wrapper {
  width: 100%;
  max-width: 700px;
}

.color-farm {
  color: #1b5e20;
}

/* ปรับแต่งความโค้งมนของ Input */
:deep(.v-field--variant-outlined) {
  border-radius: 12px !important;
  background-color: #fcfdfc;
}

/* ปุ่มลงทะเบียน */
.v-btn {
  text-transform: none !important;
  letter-spacing: 0.5px;
}
</style>