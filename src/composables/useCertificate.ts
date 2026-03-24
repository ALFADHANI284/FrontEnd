import { ref } from 'vue'
import { api } from '../api/client'

const POLL_INTERVAL_MS = 3000
const POLL_MAX_ATTEMPTS = 20

export function useCertificate() {
  const certId = ref<string | null>(null)
  const status = ref<'pending' | 'done' | 'failed' | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  let pollTimer: ReturnType<typeof setInterval> | null = null
  let pollAttempts = 0

  async function generateCertificate(sessionId: string): Promise<string> {
    loading.value = true
    error.value = null
    try {
      const res = await api.sessions.certificateCreate(sessionId)
      const id = res.data.data?.certificate_id
      if (!id) throw new Error('certificate_id tidak ada di response')

      certId.value = id
      status.value = 'pending'
      startPolling()
      return id
    } catch (e) {
      error.value = (e as Error).message
      throw e
    } finally {
      loading.value = false
    }
  }

  function startPolling(): void {
    stopPolling()
    pollAttempts = 0

    pollTimer = setInterval(async () => {
      pollAttempts++
      try {
        const res = await api.certificates.statusList(certId.value!)
        const s = res.data.data?.status as typeof status.value
        status.value = s ?? null

        if (s !== 'pending') stopPolling()

        if (pollAttempts >= POLL_MAX_ATTEMPTS) {
          stopPolling()
          error.value = 'Polling timeout — coba refresh halaman.'
        }
      } catch (e) {
        stopPolling()
        error.value = (e as Error).message
      }
    }, POLL_INTERVAL_MS)
  }

  function stopPolling(): void {
    if (pollTimer !== null) {
      clearInterval(pollTimer)
      pollTimer = null
    }
  }

  async function download(id?: string): Promise<void> {
    const target = id ?? certId.value
    if (!target) throw new Error('No certificate')
    loading.value = true
    error.value = null
    try {
      const res = await api.certificates.downloadList(target, {
        format: 'blob',
      })
      triggerBlobDownload(res.data as unknown as Blob, `certificate-${target}.pdf`)
    } catch (e) {
      error.value = (e as Error).message
      throw e
    } finally {
      loading.value = false
    }
  }

  function triggerBlobDownload(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  return { certId, status, loading, error, generateCertificate, stopPolling, download }
}