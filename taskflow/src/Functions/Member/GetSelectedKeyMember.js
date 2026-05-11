const GetSelectedKeyMember = (pathname) => {
  console.log(pathname);

  if (pathname === "/member") return "1";
  if (pathname.includes("/member/view-requests")) return "2";
  if (pathname.includes("/member/settings")) return "3";

  return "1";
};

export default GetSelectedKeyMember;