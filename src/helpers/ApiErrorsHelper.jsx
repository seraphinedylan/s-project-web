import React from 'react';

import Notifications from "~/services/Notifications";

import StringHelper from "./StringHelper";

export const ErrorsMessages = {
  AUTH_USERNOTFOUND: "L'utilisateur est introuvable.",
  AUTH_NOREFRESHTOKEN: "Aucun token de rafraîchissement renseigné.",
  AUTH_NOBEARERTOKEN: "Aucun token d'authentification renseigné.",
  AUTH_INVALIDTOKEN: "Le token d'authentification n'est pas reconnu.",
  AUTH_TOKENSDONOTMATCH: "Les tokens renseignés ne correspondent pas.",
};

export default class ApiErrorsHelper {
  static getMessage = (code) =>
    typeof code === "string" && code in ErrorsMessages
      ? ErrorsMessages[code]
      : code;

  static convertApiValidationError = (apiResponse) => {
    if (typeof apiResponse !== "object") return apiResponse;

    const result = {};
    for (const field in apiResponse) {
      result[field] = "";

      for (const message of apiResponse[field]) {
        if (!StringHelper.isNullOrEmpty(result[field])) {
          result[field] += `\n`;
        }

        result[field] += ApiErrorsHelper.getMessage(message);
      }
    }

    return result;
  };

  static manage = (error, formRef = null) => {
    if (error.status === 400 && formRef) {
      if (typeof error.raw === "object") {
        const result = {};
        for (const field in error.raw) {
          result[field] = "";
          for (const message of error.raw[field]) {
            if (!StringHelper.isNullOrEmpty(result[field])) {
              result[field] += `\n`;
            }
            result[field] += ApiErrorsHelper.getMessage(message);
          }
        }
        formRef?.current?.setErrors(result);
      } else {
        Notifications.error(
          <div>
            <div>Une erreur est survenue</div>
            <div className="text-sm">{error.raw}</div>
          </div>,
        );
      }
    } else {
      let errorDetails = null;
      if (typeof error.raw === "object") {
        errorDetails = error.raw.error;
      }

      Notifications.error(
        <div>
          <div>Une erreur est survenue</div>
          <div className="text-sm">{errorDetails}</div>
        </div>,
      );
    }
  };
}
