/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { config } from "@/config/env-config";
import { getToken } from "./get-token";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export interface FetchResponse {
  success: boolean;
  message?: string;
  data?: any;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPage: number;
  };
  error?: string | null;
}

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface FetchOptions {
  method?: HttpMethod;
  body?: any;
  tags?: string[];
  token?: string;
  headers?: Record<string, string>;
  cache?: RequestCache;
}

export const myFetch = async (
  url: string,
  {
    method = "GET",
    body,
    tags,
    token,
    headers = {},
    cache = "force-cache",
  }: FetchOptions = {}
): Promise<FetchResponse> => {
  const accessToken = token || (await getToken());

  const isFormData = body instanceof FormData;
  const hasBody = body !== undefined && method !== "GET";

  const reqHeaders: Record<string, string> = {
    Accept: "application/json",
    ...headers,
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  };

  let shouldRedirect = false;
  let isOk = false;
  let status = 200;
  let resData: any = null;

  try {
    const response = await fetch(`${config.baseURL}${url}`, {
      method,
      headers: reqHeaders,
      ...(hasBody && { body: isFormData ? body : JSON.stringify(body) }),
      ...(tags && { next: { tags } }),
      ...(!(method === "GET") ? { cache: "no-store" } : { cache: cache }),
    });

    status = response.status;
    isOk = response.ok;
    resData = await response.json();

    if (!isOk) {
      if (status === 401 && resData?.message === "Access Token has expired") {
        shouldRedirect = true;
        try {
          const cookieStore = await cookies();
          cookieStore.delete("accessToken");
          cookieStore.delete("user");
        } catch (cookieError) {
          console.error("Failed to delete cookies on server:", cookieError);
        }
      }
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      message: "Network error",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }

  if (shouldRedirect) {
    redirect("/login");
  }

  if (isOk) {
    return {
      success: resData?.success ?? true,
      message: resData?.message,
      data: resData?.data,
      pagination: resData?.pagination,
      error: null,
    };
  }

  return {
    success: false,
    message: resData?.message,
    data: null,
    error: resData?.errorMessages || "Request failed",
  };
};
