import { ref } from 'vue'
import { api } from '../api/client'
import type { HandlerCreateSessionRequest } from '../api/client'

// const SESSION_KEY = 'game_session_id'
const TOTAL_CHAPTERS = 3

export function useSession() {
  const sessionId = ref<string | null>()
  const completedChapters = ref<number[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function initSession(payload: HandlerCreateSessionRequest): Promise<string> {
    if (sessionId.value) return sessionId.value

    loading.value = true
    error.value = null
    try {
      const res = await api.sessions.sessionsCreate(payload)
      const id = res.data.data?.session_id
      if (!id) throw new Error('session_id tidak ada di response')

      sessionId.value = id
      // localStorage.setItem(SESSION_KEY, id)
      return id
    } catch (e) {
      error.value = (e as Error).message
      throw e
    } finally {
      loading.value = false
    }
  }

  async function finishChapter(chapter: number): Promise<void> {
    if (!sessionId.value) throw new Error('No active session')
    if (completedChapters.value.includes(chapter)) return

    loading.value = true
    error.value = null
    try {
      await api.sessions.chaptersCompleteCreate(sessionId.value, chapter)
      completedChapters.value.push(chapter)
    } catch (e) {
      error.value = (e as Error).message
      throw e
    } finally {
      loading.value = false
    }
  }

  function clearSession(): void {
    sessionId.value = null
    completedChapters.value = []
    // localStorage.removeItem(SESSION_KEY)
  }

  const isAllChaptersComplete = (): boolean =>
    completedChapters.value.length >= TOTAL_CHAPTERS

  return {
    sessionId,
    completedChapters,
    loading,
    error,
    initSession,
    finishChapter,
    clearSession,
    isAllChaptersComplete,
  }
}