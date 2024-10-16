interface AddressResult {
  address: {
    address_name: string;
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_name: string;
    mountain_yn: string;
    main_address_no: string;
    sub_address_no: string;
  };
  road_address: {
    address_name: string;
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_name: string;
    road_name: string;
    underground_yn: string;
    main_building_no: string;
    sub_building_no: string;
    building_name: string;
    zone_no: string;
  } | null;
  x: string; // longitude
  y: string; // latitude
}

export const getLatAndLon = (address: string): Promise<AddressResult[]> => {
  return new Promise((resolve, reject) => {
    const geocoder = new kakao.maps.services.Geocoder();

    const callback = function (
      result: AddressResult[],
      status: kakao.maps.services.Status
    ) {
      if (status === kakao.maps.services.Status.OK) {
        resolve(result);
      } else {
        reject('에러');
      }
    };

    geocoder.addressSearch(address, callback);
  });
};
