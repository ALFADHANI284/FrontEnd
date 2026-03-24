<template>
  <div>
    <div v-if="loading">Memverifikasi sertifikat...</div>
    <div v-else-if="notFound">❌ Sertifikat tidak ditemukan.</div>
    <div v-else-if="error">⚠️ {{ error }}</div>
    <CertificateReceipt
      v-else-if="certificate"
      :certificate="certificate"
      :cert-id="certificate.id!"
      @close="$router.push('/')"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useVerify } from '../composables/useVerify'
import CertificateReceipt from '../components/CertificateReceipt.vue'

const route = useRoute()
const { certificate, loading, error, notFound, verify } = useVerify()

onMounted(() => {
  verify(route.params.certId as string)
})
</script>