import HttpClient from '~/services/HttpClient';

// import AuthApiClient from "./AuthApiClient";
// import Authentication from "./Authentication";

export default class ApiClient {
  //   static refreshingPromise = null;

  static prefix = 'api';

  //   static authExpired = null;

  //   static addAuthExpiredListener = (callback) => {
  //     ApiClient.authExpired = () => {
  //       callback();
  //     };
  //     return ApiClient.authExpired;
  //   };

  //   static removeAuthExpiredListener = (callback) => {
  //     if (ApiClient.authExpired === callback) {
  //       ApiClient.authExpired = null;
  //     }
  //   };

  static request = async (
    method,
    route,
    body = null,
    multipart = false
    // allowTokenRefresh = true,
  ) => {
    let error = null;

    // if (ApiClient.refreshingPromise) {
    //   await ApiClient.refreshingPromise.catch((e) => {
    //     error = e;
    //   });
    // }

    // if (error) {
    //   return Promise.reject(error);
    // }

    let finalRoute = `${ApiClient.prefix}/${route}`;
    if (finalRoute.endsWith('/')) {
      finalRoute = finalRoute.slice(0, -1);
    } else if (finalRoute.includes('/?')) {
      finalRoute.replace('/?', '?');
    }

    const response = await HttpClient.request(
      method,
      finalRoute,
      null,
      //   Authentication.getToken(),
      body,
      multipart
    ).catch(e => {
      error = e;
      return null;
    });

    if (error) {
      return Promise.reject(error);

      // if (error.status === 401) {
      //   if (allowTokenRefresh) {
      //     let error = null;
      //     const refreshPromise = ApiClient.refreshToken();
      //     await refreshPromise.catch((e2) => {
      //       error = e2;
      //     });

      //     return error
      //       ? Promise.reject(error)
      //       : ApiClient.request(method, route, body, multipart, false);
      //   } else {
      //     ApiClient.authExpired();
      //   }
      // } else {
      //   return Promise.reject(error);
      // }
    }

    return Promise.resolve(response);
  };

  //   static refreshToken = () => {
  //     if (ApiClient.refreshingPromise === null) {
  //       ApiClient.refreshingPromise = new Promise(async (resolve, reject) => {
  //         const newAuth = await AuthApiClient.post(
  //           "login/refresh",
  //           Authentication.getToken(),
  //         ).catch((e) => {
  //           if (ApiClient.authExpired) {
  //             ApiClient.authExpired();
  //           }

  //           reject(e);
  //         });

  //         if (newAuth) {
  //           Authentication.login(newAuth.token);
  //           resolve();
  //         }

  //         ApiClient.refreshingPromise = null;
  //       });
  //     }

  //     return ApiClient.refreshingPromise;
  //   };

  static get = route => ApiClient.request('GET', route);
  static post = (route, body = null, multipart = false) =>
    ApiClient.request('POST', route, body, multipart);

  static put = (route, body = null, multipart = false) =>
    ApiClient.request('PUT', route, body, multipart);

  static patch = (route, body = null, multipart = false) =>
    ApiClient.request('PATCH', route, body, multipart);

  static delete = route => ApiClient.request('DELETE', route);
}
