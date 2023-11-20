import axiosClient from "@/utils/axios/axiosConfig";

export const getProducts = () => fetch("/api/product");

export const getCategorys = async ({ STORE_CODE }) => {
  const body = { STORE_CODE };
  const { data } = await axiosClient.post("/getCategorys", body);
  return data;
};

export const getSubcategorysById = async ({ STORE_CODE = "", parentId }) => {
  const body = { STORE_CODE, parentId };
  const { data } = await axiosClient.post("/GetSubcategorysById", body);
  return data;
};

export const getProductsByCategoryId = async ({
  STORE_CODE = "",
  parentId,
}) => {
  const body = { STORE_CODE, parentId };
  const { data } = await axiosClient.post("/GetProductsByCategoryId", body);
  return data;
};

export const getProductById = async ({ STORE_CODE = "", productId }) => {
  const body = { STORE_CODE, productId };
  const { data } = await axiosClient.post("/GetProductById", body);
  return data;
};

export const fetchSubCategoryProducts = async ({
  STORE_CODE = "",
  pageParam = 0,
  subCategoryId,
  limit,
}) => {
  const body = { STORE_CODE, subCategoryId, limit, page: pageParam };
  const { data } = await axiosClient.post(
    "/GetProductsBySubCategoryIdWithLimit",
    body
  );
  return data;
};

export const fetchCategoryProducts = async ({
  STORE_CODE = "",
  pageParam = 0,
  parentId,
  limit,
}) => {
  const body = { STORE_CODE, parentId, limit, page: pageParam };
  const { data } = await axiosClient.post(
    "/GetProductsByCategoryIdWithLimit",
    body
  );
  return data;
};

export const fetchUserDetailsByPhoneNumber = async ({
  STORE_CODE = "",
  phoneNumber,
}) => {
  const body = { STORE_CODE, phoneNumber };
  const { data } = await axiosClient.post(
    "/FetchUserDetailsByPhoneNumber",
    body
  );
  return data;
};

export const requestOtp = async ({
  STORE_CODE = "",
  phoneNumber,
  platform,
}) => {
  const body = { STORE_CODE, phoneNumber, platform };
  const { data } = await axiosClient.post("/RequestOtp", body);
  return data;
};

export const verifyOtp = async ({ STORE_CODE = "", phoneNumber, otp }) => {
  const body = { STORE_CODE, phoneNumber, otp };
  const { data } = await axiosClient.post("/VerifyOtp ", body);
  return data;
};

export const fetchUser = async ({ STORE_CODE = "", phoneNumber }) => {
  const body = { STORE_CODE, phoneNumber };
  const { data } = await axiosClient.post(
    "/FetchUserDetailsByPhoneNumber",
    body
  );
  return data;
};

export const saveUserAddress = async (arg) => {
  const body = arg;
  const { data } = await axiosClient.post("/SaveUserAddress", body);
  return data;
};

export const getMetaData = async ({ STORE_CODE = "" }) => {
  const body = { STORE_CODE };
  const { data } = await axiosClient.post("/getMetaData", body);
  return data;
};

export const searchProducts = async ({
  STORE_CODE = "",
  prompt,
  offset = 0,
  limit,
  totalItems = 0,
}) => {
  const body = { STORE_CODE, prompt, limit, offset, totalItems };
  const { data } = await axiosClient.post("/search", body);
  return data;
};

export const getExtrasForHome = async ({ STORE_CODE = "" }) => {
  const body = { STORE_CODE };
  const { data } = await axiosClient.post(
    "/getExtraCategorysWithProducts",
    body
  );
  return data;
};

export const fetchOrders = async ({ STORE_CODE = "", phone }) => {
  const body = { STORE_CODE, phone };
  const { data } = await axiosClient.post("/fetchOrders", body);
  return data;
};

export const fetchOrderByOrderNumber = async ({
  STORE_CODE = "",
  phone,
  orderNumber,
}) => {
  const body = { STORE_CODE, phone, orderNumber };
  const { data } = await axiosClient.post("/fetchOrderByOrderNumber", body);
  return data;
};

export const fetchSlots = async ({ STORE_CODE = "", distance }) => {
  const body = { STORE_CODE, distance };
  const { data } = await axiosClient.post("/fetchSlots", body);
  return data;
};

export const checkCoupons = async ({
  STORE_CODE = "",
  coupon,
  userPhone,
  grandTotal,
  subTotal,
}) => {
  const body = { STORE_CODE, coupon, userPhone, grandTotal, subTotal };
  const { data } = await axiosClient.post("/checkCoupons", body);
  return data;
};

export const placeOrder = async ({ STORE_CODE = "", dataOrder }) => {
  const body = { STORE_CODE, ...dataOrder };
  const { data } = await axiosClient.post("/placeOrder", body);
  return data;
};

export const fetchBanner = async ({ STORE_CODE = "" }) => {
  const body = { STORE_CODE };
  const { data } = await axiosClient.post("/fetchBanner", body);
  return data;
};
