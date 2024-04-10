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
import { HttpClient, RequestParams } from "./http-client";

export class Event<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags event
   * @name Update
   * @request PUT:/api/v1/user/event
   */
  update = (
    query: {
      request: EventUpdateRequest;
    },
    params: RequestParams = {}
  ) =>
    this.request<EventResponse, any>({
      path: `/api/v1/user/event`,
      method: "PUT",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags event
   * @name Create
   * @request POST:/api/v1/user/event
   */
  create = (
    query: {
      request: EventCreateRequest;
    },
    params: RequestParams = {}
  ) =>
    this.request<EventResponse, any>({
      path: `/api/v1/user/event`,
      method: "POST",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags event
   * @name FindById
   * @request GET:/api/v1/user/event/{id}
   */
  findById = (id: string, params: RequestParams = {}) =>
    this.request<EventResponse, any>({
      path: `/api/v1/user/event/${id}`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags event
   * @name Delete
   * @request DELETE:/api/v1/user/event/{id}
   */
  delete = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/user/event/${id}`,
      method: "DELETE",
      ...params,
    });
  /**
   * No description
   *
   * @tags event
   * @name FindAllUserEventsFilteredBy
   * @request GET:/api/v1/user/event/filter
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
      path: `/api/v1/user/event/filter`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags event
   * @name FindAllUserEvents
   * @request GET:/api/v1/user/event/all
   */
  findAllUserEvents = (params: RequestParams = {}) =>
    this.request<EventResponse[], any>({
      path: `/api/v1/user/event/all`,
      method: "GET",
      ...params,
    });
}
