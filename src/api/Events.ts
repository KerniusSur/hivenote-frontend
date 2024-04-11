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

import { EventCreateRequest, EventResponse, EventUpdateRequest } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Events<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags events
   * @name Update
   * @request PUT:/api/v1/user/events
   */
  update = (data: EventUpdateRequest, params: RequestParams = {}) =>
    this.request<EventResponse, any>({
      path: `/api/v1/user/events`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags events
   * @name Create
   * @request POST:/api/v1/user/events
   */
  create = (data: EventCreateRequest, params: RequestParams = {}) =>
    this.request<EventResponse, any>({
      path: `/api/v1/user/events`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags events
   * @name FindById
   * @request GET:/api/v1/user/events/{id}
   */
  findById = (id: string, params: RequestParams = {}) =>
    this.request<EventResponse, any>({
      path: `/api/v1/user/events/${id}`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags events
   * @name Delete
   * @request DELETE:/api/v1/user/events/{id}
   */
  delete = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/user/events/${id}`,
      method: "DELETE",
      ...params,
    });
  /**
   * No description
   *
   * @tags events
   * @name FindAllUserEventsFilteredBy
   * @request GET:/api/v1/user/events/filter
   */
  findAllUserEventsFilteredBy = (
    query?: {
      /** @format date-time */
      dateFrom?: string;
      /** @format date-time */
      dateTo?: string;
      searchString?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<EventResponse[], any>({
      path: `/api/v1/user/events/filter`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags events
   * @name FindAllUserEvents
   * @request GET:/api/v1/user/events/all
   */
  findAllUserEvents = (params: RequestParams = {}) =>
    this.request<EventResponse[], any>({
      path: `/api/v1/user/events/all`,
      method: "GET",
      ...params,
    });
}
