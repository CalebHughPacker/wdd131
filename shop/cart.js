export class Cart {
  constructor(products) {
    this.storageKey = 'cart';
    this.products = products;
    this.ids = JSON.parse(localStorage.getItem(this.storageKey)) || [];
  }

  get items() {
    return this.ids
      .map(pid => this.products.find(p => p.id === pid))
      .filter(p => p); 
  }

  get count() {
    return this.ids.length;
  }

  get total() {
    return this.items.reduce((sum, p) => sum + p.price, 0);
  }

  add(product) {
    this.ids.push(product.id);
    this._save();
  }

  remove(productId) {
    this.ids = this.ids.filter(id => id !== productId);
    this._save();
  }

  _save() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.ids));
  }
}