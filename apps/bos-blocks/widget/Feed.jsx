const Feed = ({ index, typeWhitelist, Item, Layout }) => {
  Item = Item || ((props) => <div>{JSON.stringify(props)}</div>);
  Layout = Layout || (({ children }) => children);

  const renderItem = (a, i) => {
    if (typeWhitelist && !typeWhitelist.includes(a.value.type)) {
      // this can be "md", or a layer deeper (everything is md)
      return false;
    }
    return (
      <div key={JSON.stringify(a)}>
        <Item
          accountId={a.accountId}
          path={a.value.path}
          blockHeight={a.blockHeight}
          type={a.value.type}
        />
      </div>
    );
  };

  if (Array.isArray(index)) {
    return (
      <Widget
        src="devs.near/widget/PR.MergedIndexFeed"
        props={{
          index,
          renderItem,
          Layout: ({ children }) => <Layout>{children}</Layout>,
        }}
      />
    );
  } else {
    return (
      <Widget
        src="devs.near/widget/PR.FilteredIndexFeed"
        props={{
          index,
          renderItem,
          Layout: ({ children }) => <Layout>{children}</Layout>,
        }}
      />
    );
  }
};

return { Feed };
