import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { ResponseUserLogin} from '@/API/API_Types/User';

export const useUserStore = defineStore('user', () => {
  const token = ref<ResponseUserLogin | undefined>();
  const setToken = (value: ResponseUserLogin) => {
    token.value = value;
    localStorage.setItem('token', JSON.stringify(value));
  }
  const isLogin = () => {
    return token.value !== undefined;
  }
  const logOut = () => {
    clearToken();
  }
  const clearToken = () => {
    token.value = undefined;
    localStorage.removeItem('token');
  }
  const loadUserInfoFromBrowser = () => {
    const storedInfo = localStorage.getItem('token');
    if (storedInfo) {
      token.value = JSON.parse(storedInfo);
    }
  };
  loadUserInfoFromBrowser();
  return {
    token,
    setToken,
    clearToken,
    isLogin,
    logOut,
  };
});

/** 用户相关信息存储器类型接口 */
export interface UserStore {
  token: ResponseUserLogin | undefined;
  setToken: (val: ResponseUserLogin) => void;
  clearToken: () => void;
  isLogin: () => Boolean;
  logOut: () => void;
}

// 导出时使用 useUserStore，这是 Pinia 的推荐做法  
export default useUserStore;