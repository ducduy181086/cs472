"use strict";

var data = [];
export function get_items() {
  return data;
}
export function add_item(new_item) {
  // add item (if id does not exist)
  // return true if item is added successfully, false otherwise
  const oldItem = data.find(c => c.ID === new_item.ID);
  if (oldItem) return false;
  data.push(new_item);
  return true;
}
export function update_item_title_by_id(id, new_title) {
  // update the title (if id exist)
  // return true if item is update successfully, false otherwise
  const oldItem = data.find(c => c.ID === id);
  if (oldItem) {
    oldItem.title = new_title;
    return true;
  }

  return false;
}
export function delete_item_by_id(id) {
  // delete the item (if id exist)
  // return true if item is deleted successfully, false otherwise
  const itemIndex = data.findIndex(c => c.ID === id);
  if (itemIndex >= 0) {
    data.splice(itemIndex, 1);
    return true;
  }

  return false;
}
export function get_item_title_by_id(id) {
  // return the item title by id (if id exist)
  const oldItem = data.find(c => c.ID === id);
  if (oldItem) {
    return oldItem.title;
  }

  return null;
}
