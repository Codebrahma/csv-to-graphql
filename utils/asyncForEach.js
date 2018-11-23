const asyncForEach = async (array, action) => {
  let results = [];
  for (let index = 0; index < array.length; index ++) {
    const temp = await action(array[index], index, array);
    results.push(temp);
  }
  return results;
}

module.exports = asyncForEach;
