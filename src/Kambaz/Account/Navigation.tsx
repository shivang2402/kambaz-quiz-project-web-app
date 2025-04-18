// import { useSelector } from "react-redux";
// import { NavLink } from "react-router-dom";

// export default function AccountNavigation() {
//   const { currentUser } = useSelector((state: any) => state.accountReducer);
//   const links = currentUser ? ["Profile"] : ["Signin", "Signup"];

//   return (
//     <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
//       {links.map((link) => (
//         <NavLink
//           key={link}
//           className={({ isActive }) =>
//             `list-group-item border border-0 ${
//               isActive ? "active text-black" : "text-danger"
//             }`
//           }
//           to={`/Kambaz/Account/${link}`}
//         >
//           {link}
//         </NavLink>
//       ))}
//     </div>
//   );
// }


import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  // Determine links based on login status and role
  let links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  if (currentUser?.role === "ADMIN") {
    links.push("Users"); // add Users link for ADMIN role
  }

  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => (
        <NavLink
          key={link}
          className={({ isActive }) =>
            `list-group-item border border-0 ${
              isActive ? "active text-black" : "text-danger"
            }`
          }
          to={`/Kambaz/Account/${link}`}
        >
          {link}
        </NavLink>
      ))}
    </div>
  );
}
