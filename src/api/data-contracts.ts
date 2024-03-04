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
  username?: string;
}

export interface UpdatePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export interface EmailPasswordLoginRequest {
  email: string;
  password: string;
  ipAddress?: string;
}

export interface MeResponse {
  /** @format uuid */
  id?: string;
  name?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  isActive?: boolean;
  isEmailConfirmed?: boolean;
  availableRoles?: RoleResponse[];
}

export interface RoleResponse {
  /** @format uuid */
  id?: string;
  name?: "ADMIN" | "MANAGER" | "USER";
}
