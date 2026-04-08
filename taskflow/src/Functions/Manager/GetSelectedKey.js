const getSelectedKey = (pathname) => {
    console.log(pathname)

  if (pathname === "/manager") return "1";
  if (pathname.includes("/manager/teams")) return "2";
  if (pathname.includes("/manager/settings")) return "3";
  if (pathname.includes("/manager/projects/create-project")) return "5";
  if (pathname.includes("/manager/projects")) return "4";
  return "1";
};

export default getSelectedKey;
