export const filterPops = {
  slicePoplNameFromPop: (popValue) => {
    const result = popValue.slice(-14);
    return result && result.length === 14 ? result : null;
  },
  filterPoplPops: (popValue) => {
    // console.log(popValue[0]);
    const values = ["r", "k", "b", "h"];
    if (values.includes(popValue[0])) return true;
    // for pops that have popl. popl name has length of 14 characters
    if (popValue.length > 14) {
      return filterPops.slicePoplNameFromPop(popValue) === "xl";
    }
    // if no popl popValue should be equal "xl"
    return popValue === "xl";
  },
  filterQrCodePops: (popValue) => {
    const values = ["q", "a"];
    return values.includes(popValue[0]);
  },
  filterWalletPops: (popValue) => {
    const values = ["w"];
    return values.includes(popValue[0]);
  },
};
