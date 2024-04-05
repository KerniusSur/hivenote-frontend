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
  PasswordUpdateRequest,
  UpdateAccountInfoRequest,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Account<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags account-user-controller
   * @name UpdateAccountInfo
   * @request PUT:/api/v1/user/account
   */
  updateAccountInfo = (
    data: UpdateAccountInfoRequest,
    params: RequestParams = {}
  ) =>
    this.request<void, any>({
      path: `/api/v1/user/account`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags account-user-controller
   * @name UpdatePassword
   * @request PUT:/api/v1/user/account/password
   */
  updatePassword = (data: PasswordUpdateRequest, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/user/account/password`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      ...params,
    });
}
