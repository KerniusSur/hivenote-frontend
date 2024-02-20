import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const notifyError = (message: string) =>
	toast.error(message, {
		position: "top-center",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "colored",
	});

export const createApi = (type: string): any => {
	// eslint-disable-next-line
	const { t } = useTranslation("translation", { keyPrefix: "ApiError" });
	let returnValue;
	switch (type) {
		default: {
			console.error("could not find api with type:", type);
			break;
		}
	}

	returnValue.instance.interceptors.response.use(
		(response: any) => response,
		(error: any) => {
			notifyError(
				t(error?.response?.data || error?.message || error?.error?.message)
			);
			throw new Error(
				error?.response?.data ?? error?.message ?? error?.error?.message
			);
		}
	);

	return returnValue;
};
