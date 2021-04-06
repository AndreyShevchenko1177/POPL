export const filterPops = {
  filterPopsByPoplName: (popValue) => {
    const result = popValue.slice(-14);
    return result && result.length === 14 ? result : null;
  },
  filterPoplPops: (popValue) => {
    const values = ["r", "k", "b", "h"];
    return values.includes(popValue[0]);
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
