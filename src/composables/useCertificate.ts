import { ref } from 'vue'
import { api } from '../api/client'

const SSE_BASE = 'https://api.fundivest.xyz/api/v1'

export function useCertificate() {
  const certId = ref<string | null>(null)
  const status = ref<'processing' | 'done' | 'failed' | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  let eventSource: EventSource | null = null

  async function generateCertificate(sessionId: string): Promise<string> {
    loading.value = true
    error.value = null
    try {
      const res = await api.sessions.certificateCreate(sessionId)
      const id = res.data.data?.certificate_id
      if (!id) throw new Error('certificate_id tidak ada di response')

      certId.value = id
      status.value = 'processing'
      startSSE(id)
      return id
    } catch (e) {
      error.value = (e as Error).message
      throw e
    } finally {
      loading.value = false
    }
  }

  function startSSE(id: string): void {
    stopSSE()

    eventSource = new EventSource(`${SSE_BASE}/certificates/${id}/stream`)

    eventSource.addEventListener('status', (event) => {
      console.log('SSE status:', event.data)
      const s = event.data.trim() as typeof status.value
      status.value = s
    
      if (s === 'done' || s === 'failed') stopSSE()
    })

    eventSource.onerror = () => {
      error.value = 'Koneksi SSE terputus'
      stopSSE()
    }
  }

  function stopSSE(): void {
    if (eventSource !== null) {
      eventSource.close()
      eventSource = null
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

  return { certId, status, loading, error, generateCertificate, stopSSE, download }
}