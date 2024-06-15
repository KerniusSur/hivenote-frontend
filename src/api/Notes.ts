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
  NoteAccessResponse,
  NoteCreateRequest,
  NoteResponse,
  NoteShareRequest,
  NoteUpdateRequest,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Notes<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags note
   * @name Update
   * @request PUT:/api/v1/user/notes
   */
  update = (data: NoteUpdateRequest, params: RequestParams = {}) =>
    this.request<NoteResponse, any>({
      path: `/api/v1/user/notes`,
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
   * @request POST:/api/v1/user/notes
   */
  create = (data: NoteCreateRequest, params: RequestParams = {}) =>
    this.request<NoteResponse, any>({
      path: `/api/v1/user/notes`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags note-access-controller
   * @name ShareNote
   * @request PUT:/api/v1/user/notes/access/share
   */
  shareNote = (data: NoteShareRequest, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/user/notes/access/share`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags note
   * @name FindById
   * @request GET:/api/v1/user/notes/{id}
   */
  findById = (id: string, params: RequestParams = {}) =>
    this.request<NoteResponse, any>({
      path: `/api/v1/user/notes/${id}`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags note
   * @name Delete
   * @request DELETE:/api/v1/user/notes/{id}
   */
  delete = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/user/notes/${id}`,
      method: "DELETE",
      ...params,
    });
  /**
   * No description
   *
   * @tags note
   * @name FindAllRootNotesWithSharedAccess
   * @request GET:/api/v1/user/notes/shared
   */
  findAllRootNotesWithSharedAccess = (params: RequestParams = {}) =>
    this.request<NoteResponse[], any>({
      path: `/api/v1/user/notes/shared`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags note
   * @name FindAllRootNotesWithOwnerAccess
   * @request GET:/api/v1/user/notes/owner
   */
  findAllRootNotesWithOwnerAccess = (params: RequestParams = {}) =>
    this.request<NoteResponse[], any>({
      path: `/api/v1/user/notes/owner`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags note
   * @name FindAllFilteredBy
   * @request GET:/api/v1/user/notes/filter
   */
  findAllFilteredBy = (
    query?: {
      accessType?: "OWNER" | "EDITOR" | "VIEWER";
      accessType2?: "OWNER" | "EDITOR" | "VIEWER";
      searchString?: string;
      isArchived?: boolean;
      isDeleted?: boolean;
    },
    params: RequestParams = {}
  ) =>
    this.request<NoteResponse[], any>({
      path: `/api/v1/user/notes/filter`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags note-access-controller
   * @name FindNoteCollaborators
   * @request GET:/api/v1/user/notes/access/{id}
   */
  findNoteCollaborators = (id: string, params: RequestParams = {}) =>
    this.request<NoteAccessResponse[], any>({
      path: `/api/v1/user/notes/access/${id}`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags note-access-controller
   * @name HasAccess
   * @request GET:/api/v1/user/notes/access/{id}/access/{accessType}
   */
  hasAccess = (id: string, accessType: string, params: RequestParams = {}) =>
    this.request<boolean, any>({
      path: `/api/v1/user/notes/access/${id}/access/${accessType}`,
      method: "GET",
      ...params,
    });
}
