import { createActions, handleActions } from 'redux-actions';
import url from 'api_url/index.js';
const defaultState = {};

export const { orders } = createActions('orders');

export const ordersAction = data => (dispatch, getState) => {
  let allState = getState();
  let PostData = {};
  PostData.token = allState.userInfo.token;
  PostData.type = data.type; //{ bounty: "打赏", live: "购买直播", video: "购买录播", course: "购买课程", "meeting": "购买会议" }
  PostData.id = data.id;
  PostData.pay_way = data.pay_way ? data.pay_way : ''; //支付方式 {wechat_qr_pay: "微信扫码支付", wechat_pay: "微信公众号支付", alipay: "支付宝网站支付", alipay_wap: "支付宝手机支付" }
  PostData.amount = data.amount ? data.amount : '';
  window.HOCFetch({ needToken: true })(url.orders, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(PostData)
  })
    .then(response => response.json())
    .then(ordersData => {
      console.log(ordersData, 'ordersData');
      if (ordersData.status === 'success') {
        data.callBack(ordersData.data);
      }
    });
};

//=========================================

export const reducer = handleActions(
  {
    orders: (state, action) => ({
      ...state,
      ...action
    })
  },
  defaultState
);
