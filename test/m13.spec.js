import { describe, it } from 'mocha';
import { expect } from 'chai';

import { api } from '../utils/api.js';
import { newCategory, newProduct, newTag } from '../utils/helpers.js';

// this assignment starter code includes a seed file
describe('M13 E Commerce Backend', function () {
  /**
   * Products
   */
  describe('Product routes', function () {
    describe('GET /api/products', function () {
      it('gets all products', async function () {
        const { data } = await api.m13.products.getAll();
        expect(data, "get all products didn't return an array").to.be.an('array');

        if (data.length > 0) {
          const [product] = data;
          expect(product, 'missing key(s)').to.include.all.keys(
            'id',
            'product_name',
            'price',
            'stock',
          );
        }
      });

      it('includes category & tag data', async function () {
        const { data } = await api.m13.products.getAll();
        expect(data, "get all products didn't return an array").to.be.an('array');

        if (data.length > 0) {
          const [product] = data;
          expect(product, 'missing category or tag').to.include.all.keys('category', 'tags');
        }
      });
    });

    describe('GET /api/products/:id', function () {
      it('gets one product by id', async function () {
        const { data: postProduct } = await api.m13.products.post(newProduct());
        const { data: getProduct } = await api.m13.products.getOne(postProduct.id);
        expect(getProduct).to.be.an('object').that.includes(postProduct);
      });

      it('includes category & tag data', async function () {
        const { data: postProduct } = await api.m13.products.post(newProduct());
        const { data: getProduct } = await api.m13.products.getOne(postProduct.id);
        expect(getProduct, 'missing category or tag').to.include.all.keys('category', 'tags');
      });
    });

    // ***defined in starter code***
    describe('POST /api/products', function () {
      it('creates a product', async function () {
        const product = newProduct();
        const { data } = await api.m13.products.post(product);
        expect(data).to.be.an('object').that.includes(product);
      });
    });

    // ***defined in starter code***
    describe('PUT  /api/products/:id', function () {
      it('updates a product', async function () {
        const { data: postProduct } = await api.m13.products.post(newProduct());
        const update = {
          product_name: `SOLD OUT - ${postProduct.product_name}`,
          price: Math.floor(Math.random() * 101) + 0.99,
          stock: Math.floor(Math.random() * 101),
        };
        const { data: putProduct } = await api.m13.products.put(postProduct.id, update);

        if (Array.isArray(putProduct)) {
          expect(putProduct).to.include(1);
        }

        const { data: getProduct } = await api.m13.products.getOne(postProduct.id);
        if (getProduct) {
          expect(getProduct).to.be.an('object').that.includes(update);
        }
      });
    });

    describe('DELETE /api/products/:id', function () {
      it('removes a product', async function () {
        const { data: postProduct } = await api.m13.products.post(newProduct());
        const { data: deleteResult } = await api.m13.products.delete(postProduct.id);

        // sequelize destroy query returns number of deleted rows
        expect(deleteResult).to.equal(1);
      });
    });
  });

  /**
   * Categories
   */
  describe('Category routes', function () {
    describe('GET /api/categories', function () {
      it('gets all categories', async function () {
        const { data } = await api.m13.categories.getAll();
        expect(data, "get all categories didn't return an array").to.be.an('array');
        if (data.length > 0) {
          const [category] = data;
          expect(category, 'missing keys').to.include.all.keys('id', 'category_name');
        }
      });

      it('includes associated products', async function () {
        const { data } = await api.m13.categories.getAll();
        expect(data, "get all categories didn't return an array").to.be.an('array');
        if (data.length > 0) {
          const [category] = data;
          expect(category, 'missing products key').to.include.all.keys('products');
        }
      });
    });

    describe('GET /api/categories/:id', function () {
      it('gets one category by id', async function () {
        const { data: postCategory } = await api.m13.categories.post(newCategory());
        const { data: getCategory } = await api.m13.categories.getOne(postCategory.id);
        expect(getCategory).to.be.an('object').that.includes(postCategory);
      });

      it('includes associated products', async function () {
        const { data: postCategory } = await api.m13.categories.post(newCategory());
        const { data: getCategory } = await api.m13.categories.getOne(postCategory.id);
        expect(getCategory, ' missing products key').to.include.all.keys('products');
      });
    });

    describe('POST  /api/categories', function () {
      it('creates a category', async function () {
        const category = newCategory();
        const { data } = await api.m13.categories.post(category);
        expect(data).to.be.an('object').that.includes(category);
      });
    });

    describe('PUT  /api/categories/:id', function () {
      it('updates a category', async function () {
        const { data: postCategory } = await api.m13.categories.post(newCategory());
        const update = {
          category_name: `UPDATED - ${postCategory.category_name}`,
        };
        const { data: putCategory } = await api.m13.categories.put(postCategory.id, update);

        if (Array.isArray(putCategory)) {
          expect(putCategory).to.include(1);
        }

        const { data: getCategory } = await api.m13.categories.getOne(postCategory.id);
        if (getCategory) {
          expect(getCategory).to.be.an('object').that.includes(update);
        }
      });
    });

    describe('DELETE /api/categories/:id', function () {
      it('removes a category', async function () {
        const { data: postCategory } = await api.m13.categories.post(newCategory());
        const { data: deleteResult } = await api.m13.categories.delete(postCategory.id);

        // sequelize destroy query returns number of deleted rows
        expect(deleteResult).to.equal(1);
      });
    });
  });

  /**
   * Tags
   */
  describe('Tag routes', function () {
    describe('GET /api/tags', function () {
      it('gets all tags', async function () {
        const { data } = await api.m13.tags.getAll();
        expect(data, "get all tags didn't return an array").to.be.an('array');
        if (data.length > 0) {
          const [tag] = data;
          expect(tag, 'missing keys').to.include.all.keys('id', 'tag_name');
        }
      });

      it('includes associated products', async function () {
        const { data } = await api.m13.tags.getAll();
        expect(data, "get all tags didn't return an array").to.be.an('array');
        if (data.length > 0) {
          const [tag] = data;
          expect(tag, 'missing products key').to.include.all.keys('products');
        }
      });
    });

    describe('GET /api/tags/:id', function () {
      it('gets one tag by id', async function () {
        const { data: postTag } = await api.m13.tags.post(newTag());
        const { data: getTag } = await api.m13.tags.getOne(postTag.id);
        expect(getTag).to.be.an('object').that.includes(postTag);
      });

      it('includes associated products', async function () {
        const { data: postTag } = await api.m13.tags.post(newTag());
        const { data: getTag } = await api.m13.tags.getOne(postTag.id);
        expect(getTag, ' missing products key').to.include.all.keys('products');
      });
    });

    describe('POST  /api/tags', function () {
      it('creates a tag', async function () {
        const tag = newTag();
        const { data } = await api.m13.tags.post(tag);
        expect(data).to.be.an('object').that.includes(tag);
      });
    });

    describe('PUT  /api/tags/:id', function () {
      it('updates a tag', async function () {
        const { data: postTag } = await api.m13.tags.post(newTag());
        const update = {
          tag_name: `UPDATED - ${postTag.tag_name}`,
        };
        const { data: putTag } = await api.m13.tags.put(postTag.id, update);

        if (Array.isArray(putTag)) {
          expect(putTag).to.include(1);
        }

        const { data: getTag } = await api.m13.tags.getOne(postTag.id);
        if (getTag) {
          expect(getTag).to.be.an('object').that.includes(update);
        }
      });
    });

    describe('DELETE /api/tags/:id', function () {
      it('removes a tag', async function () {
        const { data: postTag } = await api.m13.tags.post(newTag());
        const { data: deleteResult } = await api.m13.tags.delete(postTag.id);

        // sequelize destroy query returns number of deleted rows
        expect(deleteResult).to.equal(1);
      });
    });
  });
});
