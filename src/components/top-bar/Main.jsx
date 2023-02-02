import {
  Dropdown,
  DropdownContent,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Lucide,
} from "@/base-components";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function Main() {
  const location = useLocation();
  const auth = useAuth();
  const [modal, setModal] = useState(false);

  let user = auth.authUser;

  const handleLogout = () => {
    auth.logout();
  };

  return (
    <>
      {/* BEGIN: Top Bar */}
      <div className="top-bar">
        {/* BEGIN: Breadcrumb */}
        <nav
          aria-label="breadcrumb"
          className="-intro-x mr-auto hidden sm:flex"
        >
          {location.pathname !== "/" && (
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="#">Application</a>
              </li>
              <li
                className="breadcrumb-item active capitalize"
                aria-current="page"
              >
                {location.pathname
                  .replace("/", "")
                  .replace("-", " ")
                  .replace(";", "")}
              </li>
            </ol>
          )}
        </nav>
        {/* END: Breadcrumb */}

        {/* BEGIN: Account Menu */}
        <Dropdown className="intro-x w-8 h-8">
          <DropdownToggle
            tag="div"
            role="button"
            className="justify-center items-center w-10 h-10 bg-gray-100 rounded-full"
          >
            <p className="font-medium text-center justify-center items-center pt-2 ">
              {user?.name
                ? user?.name
                    .split(" ")
                    .map((n) => n[0])
                    .join(".")
                    .toUpperCase()
                : ""}
            </p>
          </DropdownToggle>
          <DropdownMenu className="w-56">
            <DropdownContent className="bg-primary text-white">
              <DropdownHeader tag="div" className="!font-normal">
                <div className="font-medium">{user?.name}</div>
                <div className="text-xs text-white/70 mt-0.5 dark:text-slate-500">
                  {user?.email}
                </div>
              </DropdownHeader>
              <DropdownDivider className="border-white/[0.08]" />

              <DropdownItem className="hover:bg-white/5" onClick={handleLogout}>
                <Lucide icon="ToggleRight" className="w-4 h-4 mr-2" /> Logout
              </DropdownItem>
            </DropdownContent>
          </DropdownMenu>
        </Dropdown>
        {/* END: Account Menu */}
      </div>
      {/* END: Top Bar */}
    </>
  );
}

export default Main;
