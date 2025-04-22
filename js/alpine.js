document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      { id: 1, name: "bayam", img: "bayam.jpeg", price: 1000 },
      { id: 2, name: "bayam hidroponik", img: "bayam(h).jpeg", price: 2000 },
      { id: 3, name: "brokoli ", img: "brokoli.jpeg", price: 7000 },
      { id: 4, name: "kangkung", img: "kangkung.jpeg", price: 5000 },
      { id: 5, name: "sawi", img: "sawi.jpeg", price: 2000 },
      { id: 6, name: "selada", img: "selada.jpeg", price: 3000 },
      { id: 7, name: "sawi hidroponik", img: "sawi(h).jpeg", price: 5000 },
      { id: 8, name: " pakcoy", img: "sawi2.jpg", price: 3000 },
      { id: 9, name: "selad", img: "selada.jpeg", price: 3000 },
      { id: 10, name: "selada hidroponik", img: "selada(h).jpeg", price: 2000 },
    ],

    //  func untuk search produk

    filterProducts() {
      if (!this.searchItems) {
        return this.items;
      }
      const searchProducts = this.search.toLowerCase();
      return this.items.filter((product) => product.name.toLowerCase().includes(searchProducts));
    },

    // searchKeywords: "",
    // filterProducts: [],
    // init() {
    //   this.filterProducts = [...this.items];
    // },
    // searchProducts() {
    //   this.filterProducts = this.items.filter((item) => item.name.toLowerCase().includes(this.searchKeywords.toLowerCase));
    // },

    // fungsi untuk menampilkan modal

    selectedProduct: null,
    openModal(product) {
      this.selectedProduct = product;
    },
    closeModal() {
      this.selectedProduct = null;
    },
  })),
    Alpine.store("cart", {
      items: [],
      total: 0,
      quantity: 0,
      add(newitem) {
        // buat item baru
        const chartItem = this.items.find((item) => item.id === newitem.id);
        // cek item sudah ada atau belum
        if (!chartItem) {
          // jika belum ada, push ke cart
          this.items.push({ ...newitem, quantity: 1, total: newitem.price });
          // update total dan quantity
          this.quantity++;
          //  update total harga
          this.total += newitem.price;
          // periksa jika ada item lain yang sama
        } else {
          //
          this.items = this.items.map((item) => {
            if (item.id !== newitem.id) {
              return item;
              // namun item yang sama, update quantity dan total harga
            } else {
              item.quantity++;
              item.total = item.quantity * item.price;
              this.quantity++;
              this.total += item.price;
              return item;
            }
          });
        }
      },
      remove(id) {
        const chartItem = this.items.find((item) => item.id === id);
        // jika item ada di cart
        if (chartItem.quantity > 1) {
          this.items = this.items.map((item) => {
            if (item.id !== id) {
              return item;
            } else {
              item.quantity--;
              item.total = item.quantity * item.price;
              this.quantity--;
              this.total -= item.price;
              return item;
            }
          });
        } else if (chartItem.quantity === 1) {
          this.items = this.items.filter((item) => item.id !== id);
          this.quantity--;
          this.total -= chartItem.price;
        }
      },
    });
});

const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
