import axios from "axios";
import toast from "react-hot-toast";

export async function sendAPIRequest(
  url,
  method = "GET",
  data = {},
  headers = {}
) {
  try {
    const res = await axios.request({
      url,
      method,
      data,
      headers,
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

export const sendToast = (message, icon) => {
  toast(message, {
    icon,
    duration: 5000,
  });
};
