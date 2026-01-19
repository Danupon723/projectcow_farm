<template>
  <v-container fluid class="dashboard-container pa-6">
    <!-- Header -->
    <v-row class="mb-6" align="center">
      <v-col cols="12" md="6">
        <h1 class="text-h4 font-weight-bold color-farm">แดชบอร์ดฟาร์มวัวนม</h1>
        <p class="text-body-2 text-medium-emphasis">ภาพรวมสถานะฟาร์มวันนี้</p>
      </v-col>
      <v-col cols="12" md="6" class="text-md-right">
        <v-chip color="green-darken-1" variant="flat" class="px-4">
          <v-icon start>mdi-calendar</v-icon>
          {{ today }}
        </v-chip>
      </v-col>
    </v-row>

    <!-- Summary Cards -->
    <v-row class="mb-8">
      <v-col cols="12" sm="6" md="3">
        <v-card class="stat-card" elevation="6">
          <v-card-text>
            <div class="d-flex align-center justify-space-between">
              <div>
                <div class="text-caption">จำนวนวัวทั้งหมด</div>
                <div class="text-h4 font-weight-bold">{{ stats.totalCows }}</div>
              </div>
              <v-avatar color="green-lighten-4">
                <v-icon color="green-darken-2">mdi-cow</v-icon>
              </v-avatar>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card class="stat-card" elevation="6">
          <v-card-text>
            <div class="d-flex align-center justify-space-between">
              <div>
                <div class="text-caption">น้ำนมวันนี้ (ลิตร)</div>
                <div class="text-h4 font-weight-bold">{{ stats.milkToday }}</div>
              </div>
              <v-avatar color="blue-lighten-4">
                <v-icon color="blue-darken-2">mdi-cup-water</v-icon>
              </v-avatar>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card class="stat-card" elevation="6">
          <v-card-text>
            <div class="d-flex align-center justify-space-between">
              <div>
                <div class="text-caption">วัวสุขภาพดี</div>
                <div class="text-h4 font-weight-bold">{{ stats.healthy }}</div>
              </div>
              <v-avatar color="teal-lighten-4">
                <v-icon color="teal-darken-2">mdi-heart-pulse</v-icon>
              </v-avatar>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card class="stat-card" elevation="6">
          <v-card-text>
            <div class="d-flex align-center justify-space-between">
              <div>
                <div class="text-caption">แจ้งเตือน</div>
                <div class="text-h4 font-weight-bold">{{ stats.alerts }}</div>
              </div>
              <v-avatar color="red-lighten-4">
                <v-icon color="red-darken-2">mdi-alert</v-icon>
              </v-avatar>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Main Content -->
    <v-row>
      <!-- Recent Activity -->
      <v-col cols="12" md="6">
        <v-card elevation="6" rounded="xl">
          <v-card-title class="font-weight-bold color-farm">
            <v-icon start>mdi-history</v-icon>
            กิจกรรมล่าสุด
          </v-card-title>
          <v-divider></v-divider>
          <v-list>
            <v-list-item
              v-for="(item, i) in activities"
              :key="i"
              :prepend-icon="item.icon"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
              <v-list-item-subtitle>{{ item.time }}</v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <!-- Quick Actions -->
      <v-col cols="12" md="6">
        <v-card elevation="6" rounded="xl">
          <v-card-title class="font-weight-bold color-farm">
            <v-icon start>mdi-flash</v-icon>
            เมนูลัด
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-row>
              <v-col cols="6" sm="4" v-for="(action, i) in actions" :key="i">
                <v-btn
                  block
                  color="green-darken-1"
                  variant="tonal"
                  rounded="lg"
                  class="py-6"
                >
                  <v-icon size="28">{{ action.icon }}</v-icon>
                  <div class="text-caption mt-2">{{ action.label }}</div>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const today = new Date().toLocaleDateString('th-TH', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})

const stats = ref({
  totalCows: 48,
  milkToday: 320,
  healthy: 45,
  alerts: 3
})

const activities = ref([
  { title: 'บันทึกน้ำนมวัว #12', time: '10 นาทีที่แล้ว', icon: 'mdi-cup-water' },
  { title: 'ตรวจสุขภาพวัว #5', time: '1 ชั่วโมงที่แล้ว', icon: 'mdi-heart-pulse' },
  { title: 'เพิ่มวัวใหม่เข้าระบบ', time: 'วันนี้ 09:15', icon: 'mdi-cow' }
])

const actions = ref([
  { label: 'เพิ่มวัว', icon: 'mdi-plus-box' },
  { label: 'บันทึกน้ำนม', icon: 'mdi-cup-water' },
  { label: 'รายงาน', icon: 'mdi-file-chart' },
  { label: 'ตั้งค่า', icon: 'mdi-cog' },
  { label: 'วัคซีน', icon: 'mdi-needle' },
  { label: 'ต้นทุน', icon: 'mdi-cash' }
])
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;600;700&display=swap');

.dashboard-container {
  font-family: 'Kanit', sans-serif;
  background-color: #f6faf6;
  min-height: 100vh;
}

.color-farm {
  color: #1b5e20;
}

.stat-card {
  border-radius: 20px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
}

.v-card {
  background-color: #ffffff;
}
</style>
