/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import {
  EmailPasswordLoginRequest,
  MeResponse,
  RegisterConfirmationRequest,
  UpdatePasswordRequest,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Auth<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags auth-controller
   * @name RegisterConfirmation
   * @request PUT:/api/v1/public/auth/register/confirm
   */
  registerConfirmation = (
    data: RegisterConfirmationRequest,
    params: RequestParams = {}
  ) =>
    this.request<void, any>({
      path: `/api/v1/public/auth/register/confirm`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags auth-controller
   * @name ChangePassword
   * @request PUT:/api/v1/public/auth/password/change
   */
  changePassword = (data: UpdatePasswordRequest, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/public/auth/password/change`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags auth-controller
   * @name Register
   * @request POST:/api/v1/public/auth/register
   */
  register = (data: EmailPasswordLoginRequest, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/public/auth/register`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags auth-controller
   * @name Logoff
   * @request POST:/api/v1/public/auth/logoff
   */
  logoff = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/public/auth/logoff`,
      method: "POST",
      ...params,
    });
  /**
   * No description
   *
   * @tags auth-controller
   * @name Login
   * @request POST:/api/v1/public/auth/login
   */
  login = (data: EmailPasswordLoginRequest, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/public/auth/login`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags auth-controller
   * @name GetMe
   * @request GET:/api/v1/public/auth/me
   */
  getMe = (params: RequestParams = {}) =>
    this.request<MeResponse, any>({
      path: `/api/v1/public/auth/me`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags auth-controller
   * @name SendEmailConfirmation
   * @request GET:/api/v1/public/auth/login/magic/send-email
   */
  sendEmailConfirmation = (
    query: {
      email: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<void, any>({
      path: `/api/v1/public/auth/login/magic/send-email`,
      method: "GET",
      query: query,
      ...params,
    });
}
