import { v4 as uuidv4 } from 'uuid';

const id = () => {
  let date = Date.now();
  let result = 0;
  for (let i = 0; i < 7; i++) {
    const digit = date % 10;
    result += digit * 10 ** i;
    date = Math.floor(date / 10);
  }
  return result;
};

export const newProduct = () => {
  return {
    id: id(),
    product_name: uuidv4(),
    price: Math.floor(Math.random() * 101) + 0.99,
    stock: Math.floor(Math.random() * 101),
  };
};

export const newCategory = () => {
  return {
    id: id(),
    category_name: uuidv4(),
  };
};

export const newTag = () => {
  return {
    id: id(),
    tag_name: uuidv4(),
  };
};
