const path = require("path");
const fs = require("fs");

const resolve = (dir) => {
  return path.resolve(__dirname, dir);
};

/**
 * 获取目录下的文件名
 * @param dir:相对当前文件的目录路径
 * @param prefix:需要添加的文件名前缀
 * @return res:目录下文件名数组
 */
const getFile = (dir, prefix = "") => {
  try {
    const path = resolve(dir);
    const res = [];
    const files = fs.readdirSync(path);
    files.sort((pre, cur) => {
      return pre.split(".")[0] - cur.split(".")[0];
    });
    for (const file of files) {
      if (file) {
        const n = file.length;
        const fileName = file.slice(0, n - 3);
        if (fileName === "README") {
          res.unshift(prefix);
        } else {
          res.push(prefix + fileName);
        }
      }
    }
    return res;
  } catch (error) {
    console.log(error);
  }
};

/**
 * 快速排序
 * @param start:排序开始位置
 * @param end:排序结束位置
 * @return arr:返回排序后的数组
 */
function quickSort(start = 0, end = arr.length, arr) {
  if (end <= start) return;

  const target = arr[start];
  let left = start;
  let right = end;

  while (left < right) {
    while (left < right && arr[right] >= target) {
      right--;
    }
    arr[left] = arr[right];
    while (left < right && arr[left] <= target) {
      left++;
    }
    arr[right] = arr[left];
  }
  arr[left] = target;
  quickSort(start, left - 1, arr);
  quickSort(left + 1, end, arr);
  return arr;
}

module.exports = { getFile, quickSort };
