import { defineStore } from 'pinia'
const { VITE_URL, VITE_PATH } = import.meta.env


export default defineStore('cart', {
    state: () => ({
        carts: {}  // 購物車中的所有品項
    }),

    actions: {
        // 加入購物車
        addToCart(id, qty = 1) {
            // console.log(id,qty) //點擊的產品的 id & 數量(隨點擊次數增加)

            const data = {
                "product_id": id,
                qty
            }

            this.$http.post(`${VITE_URL}v2/api/${VITE_PATH}/cart`, { data })
                .then((res) => {
                    console.log('加入購物車', res.data);
                    this.getCarts();
                })
                .catch((err) => {
                    console.log(err)
                })

        },

        // 取得當前購物車中的所有品項
        getCarts() {
            this.$http.get(`${VITE_URL}v2/api/${VITE_PATH}/cart`)
                .then((res) => {
                    console.log('當前購物車中品項', res.data.data.carts)
                    this.carts = res.data.data.carts // 取得當前購物車中的所有品項
                })
                .catch((err) => {
                    console.log(err)
                })

        }
    },

    getters: {

    }

})