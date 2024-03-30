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

import { NoteCreateRequest, NoteResponse, NoteUpdateRequest } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Note<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags note
   * @name Update
   * @request PUT:/api/v1/user/note
   */
  update = (data: NoteUpdateRequest, params: RequestParams = {}) =>
    this.request<NoteResponse, any>({
      path: `/api/v1/user/note`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags note
   * @name Create
   * @request POST:/api/v1/user/note
   */
  create = (data: NoteCreateRequest, params: RequestParams = {}) =>
    this.request<NoteResponse, any>({
      path: `/api/v1/user/note`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags note
   * @name FindAllNotesWithSharedAccess
   * @request GET:/api/v1/user/note/shared
   */
  findAllNotesWithSharedAccess = (params: RequestParams = {}) =>
    this.request<NoteResponse[], any>({
      path: `/api/v1/user/note/shared`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags note
   * @name FindAllNotesWithOwnerAccess
   * @request GET:/api/v1/user/note/owner
   */
  findAllNotesWithOwnerAccess = (params: RequestParams = {}) =>
    this.request<NoteResponse[], any>({
      path: `/api/v1/user/note/owner`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags note
   * @name Delete
   * @request DELETE:/api/v1/user/note/{id}
   */
  delete = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/user/note/${id}`,
      method: "DELETE",
      ...params,
    });
}
