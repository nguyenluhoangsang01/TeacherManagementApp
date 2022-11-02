import axios from "axios";

export default async function sendAPIRequest(
  url,
  method = "GET",
  data = {},
  headers = {}
) {
  try {
    const res = await axios.request({
      url: encodeURI(url),
      headers,
      method: method,
      data,
    });

    return res.data;
  } catch (error) {
    const err = {
      success: error.response.data.success,
      status: error.response.status,
      message: error.response.data.message,
    };

    return err;
  }
}
