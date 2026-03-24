import { ref } from 'vue'
import { api } from '../api/client'
import type { HandlerVerifyCertificateResponse } from '../api/client'

export function useVerify() {
  const certificate = ref<HandlerVerifyCertificateResponse | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const notFound = ref(false)

  async function verify(certId: string): Promise<void> {
    loading.value = true
    error.value = null
    notFound.value = false
    certificate.value = null

    try {
      const res = await api.certificates.verifyList(certId)
      certificate.value = res.data.data ?? null
    } catch (e: any) {
      // generated client throws HttpResponse saat !response.ok
      const httpStatus = e?.status ?? e?.error?.status
      if (httpStatus === 404) {
        notFound.value = true
      } else {
        error.value = e?.error?.error ?? (e as Error).message
      }
    } finally {
      loading.value = false
    }
  }

  return { certificate, loading, error, notFound, verify }
}