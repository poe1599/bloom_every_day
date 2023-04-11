import { defineStore } from 'pinia'
const { VITE_URL, VITE_PATH } = import.meta.env
import axios from 'axios'

export default defineStore('cart', {
    state: () => {
        return {
            carts: {},  // 購物車中的所有品項
            final_total: 0, //購物車中所有品項的總金額

        }


    },

    actions: {
        // 加入購物車
        addToCart(id, qty = 1) {
            // console.log(id,qty) //點擊的產品的 id & 數量(隨點擊次數增加)
           
            const data = {
                "product_id": id,
                "qty":qty  // api 中的 qty 數量
            }


            axios.post(`${VITE_URL}v2/api/${VITE_PATH}/cart`, { data })
                .then((res) => {
                    console.log('加入購物車', res.data);
                    this.getCarts();
                    // 更新後再重新取得購物車內品項資訊
                })
                .catch((err) => {
                    console.log(err)
                })


        },

        // 取得當前購物車中的所有品項
        getCarts() {
            axios.get(`${VITE_URL}v2/api/${VITE_PATH}/cart`)
                .then((res) => {
                    // console.log('最外層資料', res.data.data) //可看到所有商品總金額
                    console.log('當前購物車中品項', res.data.data)


                    this.carts = res.data.data.carts // 取得當前購物車中的所有品項
                    this.final_total = res.data.data.final_total
                    // 取得當前購物車中所有品項的總金額
                })
                .catch((err) => {
                    console.log(err)
                })

        },

        // 調整購物車頁面 select 數量
        updateCartItem(item){
            console.log('item 數量',item.qty) // 顯示 select 選的數值

            const data = {
                product_id: item.product.id, // 產品的 id
                qty: item.qty,
            }

            // console.log('data, 購物車品項 id', data, item.id)

            axios.put(`${VITE_URL}/v2/api/${VITE_PATH}/cart/${item.id}`,{data})
            // api 要輸入購物車品項的 id
            .then((res)=>{
                // 取得更新後的數量並更新 carts 的資料
                console.log('更新購物車', res.data);
                this.getCarts();
            })
            .catch((err)=>{
                console.log(err)
            })

        },

        // 刪除購物車品項
        deleteCartItem(item){
            axios.delete(`${VITE_URL}/v2/api/${VITE_PATH}/cart/${item.id}`)
            .then((res)=>{
                console.log('刪除購物車品項', res)
                this.getCarts();
            })
            .catch((err)=>{
                console.log(err)
            })

        }
    },

    getters: {

    }

})