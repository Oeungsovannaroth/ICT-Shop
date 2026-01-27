// src/data/productData.js
import GridDataWomen from "./GridDataWomen";
import GridDataMen from "./GridDataMen";
import GridDataBoys from "./GridDataBoys";
import GridDataGirls from "./GridDataGirls";
import homeData from "./homeData";
import ZandoData from "./zandoData";
import ten11Data from "./ten11Data";
import routineData from "./routineData";
import gatoniData from "./gatoniData";
import sportData from "./sportData";
import sisburmaData from "./sisburmaData";
import pomeloData from "./pomeloData";
// Map gender → corresponding GridData file
const genderDataMap = {
    women: GridDataWomen,
    men: GridDataMen,
    boys: GridDataBoys,
    girls: GridDataGirls,
    zando: ZandoData,
    ten11: ten11Data,
    routine: routineData,
    gatoni: gatoniData,
    "361-sport": sportData,
    sisburma: sisburmaData,
    "pomelo": pomeloData,
    // add more genders if needed in future
};

export const getProductsByGender = (gender) => {
    if (!gender) return [];

    const lowerGender = gender.toLowerCase();
    const data = genderDataMap[lowerGender];

    if (!data) return [];

    return data.All;
};

export const getAllFallbackProducts = () => [
    ...(homeData.shoes || []),
    ...(homeData.lifestyleProducts || []),
    ...(homeData.driftProducts || []),
    ...(homeData.categories || []),
];

export const getAllProducts = () => {
    return [
        ...getProductsByGender("women"),
        ...getProductsByGender("men"),
        ...getProductsByGender("boys"),
        ...getProductsByGender("girls"),
        ...getProductsByGender("zando"),
        ...getProductsByGender("ten11"),
        ...getProductsByGender("routine"),
        ...getProductsByGender("gatoni"),
        ...getProductsByGender("361-sport"),
        ...getProductsByGender("sisburma"),
        ...getProductsByGender("pomelo"),
        ...getAllFallbackProducts(),
    ].filter(Boolean); // remove any undefined/null
};