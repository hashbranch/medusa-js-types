import { HttpTypes } from "@medusajs/types";
import { Client } from "../client";
import { Config } from "../types";
export declare class Auth {
    private client;
    private config;
    constructor(client: Client, config: Config);
    /**
     * This method is used to retrieve a registration JWT token for a user, customer, or custom actor type. It sends a request to the
     * [Retrieve Registration Token API route](https://docs.medusajs.com/api/store#auth_postactor_typeauth_provider_register).
     *
     * @param actor - The actor type. For example, `user` for admin user, or `customer` for customer.
     * @param method - The authentication provider to use. For example, `emailpass` or `google`.
     * @param payload - The data to pass in the request's body for authentication. When using the `emailpass` provider,
     * you pass the email and password.
     * @returns The JWT token used for registration later.
     *
     * @example
     * sdk.auth.register(
     *   "customer",
     *   "emailpass",
     *   {
     *     email: "customer@gmail.com",
     *     password: "supersecret"
     *   }
     * ).then((token) => {
     *   console.log(token)
     * })
     */
    register: (actor: string, method: string, payload: HttpTypes.AdminSignUpWithEmailPassword) => Promise<string>;
    /**
     * This method retrieves the JWT authenticated token for an admin user, customer, or custom
     * actor type. It sends a request to the [Authenticate API Route](https://docs.medusajs.com/api/admin#auth_postactor_typeauth_provider).
     *
     * If the `auth.type` of the SDK is set to `session`, this method will also send a request to the
     * [Set Authentication Session API route](https://docs.medusajs.com/api/admin#auth_postsession).
     *
     * Subsequent requests using the SDK will automatically have the necessary authentication headers / session
     * set.
     *
     * @param actor - The actor type. For example, `user` for admin user, or `customer` for customer.
     * @param method - The authentication provider to use. For example, `emailpass` or `google`.
     * @param payload - The data to pass in the request's body for authentication. When using the `emailpass` provider,
     * you pass the email and password.
     * @returns The authentication JWT token
     *
     * @example
     * sdk.auth.login(
     *   "customer",
     *   "emailpass",
     *   {
     *     email: "customer@gmail.com",
     *     password: "supersecret"
     *   }
     * ).then((token) => {
     *   console.log(token)
     * })
     */
    login: (actor: string, method: string, payload: HttpTypes.AdminSignInWithEmailPassword | Record<string, unknown>) => Promise<string | {
        location: string;
    }>;
    /**
     * This method is used to validate an Oauth callback from a third-party service, such as Google, for an admin user, customer, or custom actor types.
     * It sends a request to the [Validate Authentication Callback](https://docs.medusajs.com/api/admin#auth_postactor_typeauth_providercallback).
     *
     * @param actor - The actor type. For example, `user` for admin user, or `customer` for customer.
     * @param method - The authentication provider to use. For example, `google`.
     * @param query - The query parameters from the Oauth callback, which should be passed to the API route.
     * @returns The authentication JWT token
     *
     * @example
     * sdk.auth.callback(
     *   "customer",
     *   "google",
     *   {
     *     code: "123",
     *   }
     * ).then((token) => {
     *   console.log(token)
     * })
     *
     *
     * @privateRemarks
     * The callback expects all query parameters from the Oauth callback to be passed to
     * the backend, and the provider is in charge of parsing and validating them
     */
    callback: (actor: string, method: string, query?: Record<string, unknown>) => Promise<string>;
    /**
     * This method refreshes a JWT authentication token, which is useful after validating the Oauth callback
     * with {@link callback}. It sends a request to the [Refresh Authentication Token API route](https://docs.medusajs.com/api/admin#auth_postadminauthtokenrefresh).
     *
     * @returns The refreshed JWT authentication token.
     *
     * @example
     * sdk.auth.refresh()
     * .then((token) => {
     *   console.log(token)
     * })
     */
    refresh: () => Promise<string>;
    /**
     * This method deletes the authentication session of the currently logged-in user to log them out.
     * It sends a request to the [Delete Authentication Session API route](https://docs.medusajs.com/api/admin#auth_deletesession).
     *
     * @example
     * sdk.auth.logout()
     * .then(() => {
     *   // user is logged out
     * })
     */
    logout: () => Promise<void>;
    /**
     * This method requests a reset password token for an admin user, customer, or custom actor type.
     * It sends a request to the [Generate Reset Password Token API route](https://docs.medusajs.com/api/admin#auth_postactor_typeauth_providerresetpassword).
     *
     * To reset the password later using the token delivered to the user, use the {@link updateProvider} method.
     *
     * Related guide: [How to allow customers to reset their passwords in a storefront](https://docs.medusajs.com/resources/storefront-development/customers/reset-password).
     *
     * @param actor - The actor type. For example, `user` for admin user, or `customer` for customer.
     * @param provider - The authentication provider to use. For example, `emailpass`.
     * @param body - The data required to identify the user.
     *
     * @example
     * sdk.auth.resetPassword(
     *   "customer",
     *   "emailpass",
     *   {
     *     identifier: "customer@gmail.com"
     *   }
     * )
     * .then(() => {
     *   // user receives token
     * })
     */
    resetPassword: (actor: string, provider: string, body: {
        /**
         * The user's identifier. For example, when using the `emailpass` provider,
         * this would be the user's email.
         */
        identifier: string;
    }) => Promise<void>;
    /**
     * This method is used to update user-related data authentication data.
     *
     * More specifically, use this method when updating the password of an admin user, customer, or
     * custom actor type after requesting to reset their password with {@link resetPassword}.
     *
     * This method sends a request to [this API route](https://docs.medusajs.com/api/admin#auth_postactor_typeauth_providerupdate).
     *
     * Related guide: [How to allow customers to reset their passwords in a storefront](https://docs.medusajs.com/resources/storefront-development/customers/reset-password).
     *
     * @param actor - The actor type. For example, `user` for admin user, or `customer` for customer.
     * @param provider - The authentication provider to use. For example, `emailpass`.
     * @param body - The data necessary to update the user's authentication data. When resetting the user's password,
     * send the `password` property.
     *
     * @example
     * sdk.auth.updateProvider(
     *   "customer",
     *   "emailpass",
     *   {
     *     password: "supersecret"
     *   },
     *   token
     * )
     * .then(() => {
     *   // password updated
     * })
     */
    updateProvider: (actor: string, provider: string, body: Record<string, unknown>, token: string) => Promise<void>;
    /**
     * @ignore
     */
    private setToken_;
}
//# sourceMappingURL=index.d.ts.map