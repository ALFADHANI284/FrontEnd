import { Api } from './generated'

export const api = new Api({
  baseUrl: 'https://api.fundivest.xyz/api/v1',
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