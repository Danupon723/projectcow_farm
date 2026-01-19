<template>
  <v-app>
    <!-- Top App Bar -->
    <v-app-bar elevation="6" height="72" class="farm-appbar">
      <v-app-bar-nav-icon @click="drawer = !drawer" />

      <v-toolbar-title class="font-weight-bold text-h5">
        🐄 Green Dairy Farm
      </v-toolbar-title>

      <v-spacer />

      <!-- User Info -->
      <div class="d-flex align-center mr-4">
        <v-avatar color="green-lighten-4" size="36" class="mr-2">
          <v-icon color="green-darken-2">mdi-account</v-icon>
        </v-avatar>
        <span class="font-weight-medium">ผู้ดูแลฟาร์ม</span>
      </div>

      <!-- Logout Button -->
      <v-btn
        color="red-darken-2"
        variant="flat"
        prepend-icon="mdi-logout"
        @click="logout"
      >
        ออกจากระบบ
      </v-btn>
    </v-app-bar>

    <!-- Navigation Drawer -->
    <v-navigation-drawer
      v-model="drawer"
      permanent
      class="farm-drawer"
      width="280"
    >
      <div class="drawer-header pa-6 text-center">
        <v-avatar size="80" color="green-lighten-4" class="mb-3">
          <v-icon size="48" color="green-darken-3">mdi-cow</v-icon>
        </v-avatar>
        <h3 class="font-weight-bold">ระบบจัดการฟาร์ม</h3>
        <p class="text-body-2 opacity-80">Dairy Management Panel</p>
      </div>

      <v-divider />

      <v-list nav density="comfortable">
        <v-list-item
          prepend-icon="mdi-view-dashboard"
          title="แดชบอร์ด"
          @click="go('/admin/dashbord')"
        />

        <v-list-item
          prepend-icon="mdi-cow"
          title="จัดการโค"
          @click="go('/admin/cows')"
        />

        <v-list-item
          prepend-icon="mdi-bottle-tonic-plus"
          title="บันทึกน้ำนม"
          @click="go('/admin/milk')"
        />

        <v-list-item
          prepend-icon="mdi-needle"
          title="วัคซีน & สุขภาพ"
          @click="go('/admin/health')"
        />

        <v-list-item
          prepend-icon="mdi-chart-line"
          title="รายงาน & สถิติ"
          @click="go('/admin/report')"
        />

        <v-divider class="my-4" />

        <v-list-item
          prepend-icon="mdi-cog"
          title="ตั้งค่า"
          @click="go('/admin/settings')"
        />
      </v-list>
    </v-navigation-drawer>

    <!-- Main Content -->
    <v-main class="farm-main">
      <v-container fluid class="pa-8">
        <!-- หน้า Dashboard และหน้าอื่น ๆ จะมาแสดงตรงนี้ -->
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const drawer = ref(true)
const router = useRouter()

const go = (path) => {
  router.push(path)
}

const logout = () => {
  localStorage.removeItem('token')
  router.push('/')
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;600;700&display=swap');

* {
  font-family: 'Kanit', sans-serif;
}

/* Top Bar */
.farm-appbar {
  background: linear-gradient(90deg, #1b5e20, #4caf50);
  color: white;
}

/* Drawer */
.farm-drawer {
  background: linear-gradient(180deg, #e8f5e9, #c8e6c9);
}

/* Drawer Header */
.drawer-header h3 {
  color: #1b5e20;
}

/* Main Background */
.farm-main {
  background-color: #f1f8f4;
  min-height: 100vh;
}
</style>
