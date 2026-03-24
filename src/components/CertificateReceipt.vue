<template>
  <div class="receipt-overlay" @click.self="$emit('close')">
    <div class="receipt">
      <div class="receipt-header">
        <div class="logo-text">FUNDIVEST</div>
        <div class="divider-dashed" />
        <div class="receipt-title">STRUK SERTIFIKAT PENYELESAIAN</div>
        <div class="divider-dashed" />
      </div>

      <table class="receipt-table">
        <tbody>
            <tr>
              <td class="label">NAMA</td>
              <td class="value">{{ certificate.name }}</td>
            </tr>
            <tr>
              <td class="label">KURSUS</td>
              <td class="value">{{ certificate.course_id }}</td>
            </tr>
            <tr>
              <td class="label">TANGGAL</td>
              <td class="value">{{ formattedDate }}</td>
            </tr>
            <tr>
              <td class="label">STATUS</td>
              <td class="value verified">&#10003; TERVERIFIKASI</td>
            </tr>
        </tbody>
      </table>

      <div class="divider-dashed" />

      <div class="cert-id-section">
        <div class="label">ID SERTIFIKAT</div>
        <div class="cert-id">{{ certificate.id }}</div>
      </div>

      <div class="qr-section">
        <canvas ref="qrCanvas" class="qr-canvas" />
        <div class="qr-hint">Scan untuk verifikasi</div>
      </div>

      <div class="divider-dashed" />

      <div class="receipt-footer">
        <div class="verify-url">{{ verifyUrl }}</div>
      </div>

      <div class="divider-dashed" />

      <div class="actions">
        <button class="btn-receipt" @click="handleDownload" :disabled="downloading">
          {{ downloading ? 'MENGUNDUH...' : 'UNDUH PDF' }}
        </button>
        <button class="btn-receipt btn-close" @click="$emit('close')">TUTUP</button>
      </div>

      <div class="receipt-tear" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useCertificate } from '../composables/useCertificate'
const { download, loading: downloading } = useCertificate()
import type { HandlerVerifyCertificateResponse } from '../api/client'

const props = defineProps<{
  certificate: HandlerVerifyCertificateResponse
  certId: string
}>()

defineEmits<{
  close: []
}>()

const qrCanvas = ref<HTMLCanvasElement | null>(null)

const verifyUrl = computed(() =>
  `${window.location.origin}/verify/${props.certificate.id}`
)

const formattedDate = computed(() => {
  if (!props.certificate.issued_at) return '-'
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(props.certificate.issued_at))
})

async function handleDownload() {
  await download(props.certId)
}

onMounted(async () => {
  if (!qrCanvas.value) return
  const QRCode = (await import('qrcode')).default
  QRCode.toCanvas(qrCanvas.value, verifyUrl.value, {
    width: 120,
    margin: 1,
    color: { dark: '#000000', light: '#ffffff' },
  })
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');

@keyframes print-out {
  from {
    opacity: 0;
    transform: translateY(-100px) scaleY(0.30);
    transform-origin: top;
  }
  to {
    opacity: 1;
    transform: translateY(0) scaleY(1);
  }
}

@keyframes fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.receipt-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 1rem;
  animation: fade 0.7s ease-out;
}

.receipt {
  font-family: 'Share Tech Mono', 'Courier New', monospace;
  background: #fff;
  color: #111;
  width: 100%;
  max-width: 340px;
  padding: 1.5rem 1.5rem 0;
  position: relative;
  box-shadow: 0 8px 32px rgba(0,0,0,0.25);
  animation: print-out 0.4s ease-out;
}

.receipt-header {
  text-align: center;
  margin-bottom: 0.75rem;
}

.logo-text {
  font-size: 22px;
  font-weight: bold;
  letter-spacing: 6px;
  margin-bottom: 8px;
}

.receipt-title {
  font-size: 11px;
  letter-spacing: 2px;
  margin: 6px 0;
}

.divider-dashed {
  border-top: 1.5px dashed #999;
  margin: 10px 0;
}

.receipt-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
  margin: 0.5rem 0;
}

.receipt-table td {
  padding: 4px 0;
  vertical-align: top;
}

.receipt-table .label {
  color: #666;
  width: 80px;
  font-size: 11px;
  letter-spacing: 1px;
}

.receipt-table .value {
  font-size: 12px;
  word-break: break-word;
}

.receipt-table .verified {
  color: #111;
  font-weight: bold;
}

.cert-id-section {
  margin: 0.5rem 0;
}

.cert-id-section .label {
  font-size: 10px;
  letter-spacing: 1px;
  color: #666;
  margin-bottom: 4px;
}

.cert-id {
  font-size: 10px;
  word-break: break-all;
  letter-spacing: 0.5px;
}

.qr-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0.75rem 0;
  gap: 4px;
}

.qr-canvas {
  width: 120px !important;
  height: 120px !important;
}

.qr-hint {
  font-size: 10px;
  color: #666;
  letter-spacing: 1px;
}

.receipt-footer {
  text-align: center;
  margin: 0.25rem 0;
}

.verify-url {
  font-size: 10px;
  color: #666;
  word-break: break-all;
  letter-spacing: 0.5px;
}

.actions {
  display: flex;
  gap: 8px;
  margin: 1rem 0;
}

.btn-receipt {
  flex: 1;
  font-family: inherit;
  font-size: 11px;
  letter-spacing: 2px;
  padding: 10px 0;
  border: 1.5px solid #111;
  background: #111;
  color: #fff;
  cursor: pointer;
}

.btn-receipt:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-close {
  background: #fff;
  color: #111;
}

.btn-close:hover {
  background: #f0f0f0;
}

.receipt-tear {
  height: 12px;
  background:
    radial-gradient(circle at 6px 0, #0000 6px, #fff 0) left,
    radial-gradient(circle at -2px 0, #0000 6px, #fff 0) right;
  background-size: 12px 12px;
  background-repeat: repeat-x;
  margin: 0 -1.5rem;
}
</style>