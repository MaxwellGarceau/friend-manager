export const addOrderCurrentProperty = (orderedArray) => {
  return orderedArray.map((item, ind) => {
    item.order.current = ind;
    return item;
  });
}
