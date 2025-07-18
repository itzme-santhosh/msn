import { fSub } from 'src/utils/format-time';

import { CONFIG } from 'src/config-global';

import {
  _id,
  _ages,
  _roles,
  _prices,
  _emails,
  _ratings,
  _nativeS,
  _nativeM,
  _nativeL,
  _percents,
  _booleans,
  _sentences,
  _lastNames,
  _fullNames,
  _tourNames,
  _jobTitles,
  _taskNames,
  _fileNames,
  _postTitles,
  _firstNames,
  _eventNames,
  _courseNames,
  _fullAddress,
  _serviceNames,
  _companyNames,
  _productNames,
  _descriptions,
  _phoneNumbers,
  _countryNames,
  _foodServiceNames,
  _kidsServiceNames,
  _financeServiceNames,
  _homeCareServiceNames,
} from './assets';

// ----------------------------------------------------------------------

export const _mock = {
  id: (index) => _id[index],
  time: (index) => fSub({ days: index, hours: index }),
  boolean: (index) => _booleans[index],
  role: (index) => _roles[index],
  // Text
  courseNames: (index) => _courseNames[index],
  serviceNames: (index) => _serviceNames[index],
  fileNames: (index) => _fileNames[index],
  eventNames: (index) => _eventNames[index],
  taskNames: (index) => _taskNames[index],
  postTitle: (index) => _postTitles[index],
  jobTitle: (index) => _jobTitles[index],
  tourName: (index) => _tourNames[index],
  productName: (index) => _productNames[index],
  sentence: (index) => _sentences[index],
  description: (index) => _descriptions[index],
  // Contact
  email: (index) => _emails[index],
  phoneNumber: (index) => _phoneNumbers[index],
  fullAddress: (index) => _fullAddress[index],
  // Name
  firstName: (index) => _firstNames[index],
  lastName: (index) => _lastNames[index],
  fullName: (index) => _fullNames[index],
  companyNames: (index) => _companyNames[index],
  countryNames: (index) => _countryNames[index],
  // Number
  number: {
    percent: (index) => _percents[index],
    rating: (index) => _ratings[index],
    age: (index) => _ages[index],
    price: (index) => _prices[index],
    nativeS: (index) => _nativeS[index],
    nativeM: (index) => _nativeM[index],
    nativeL: (index) => _nativeL[index],
  },
  // Image
  image: {
    cover: (index) => `${CONFIG.assetsDir}/assets/images/mock/cover/cover-${index + 1}.jpg`,
    avatar: (index) => `${CONFIG.assetsDir}/assets/images/mock/avatar/avatar-${index + 1}.jpg`,
    travel: (index) => `${CONFIG.assetsDir}/assets/images/mock/travel/travel-${index + 1}.jpg`,
    course: (index) => `${CONFIG.assetsDir}/assets/images/mock/course/course-${index + 1}.jpg`,
    service: (index) => `${CONFIG.assetsDir}/assets/images/mock/service/service-${index + 1}.jpg`,
    noteworthy: (index) =>
      `${CONFIG.assetsDir}/assets/images/mock/noteworthy/noteworthy-${index + 1}.jpg`,
    company: (index) => `${CONFIG.assetsDir}/assets/images/mock/company/company-${index + 1}.jpg`,
    product: (index) => `${CONFIG.assetsDir}/assets/images/mock/m-product/product-${index + 1}.jpg`,
    portrait: (index) =>
      `${CONFIG.assetsDir}/assets/images/mock/portrait/portrait-${index + 1}.jpg`,
    homeCareService: (index) =>
      `${CONFIG.assetsDir}/assets/images/mock/homecare/homecare-${index + 1}.jpg`,
    foodService: (index) => `${CONFIG.assetsDir}/assets/images/mock/food/food-${index + 1}.jpg`,
    kidsService: (index) => `${CONFIG.assetsDir}/assets/images/mock/kids/kids-${index + 1}.jpg`,
    financeService: (index) =>
      `${CONFIG.assetsDir}/assets/images/mock/finance/finance-${index + 1}.jpg`,
  },
  homeCareServiceNames: (index) => _homeCareServiceNames[index],
  foodServiceNames: (index) => _foodServiceNames[index],
  kidsServiceNames: (index) => _kidsServiceNames[index],
  financeServiceNames: (index) => _financeServiceNames[index],
};
