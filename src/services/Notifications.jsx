import React from 'react';

import {
  faCheck,
  faCircleExclamation,
  faCircleInfo,
  faTriangleExclamation,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";

export default class Notifications {
  static update = (id, options) => toast.update(id, options);

  // null = dismiss all
  static dismiss = (id = null) => toast.dismiss(id);

  static success = (content, options = {}) =>
    toast(content, {
      className: "bg-success-500",
      bodyClassName: "text-white",
      progressClassName: "bg-success-600",
      type: toast.TYPE.SUCCESS,
      closeButton: (
        <>
          <span className="text-xs">
            <FontAwesomeIcon icon={faX} />
          </span>
        </>
      ),
      icon: (
        <>
          <span className="text-2xl">
            <FontAwesomeIcon icon={faCheck} />
          </span>
        </>
      ),
      ...options,
    });

  static warning = (content, options = {}) =>
    toast(content, {
      className: "bg-warning-500",
      bodyClassName: "text-white",
      progressClassName: "bg-warning-600",
      type: toast.TYPE.WARNING,
      closeButton: (
        <>
          <span className="text-xs">
            <FontAwesomeIcon icon={faX} />
          </span>
        </>
      ),
      icon: (
        <>
          <span className="text-2xl">
            <FontAwesomeIcon icon={faTriangleExclamation} />
          </span>
        </>
      ),
      ...options,
    });

  static error = (content, options = {}) =>
    toast(content, {
      className: "bg-danger-500",
      bodyClassName: "text-white",
      progressClassName: "bg-danger-600",
      type: toast.TYPE.ERROR,
      closeButton: (
        <>
          <span className="text-xs">
            <FontAwesomeIcon icon={faX} />
          </span>
        </>
      ),
      icon: (
        <>
          <span className="text-2xl">
            <FontAwesomeIcon icon={faCircleExclamation} />
          </span>
        </>
      ),
      ...options,
    });

  static info = (content, options = {}) =>
    toast(content, {
      className: "bg-info-500",
      bodyClassName: "text-white",
      progressClassName: "bg-info-600",
      type: toast.TYPE.INFO,
      closeButton: (
        <>
          <span className="text-xs">
            <FontAwesomeIcon icon={faX} />
          </span>
        </>
      ),
      icon: (
        <>
          <span className="text-2xl">
            <FontAwesomeIcon icon={faCircleInfo} />
          </span>
        </>
      ),
      ...options,
    });

  static show = (content, options = {}) => toast(content, options);
}
