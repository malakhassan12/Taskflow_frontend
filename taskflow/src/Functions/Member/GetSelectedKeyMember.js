const GetSelectedKeyMember = (pathname) => {
  console.log(pathname);

  if (pathname === "/member") return "1";
  if (pathname.includes("/member/view-requests")) return "3";
  if (pathname.includes("/member/settings")) return "2";

  return "1";
};

export default GetSelectedKeyMember;