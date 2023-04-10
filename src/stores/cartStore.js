import { defineStore } from 'pinia'
const { VITE_URL, VITE_PATH } = import.meta.env
import axios from 'axios'

export default defineStore('cart', {
    state: () => {
        return{
            carts: {},  // 購物車中的所有品項
            final_total:0 //購物車中所有品項的總金額
        }
        
        
    },

    actions: {
        // 加入購物車
        addToCart(id, qty = 1) {
            // console.log(id,qty) //點擊的產品的 id & 數量(隨點擊次數增加)

            const data = {
                "product_id": id,
                qty
            }

            axios.post(`${VITE_URL}v2/api/${VITE_PATH}/cart`, { data })
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
            axios.get(`${VITE_URL}v2/api/${VITE_PATH}/cart`)
                .then((res) => {
                    // console.log('最外層資料', res.data.data.final_total) //可看到所有商品總金額
                    console.log('當前購物車中品項', res.data.data.carts)
                    
                    this.carts = res.data.data.carts // 取得當前購物車中的所有品項
                    this.final_total=res.data.data.final_total
                    // 取得當前購物車中所有品項的總金額
                })
                .catch((err) => {
                    console.log(err)
                })

        }
    },

    getters: {

    }

})