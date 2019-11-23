/**
 * 简单的判断参数是否一致
 * @param {*} prevProps 
 * @param {*} nextProps 
 */
export function areEqual(prevProps, nextProps) {
  /*
  如果把 nextProps 传入 render 方法的返回结果与
  将 prevProps 传入 render 方法的返回结果一致则返回 true，
  否则返回 false
  */
  return JSON.stringify(prevProps) === JSON.stringify(nextProps)
}
