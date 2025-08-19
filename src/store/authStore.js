import { create } from "zustand";
const useAuthStore=create((set)=>({
    user: JSON.parse(localStorage.getItem("user-info")),

    login:(user)=>set({user:user}),
    logout:()=>set({user:null}),
    setUser:(user)=>set({user})

}))
export default useAuthStore;
// import { create } from "zustand";

// const useAuthStore = create((set) => {
//   let parsedUser = null;
//   try {
//     const stored = localStorage.getItem("user-info");
//     parsedUser = stored && stored !== "undefined" ? JSON.parse(stored) : null;
//   } catch (err) {
//     console.error("Failed to parse user-info from localStorage:", err);
//     parsedUser = null;
//   }

//   return {
//     user: parsedUser,
//     login: (user) => {
//       localStorage.setItem("user-info", JSON.stringify(user));
//       set({ user });
//     },
//     logout: () => {
//       localStorage.removeItem("user-info");
//       set({ user: null });
//     },
//     setUser: (user) => {
//       if (user) {
//         localStorage.setItem("user-info", JSON.stringify(user));
//       } else {
//         localStorage.removeItem("user-info");
//       }
//       set({ user });
//     },
//   };
// });

// export default useAuthStore;