import ApiClient from "~/services/ApiClient";

export default class JokesQueries {
  static list = () => ({
    queryKey: ["joke"],
    queryFn: () => ApiClient.get("jokes"),
  });
}
