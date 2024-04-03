const Feed = ({
  index,
  items,
  typeWhitelist,
  Item,
  Layout,
  showCompose,
  perPage,
}) => {
  Item = Item || ((props) => <div>{JSON.stringify(props)}</div>);
  Layout = Layout || (({ children }) => children);

  const renderItem = (a, i) => {
    if (typeWhitelist && !typeWhitelist.includes(a.value.type)) {
      return false;
    }
    return (
      <div key={JSON.stringify(a)}>
        <Item {...a} />
      </div>
    );
  };

  const composeIndex = () => {
    const arr = Array.isArray(index) ? index : [index];

    const grouped = arr.reduce((acc, i) => {
      if (i.action !== "repost") {
        if (!acc[i.action]) {
          acc[i.action] = [];
        }
        acc[i.action].push({ key: i.key, value: { type: "md" } });
      }
      return acc;
    }, {});

    Object.keys(grouped).forEach((action) => {
      if (grouped[action].length === 1) {
        grouped[action] = grouped[action][0];
      }
      grouped[action] = JSON.stringify(grouped[action]);
    });

    return grouped;
  };

  const appendHashtags = (v) => {
    const arr = Array.isArray(index) ? index : [index];
    const hashtags = arr
      .filter((i) => i.action === "hashtag")
      .map((i) => i.key);

    hashtags.forEach((hashtag) => {
      if (v.toLowerCase().includes(`#${hashtag.toLowerCase()}`)) return;
      else v += ` #${hashtag}`;
    });

    return v;
  };

  if (items) {
    return (
      <Widget
        src="${config_account}/widget/PR.ItemFeed"
        props={{
          items,
          renderItem,
          perPage: perPage,
          Layout: ({ children }) => <Layout>{children}</Layout>,
        }}
      />
    );
  }

  return (
    <>
      {showCompose && (
        <Widget
          src="${config_account}/widget/Compose"
          props={{ index: composeIndex(), appendHashtags }}
        />
      )}
      {Array.isArray(index) ? (
        <Widget
          src="${config_account}/widget/PR.MergedIndexFeed"
          props={{
            index,
            renderItem,
            Layout: ({ children }) => <Layout>{children}</Layout>,
          }}
        />
      ) : (
        <Widget
          src="${config_account}/widget/PR.FilteredIndexFeed"
          props={{
            index,
            renderItem,
            Layout: ({ children }) => <Layout>{children}</Layout>,
          }}
        />
      )}
    </>
  );
};

return { Feed };
