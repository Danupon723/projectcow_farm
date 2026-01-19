<template>
  <div class="flex min-h-screen font-prompt bg-gray-100">

    <!-- Sidebar -->
    <aside
      class="bg-emerald-900 text-white w-64 flex-shrink-0 hidden md:flex flex-col transition-all duration-300"
    >
      <div class="p-6 flex items-center space-x-3">
        <div class="bg-white p-1 rounded-full">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2395/2395796.png"
            class="w-8 h-8"
            alt="Logo"
          />
        </div>
        <span class="text-xl font-bold">ฟาร์มสุขใจ</span>
      </div>

      <nav class="flex-1 px-4 space-y-2">
        <a
          href="#"
          class="flex items-center space-x-3 p-3 bg-yellow-500 text-emerald-900 rounded-lg font-semibold"
        >
          <i class="mdi mdi-view-dashboard text-xl"></i>
          <span>แดชบอร์ด</span>
        </a>

        <a
          href="#"
          class="flex items-center space-x-3 p-3 hover:bg-emerald-800 rounded-lg transition"
        >
          <i class="mdi mdi-cow text-xl"></i>
          <span>คอกวัว</span>
        </a>

        <a
          href="#"
          class="flex items-center space-x-3 p-3 hover:bg-emerald-800 rounded-lg transition"
        >
          <i class="mdi mdi-water text-xl"></i>
          <span>คลังน้ำนม</span>
        </a>

        <a
          href="#"
          class="flex items-center space-x-3 p-3 hover:bg-emerald-800 rounded-lg transition"
        >
          <i class="mdi mdi-medical-bag text-xl"></i>
          <span>สุขภาพ</span>
        </a>

        <a
          href="#"
          class="flex items-center space-x-3 p-3 hover:bg-emerald-800 rounded-lg transition"
        >
          <i class="mdi mdi-cog text-xl"></i>
          <span>ตั้งค่า</span>
        </a>
      </nav>

      <div class="p-4">
        <button
          @click="logout"
          class="w-full flex items-center justify-center space-x-2 bg-red-500 hover:bg-red-600 p-3 rounded-full transition font-semibold"
        >
          <i class="mdi mdi-logout"></i>
          <span>ออกจากระบบ</span>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col min-w-0">

      <!-- Header -->
      <header class="bg-white shadow-sm p-4 flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <button class="md:hidden text-2xl">
            <i class="mdi mdi-menu"></i>
          </button>
          <h1 class="text-xl font-bold text-emerald-900">
            ภาพรวมฟาร์มวัวนมวันนี้
          </h1>
        </div>

        <div class="flex items-center space-x-4">
          <div
            class="bg-emerald-100 text-emerald-800 px-4 py-1.5 rounded-full flex items-center text-sm font-semibold"
          >
            <i class="mdi mdi-calendar mr-2"></i>
            <span>{{ todayDate }}</span>
          </div>

          <div
            class="w-10 h-10 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center text-emerald-600"
          >
            <i class="mdi mdi-account text-xl"></i>
          </div>
        </div>
      </header>

      <!-- Body -->
      <div class="p-6 space-y-6 overflow-y-auto">

        <!-- Chart -->
        <div class="bg-white rounded-3xl shadow-lg p-6 relative">
          <div class="bg-emerald-600 rounded-2xl p-4 -mt-12 mb-4 shadow-xl">
            <canvas ref="chartCanvas" height="100"></canvas>
          </div>

          <div class="mt-4">
            <h2 class="text-xl font-bold text-emerald-900">
              ปริมาณน้ำนมสะสม 7 วันล่าสุด
            </h2>
            <p class="text-sm text-gray-500">หน่วย: ลิตรต่อวัน</p>
            <hr class="my-4" />
            <div class="flex items-center text-green-600 font-semibold">
              <i class="mdi mdi-trending-up mr-2"></i>
              <span>สัปดาห์นี้ทำยอดได้ดีขึ้น 5.2%</span>
            </div>
          </div>
        </div>

        <!-- Summary Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="(stat, i) in stats"
            :key="i"
            class="bg-white p-5 rounded-3xl shadow-md transition transform hover:-translate-y-1 hover:shadow-xl flex justify-between items-center"
          >
            <div>
              <p class="text-xs font-bold text-gray-400 uppercase">
                {{ stat.title }}
              </p>
              <h3 class="text-3xl font-bold text-emerald-900">
                {{ stat.value }}
              </h3>
              <p class="text-xs text-gray-500">
                {{ stat.unit }}
              </p>
            </div>

            <div
              class="p-3 rounded-2xl"
              :class="stat.bg"
            >
              <i :class="stat.icon + ' text-3xl'"></i>
            </div>
          </div>
        </div>

        <!-- Activity + Quick Actions -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">

          <!-- Activities -->
          <div class="lg:col-span-7 bg-white rounded-3xl shadow-md flex flex-col">
            <div class="p-5 border-b flex items-center font-bold text-emerald-900">
              <i class="mdi mdi-history mr-2 text-xl"></i>
              กิจกรรมล่าสุด
            </div>

            <div class="p-2 overflow-y-auto max-h-80">
              <div
                v-for="(log, i) in activities"
                :key="i"
                class="flex items-center p-3 hover:bg-gray-50 rounded-xl"
              >
                <div
                  class="p-2 rounded-lg mr-4"
                  :class="log.bg"
                >
                  <i :class="log.icon"></i>
                </div>

                <div>
                  <p class="font-semibold text-sm">
                    {{ log.title }}
                  </p>
                  <p class="text-xs text-gray-400">
                    {{ log.time }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="lg:col-span-5 bg-white rounded-3xl shadow-md">
            <div class="p-5 border-b font-bold text-emerald-900">
              <i class="mdi mdi-flash mr-2"></i>
              จัดการด่วน
            </div>

            <div class="p-6 grid grid-cols-2 gap-4">
              <button
                v-for="(btn, i) in quickActions"
                :key="i"
                class="flex flex-col items-center justify-center p-6 bg-emerald-50 text-emerald-700 rounded-2xl hover:bg-emerald-100 transition border border-emerald-100"
              >
                <i :class="btn.icon + ' text-3xl mb-1'"></i>
                <span class="text-xs font-bold">
                  {{ btn.label }}
                </span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend } from 'chart.js'

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
)

const router = useRouter()
const chartCanvas = ref(null)

// วันที่
const todayDate = new Date().toLocaleDateString('th-TH', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

// Logout
const logout = () => {
  localStorage.removeItem('token')
  router.push('/')
}

// Chart
onMounted(() => {
  new Chart(chartCanvas.value, {
    type: 'line',
    data: {
      labels: ['จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.', 'อา.'],
      datasets: [
        {
          label: 'ปริมาณน้ำนม (ลิตร)',
          data: [450, 480, 420, 510, 590, 580, 620],
          borderColor: 'white',
          backgroundColor: 'rgba(255,255,255,0.2)',
          tension: 0.4,
          fill: true,
          pointBackgroundColor: 'white',
          borderWidth: 3,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: 'rgba(255,255,255,0.8)' },
        },
        y: {
          grid: { color: 'rgba(255,255,255,0.2)' },
          ticks: { color: 'rgba(255,255,255,0.8)' },
        },
      },
    },
  })
})

// Data
const stats = ref([
  { title: 'จำนวนวัว', value: 48, unit: 'ตัว', icon: 'mdi mdi-cow', bg: 'bg-blue-100 text-blue-600' },
  { title: 'น้ำนมวันนี้', value: 320, unit: 'ลิตร', icon: 'mdi mdi-pail', bg: 'bg-cyan-100 text-cyan-600' },
  { title: 'สุขภาพดี', value: 45, unit: 'ตัว', icon: 'mdi mdi-heart-check', bg: 'bg-green-100 text-green-600' },
  { title: 'แจ้งเตือน', value: 3, unit: 'รายการ', icon: 'mdi mdi-alert-circle', bg: 'bg-red-100 text-red-600' },
])

const activities = ref([
  { title: 'บันทึกน้ำนมวัว #12', time: '10 นาทีที่แล้ว', icon: 'mdi mdi-water', bg: 'bg-blue-100 text-blue-600' },
  { title: 'ตรวจสุขภาพวัว #05', time: '1 ชั่วโมงที่แล้ว', icon: 'mdi mdi-heart-pulse', bg: 'bg-red-100 text-red-600' },
  { title: 'ทำความสะอาดคอก B', time: 'วันนี้ 08:30 น.', icon: 'mdi mdi-sparkles', bg: 'bg-amber-100 text-amber-600' },
])

const quickActions = ref([
  { label: 'เพิ่มวัว', icon: 'mdi mdi-plus-box' },
  { label: 'ลงบันทึกนม', icon: 'mdi mdi-water-plus' },
  { label: 'นัดหมอ', icon: 'mdi mdi-calendar-check' },
  { label: 'ดูรายงาน', icon: 'mdi mdi-file-chart' },
])
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Prompt:wght@400;600&display=swap');

.font-prompt {
  font-family: 'Prompt', sans-serif;
}
</style>
