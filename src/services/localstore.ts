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

export const setLinkStore = (id: string) => {
  localStorage.setItem(
    "links",
    JSON.stringify({
      id,
      previousId: getLinkStore().id,
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
