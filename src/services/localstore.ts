export const getLinkStore = () => {
  const links = localStorage.getItem("links");
  return links
    ? JSON.parse(links)
    : {
        id: "home",
        previousId: undefined,
      };
};

export const getUserStore = () => {
  const user = localStorage.getItem("user");
  return user
    ? JSON.parse(user)
    : {
        id: null,
      };
};

export const setLinkStore = (id: string, previousId: string) => {
  localStorage.setItem(
    "links",
    JSON.stringify({
      id,
      previousId
    })
  );
};

export const setUserStore = (id: string) => {
  localStorage.setItem(
    "user",
    JSON.stringify({
      id,
    })
  );
};
