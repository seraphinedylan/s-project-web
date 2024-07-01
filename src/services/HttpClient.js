 
import ApiErrorsHelper from "~/helpers/ApiErrorsHelper";

const valueExists = (value) => value !== null && value !== undefined;

export default class HttpClient {
  static request = async (
    method,
    route,
    userToken = null,
    body = null,
    multipart = false,
  ) => {
    const headers = new Headers({
      Accept: "application/json",
    });

    if (userToken) {
      headers.append("authorization", `Bearer ${userToken}`);
    }

    if (!multipart) {
      headers.append("Content-Type", "application/json");
    }

    const opts = {
      method,
      headers,
    };

    if (body != null) {
      let bodyData = null;
      if (multipart) {
        bodyData = new FormData();
        for (const prop in body) {
          if (Array.isArray(body[prop])) {
            for (const propValue of body[prop]) {
              bodyData.append(
                `${prop}[]`,
                valueExists(propValue) ? propValue : "",
              );
            }
          } else {
            bodyData.append(prop, valueExists(body[prop]) ? body[prop] : "");
          }
        }

        opts.body = bodyData;
      } else {
        opts.body = JSON.stringify(body);
      }
    }

    let error = null;
    const response = await fetch(
      `${import.meta.env.VITE_API_ENDPOINT.replace(/\/$/, "")}/${route}`,
      opts,
    ).catch((e) => {
      error = e;
      return null;
    });

    if (error) {
      return Promise.reject(error);
    } else {
      return HttpClient.handleResponse(response);
    }
  };

  static handleResponse = async (response) => {
    const json = await response.json().catch(() => {
      return "Response parsing error";
    });

    switch (response.status) {
      case 200:
      case 201:
        return Promise.resolve(json);
      case 204:
        return Promise.resolve(null);
      case 400:
      case 500:
        return Promise.reject({
          status: response.status,
          raw: json,
          message:
            typeof json === "string" ? ApiErrorsHelper.getMessage(json) : "",
        });
      default:
        return Promise.reject({
          status: response.status,
          raw: "",
          message: "",
        });
    }
  };
}
