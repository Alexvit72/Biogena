let products = [
  {
    id: 'id1',
    name: 'Product 1',
    image: 'images/product.webp',
    description: 'description of product 1',
    price: '1 $'
  },
  {
    id: 'id2',
    name: 'Product 2',
    image: 'images/product.webp',
    description: 'description of product 2',
    price: '2 $'
  },
  {
    id: 'id3',
    name: 'Product 3',
    image: 'images/product.webp',
    description: 'description of product 3',
    price: '3 $'
  },
  {
    id: 'id4',
    name: 'Product 4',
    image: 'images/product.webp',
    description: 'description of product 4',
    price: '4 $'
  },
  {
    id: 'id5',
    name: 'Product 5',
    image: 'images/product.webp',
    description: 'description of product 5',
    price: '5 $'
  },
];

function randomElems(arr) {
  let res = [];
  let length = Math.floor(Math.random() * 2) + 1;
  for (let i = 0; i < length; i++) {
    let index =
    res[i] = arr.splice(Math.floor(Math.random() * arr.length), 1)[0];
  }
  return res;
}

export let prodJSON = JSON.stringify(randomElems(products));
