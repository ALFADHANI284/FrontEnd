/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface HandlerCertificateStatusResponse {
  /** @example "550e8400-e29b-41d4-a716-446655440000" */
  certificate_id?: string;
  /** @example "done" */
  status?: string;
}

export interface HandlerCompleteChapterResponse {
  /** @example 1 */
  chapter?: number;
  /** @example true */
  completed?: boolean;
  /** @example false */
  completed_all?: boolean;
}

export interface HandlerCreateSessionRequest {
  /** @example "golang-basics" */
  course_id: string;
  /**
   * @minLength 2
   * @maxLength 100
   * @example "John Doe"
   */
  name: string;
}

export interface HandlerCreateSessionResponse {
  /** @example "550e8400-e29b-41d4-a716-446655440000" */
  session_id?: string;
}

export interface HandlerErrorResponse {
  /** @example "error message" */
  error?: string;
  /** @example false */
  success?: boolean;
}

export interface HandlerRequestCertificateResponse {
  /** @example "550e8400-e29b-41d4-a716-446655440000" */
  certificate_id?: string;
  /** @example "pending" */
  status?: string;
}

export interface HandlerSuccessResponse {
  data?: any;
  /** @example true */
  success?: boolean;
}

export interface HandlerVerifyCertificateResponse {
  /** @example "golang-basics" */
  course_id?: string;
  /** @example "550e8400-e29b-41d4-a716-446655440000" */
  id?: string;
  /** @example "2024-01-15T10:30:00Z" */
  issued_at?: string;
  /** @example "John Doe" */
  name?: string;
  /** @example "done" */
  status?: string;
  /** @example true */
  verified?: boolean;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "//localhost:8080/api/v1";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.JsonApi]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) => {
      if (input instanceof FormData) {
        return input;
      }

      return Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData());
    },
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const responseToParse = responseFormat ? response.clone() : response;
      const data = !responseFormat
        ? r
        : await responseToParse[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title fundivest REST API
 * @version 1.0
 * @baseUrl //localhost:8080/api/v1
 * @contact
 *
 * Manajemen Sesi & Sertifikat untuk fundivest
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  certificates = {
    /**
     * @description Unduh sertifikat yang sudah dibuat
     *
     * @tags sertifikat
     * @name DownloadList
     * @summary Unduh sertifikat
     * @request GET:/certificates/{certificate_id}/download
     */
    downloadList: (certificateId: string, params: RequestParams = {}) =>
      this.request<Blob, HandlerErrorResponse>({
        path: `/certificates/${certificateId}/download`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Cek status proses pembuatan sertifikat
     *
     * @tags sertifikat
     * @name StatusList
     * @summary Cek status sertifikat
     * @request GET:/certificates/{certificate_id}/status
     */
    statusList: (certificateId: string, params: RequestParams = {}) =>
      this.request<
        HandlerSuccessResponse & {
          data?: HandlerCertificateStatusResponse;
        },
        HandlerErrorResponse
      >({
        path: `/certificates/${certificateId}/status`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Validasi keasilan sertifikat
     *
     * @tags sertifikat
     * @name VerifyList
     * @summary Verifikasi sertifikat
     * @request GET:/certificates/{certificate_id}/verify
     */
    verifyList: (certificateId: string, params: RequestParams = {}) =>
      this.request<
        HandlerSuccessResponse & {
          data?: HandlerVerifyCertificateResponse;
        },
        HandlerErrorResponse
      >({
        path: `/certificates/${certificateId}/verify`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  sessions = {
    /**
     * @description Buat sesi permainan baru bagi pengguna
     *
     * @tags sesi
     * @name SessionsCreate
     * @summary Buat sesi baru
     * @request POST:/sessions
     */
    sessionsCreate: (
      request: HandlerCreateSessionRequest,
      params: RequestParams = {},
    ) =>
      this.request<
        HandlerSuccessResponse & {
          data?: HandlerCreateSessionResponse;
        },
        HandlerErrorResponse
      >({
        path: `/sessions`,
        method: "POST",
        body: request,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Request pembuatan sertifikat setelah semua chapter sudah selesai
     *
     * @tags sertifikat
     * @name CertificateCreate
     * @summary Request sertifikat
     * @request POST:/sessions/{id}/certificate
     */
    certificateCreate: (id: string, params: RequestParams = {}) =>
      this.request<
        HandlerSuccessResponse & {
          data?: HandlerRequestCertificateResponse;
        },
        HandlerErrorResponse
      >({
        path: `/sessions/${id}/certificate`,
        method: "POST",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Tandai chapter sebagai selesai. Misal chapter 1 sudah selesai—maka tandai sebagai selesai.
     *
     * @tags sesi
     * @name ChaptersCompleteCreate
     * @summary Selesaikan chapter
     * @request POST:/sessions/{id}/chapters/{chapter}/complete
     */
    chaptersCompleteCreate: (
      id: string,
      chapter: number,
      params: RequestParams = {},
    ) =>
      this.request<
        HandlerSuccessResponse & {
          data?: HandlerCompleteChapterResponse;
        },
        HandlerErrorResponse
      >({
        path: `/sessions/${id}/chapters/${chapter}/complete`,
        method: "POST",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}