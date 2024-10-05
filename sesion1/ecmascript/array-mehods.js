const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
// Filter
const newArray2 = numbers.filter((value) => {
  return value % 2 === 0;
});

console.log(newArray2);
