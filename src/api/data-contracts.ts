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

export interface NoteUpdateRequest {
  /** @format uuid */
  id: string;
  title: string;
  coverUrl?: string;
  isArchived?: boolean;
  isDeleted?: boolean;
}

export interface AccountPublicResponse {
  /** @format uuid */
  id: string;
  name?: string;
  lastName?: string;
  email: string;
  phoneNumber?: string;
}

export interface CommentResponse {
  /** @format uuid */
  id?: string;
  body?: string;
  /** @format int32 */
  noteLine?: number;
  isResolved?: boolean;
  account?: AccountPublicResponse;
  parent?: CommentResponse;
}

export interface ComponentItems {
  text?: string;
  checked?: boolean;
}

export interface ComponentProperties {
  title?: string;
  text?: string;
  /** @format int32 */
  level?: number;
  items?: object;
  message?: string;
  alignment?: string;
  caption?: string;
  html?: string;
  link?: string;
  itemsList?: ComponentItems[];
  itemsString?: string[];
}

export interface ComponentResponse {
  /** @format uuid */
  id?: string;
  type?:
    | "header"
    | "paragraph"
    | "list"
    | "checklist"
    | "image"
    | "link"
    | "linkTool";
  /** @format int32 */
  priority?: number;
  properties?: ComponentProperties;
  parent?: ComponentResponse;
}

export interface NoteResponse {
  /** @format uuid */
  id: string;
  title?: string;
  coverUrl?: string;
  isArchived: boolean;
  isDeleted: boolean;
  components?: ComponentResponse[];
  collaborators: AccountPublicResponse[];
  comments?: CommentResponse[];
  children?: NoteResponse[];
}

export interface NoteShareRequest {
  /** @format uuid */
  noteId: string;
  accessType: string;
  emails?: string[];
}

export interface EventUpdateRequest {
  title: string;
  description?: string;
  location?: string;
  /** @format date-time */
  eventStart: string;
  /** @format date-time */
  eventEnd: string;
  /** @format uuid */
  id: string;
}

export interface EventResponse {
  /** @format uuid */
  id: string;
  title: string;
  description?: string;
  location?: string;
  /** @format date-time */
  eventStart: string;
  /** @format date-time */
  eventEnd: string;
  createdBy: AccountPublicResponse;
}

export interface UpdateAccountInfoRequest {
  /** @format uuid */
  id?: string;
  email: string;
  name: string;
  lastName: string;
  phoneNumber: string;
}

export interface PasswordUpdateRequest {
  newPassword: string;
}

export interface RegisterConfirmationRequest {
  name: string;
  lastName: string;
}

export interface UpdatePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export interface NoteCreateRequest {
  title?: string;
  coverUrl?: string;
  isArchived?: boolean;
  isDeleted?: boolean;
  /** @format uuid */
  parentId?: string;
}

export interface EventCreateRequest {
  title: string;
  description?: string;
  location?: string;
  /** @format date-time */
  eventStart: string;
  /** @format date-time */
  eventEnd: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  lastName: string;
  phoneNumber?: string;
}

export interface EmailPasswordLoginRequest {
  email: string;
  password: string;
  ipAddress?: string;
}

export interface NoteAccessResponse {
  /** @format uuid */
  noteId?: string;
  /** @format uuid */
  accountId?: string;
  accessType?: "OWNER" | "EDITOR" | "VIEWER";
  accountEmail?: string;
}

export interface MeResponse {
  /** @format uuid */
  id?: string;
  name?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  availableRoles?: RoleResponse[];
}

export interface RoleResponse {
  /** @format uuid */
  id?: string;
  name?: "ADMIN" | "MANAGER" | "USER";
}
