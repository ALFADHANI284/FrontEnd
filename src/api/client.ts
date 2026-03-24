import { Api } from './generated'

export const api = new Api({
  baseUrl: 'http://localhost:8080/api/v1',
})

export type {
  HandlerCreateSessionRequest,
  HandlerCreateSessionResponse,
  HandlerCompleteChapterResponse,
  HandlerRequestCertificateResponse,
  HandlerCertificateStatusResponse,
  HandlerVerifyCertificateResponse,
  HandlerErrorResponse,
} from './generated'