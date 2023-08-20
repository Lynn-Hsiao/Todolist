import { createContext, useState } from 'react';

const defaultAuthContext = {
  isAuthenticated: false, // 使用者是否登入的判斷依據，預設為 false，若取得後端的有效憑證，則切換為 true
  currentMember: null, // 當前使用者相關資料，預設為 null，成功登入後就會有使用者資料
  register: null,
  login: null,
  logout: null,
};

const AuthContext = createContext(defaultAuthContext);

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [payload, setPayload] = useState(null);

  return (
    <AuthContext.Provider>
      value=
      {{
        isAuthenticated,
        currentMember: payload,
        register: async (data) => {
          const { success, authToken } = await register({
            username: data.username,
            email: data.email,
            password: data.password,
          });
        },
      }}
    </AuthContext.Provider>
  );
};
