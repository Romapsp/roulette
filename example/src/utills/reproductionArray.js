const reproductionArray = (array = [], times = 1) => {
  return array.flatMap((item) => Array(times).fill(item));
};


export default reproductionArray;
