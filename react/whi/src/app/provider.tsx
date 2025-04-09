// "use client";

// import { useState } from "react";
// import LoginStateContext from "./context";

// const LoginStateProvider = function ({
//   children,
// }: Readonly<{
//     childen: React.ReactNode; 
// }>) {
//     const [loginState, setLoginState] = useState({ name: '', isLoggedIn: false})

//     return (
//         <>
//     <LoginStateContext.Provider value={{isLoggedIn: loginState.isLoggedIn, name: loginState.name}}> 
//       {children}
//     </LoginStateContext.Provider>
//         </>
//   );
// };

// export { LoginStateProvider };

"use client";
import { useState } from "react";
import LoginStateContext from "./context";

const LoginStateProvider = function ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loginState, setLoginState] = useState(null);

  return (
      <LoginStateContext.Provider value={{ loginState: { name: '', isLoggedIn: false}, setLoginState: () => undefined }}>
        {children}
      </LoginStateContext.Provider>
  );
}

export { LoginStateProvider }