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

import { FileUploadResponse } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Upload<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags document-controller
   * @name UploadFile
   * @request POST:/api/v1/file/upload
   */
  uploadFile = (
    data: {
      /** @format binary */
      file: File;
    },
    params: RequestParams = {}
  ) =>
    this.request<FileUploadResponse, any>({
      path: `/api/v1/file/upload`,
      method: "POST",
      body: data,
      type: ContentType.FormData,
      ...params,
    });
}
