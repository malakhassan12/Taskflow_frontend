const getSelectedKeyAdmin = (pathname) => {

  if (pathname === "/admin" || pathname === "/admin/dashboard") return "1";
  if (pathname.includes("/admin/users")) return "2";
  if (pathname.includes("/admin/managers")) return "3"; // طلبات المديرين
  if (pathname.includes("/admin/project-requests")) return "4";
  if (pathname.includes("/admin/settings")) return "5";
  if (pathname.includes("/admin/projects")) return "6"; // كل المشاريع

  return "1"; // Default
};

export default getSelectedKeyAdmin;