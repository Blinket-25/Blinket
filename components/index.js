import dynamic from "next/dynamic";

// export { default as Category } from "./Category";
// export { default as CategoryTitle } from "./Title/CategoryTitle";
// export { default as CategoryTitle } from "./Title";
// export { default as SliderBannerWrapper } from "./Slider/Banner";
// export { default as SliderBannerWrapper } from "./Slider/Banner";
// export { default as SliderProductWrapper } from "./Slider/Product";
// export { default as SliderProductWrapper } from "./Slider/Product";
// export { default as LocationComponent } from "./CurrentLocation";
// export { default as LocationComponent } from "./CurrentLocation";
// export { default as SpinnerInCenter } from "./Spinner";
// export { default as SpinnerInCenter } from "./Spinner";

export const Category = dynamic(() => import("./Category"));
export const CategoryTitle = dynamic(() => import("./Title"));
export const SliderBannerWrapper = dynamic(() => import("./Slider/Banner"));
export const SliderProductWrapper = dynamic(() => import("./Slider/Product"));
export const LocationComponent = dynamic(() => import("./CurrentLocation"));
export const SpinnerInCenter = dynamic(() => import("./Spinner"));
// export const SpinnerInCenter = dynamic(() =>
//   import("@/components/Spinner/SpinnerInCenter")
// );
