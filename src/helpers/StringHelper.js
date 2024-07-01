export default class StringHelper {
  static isNullOrEmpty = (text) =>
    !text || typeof text !== "string" || text.trim() === "";

  static formatPhoneNumber = (phoneNumber) => {
    return StringHelper.isNullOrEmpty(phoneNumber) || phoneNumber.length === 1
      ? phoneNumber
      : phoneNumber
          .replace(/\s/g, "")
          .replace(/(.{2})/g, "$1 ")
          .trim();
  };

  static random = (length) =>
    [...Array(length)]
      .map(() => (~~(Math.random() * 36)).toString(36))
      .join("");

  static firstLetters = (text) => {
    if (StringHelper.isNullOrEmpty(text)) return "";

    const parts = text.split(" ");
    return parts.map((word) => word.charAt(0));
  };

  static isAfter = (testedString, comparison, strict = true) =>
    StringHelper.isNullOrEmpty(comparison) ||
    StringHelper.isNullOrEmpty(testedString) ||
    (strict
      ? testedString.localeCompare(comparison) > 0
      : testedString.localeCompare(comparison) >= 0);

  static isBefore = (testedString, comparison, strict = true) =>
    StringHelper.isNullOrEmpty(comparison) ||
    StringHelper.isNullOrEmpty(testedString) ||
    (strict
      ? testedString.localeCompare(comparison) < 0
      : testedString.localeCompare(comparison) <= 0);

  static isValidTime = (testedString) => {
    if (StringHelper.isNullOrEmpty(testedString)) return false;

    const regex = /^(0[0-9]|1[0-9]|2[0-4]):[0-5][0-9]$/;

    return regex.test(testedString);
  };
}
