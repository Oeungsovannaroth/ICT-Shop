// src/data/productData.js
import GridDataWomen from './GridDataWomen';
// import GridDataMen from './GridDataMen';
// import GridDataBoys from './GridDataBoys';
// import GridDataGirls from './GridDataGirls';
import homeData from './homeData';

// Map gender → corresponding GridData file
const genderDataMap = {
    women: GridDataWomen,
    // men: GridDataMen,
    // boys: GridDataBoys,
    // girls: GridDataGirls,
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

/**
 * Optional helper: get ALL products across all genders
 * (useful for search, recommendations, etc.)
 */
export const getAllProducts = () => {
    return [
        ...getProductsByGender('women'),
        ...getProductsByGender('men'),
        ...getProductsByGender('boys'),
        ...getProductsByGender('girls'),
        ...getAllFallbackProducts(),
    ].filter(Boolean); // remove any undefined/null
};