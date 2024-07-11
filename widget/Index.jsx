const { Layout } = VM.require("devs.near/widget/Layout") || {
  Layout: () => <>layout not found</>,
};

const { Router } = VM.require("devs.near/widget/Router") || {
  Router: () => <>router not found</>,
};

const data = Social.index("post", "main", { order: "desc", limit: 1 });

const { accountId, blockHeight } = data && data.length && data[0];

// const item = {
//   path: `${accountId}/post/main`,
//   blockHeight: blockHeight,
//   type: "social",
// };

// const item = {
//   path: `mob.near/post/main`,
//   blockHeight: "81101335",
//   type: "social",
// };

const item = {
  path: "efiz.near/thing/core",
};

const CSS = styled.div`
    width: 100%,
    height: 100vh;
`;

const Header = () => <div style={{ border: "solid" }}>header</div>;

const Footer = () => <>built by everyone :)</>;

const Sidebar = () => <>sidebar</>;

const Content = () => (
  <Layout blocks={{ Header, Footer }}>
    <div style={{ height: "60vh" }}>
      "mob.near/post/main@81101335" // this is a very personal thing...
      <p>{JSON.stringify(data)}</p> 
      <Router
        config={{
          param: "page",
          routes: {
            home: {
              path: "every.near/widget/every.thing.view",
              init: item,
            },
            home: {
              path: "devs.near/widget/Library",
              init: item,
            },
          },
        }}
          page={"home"}
      />
    </div>
  </Layout>
);

return (
  <CSS>
    <Layout variant="sidebar" blocks={{ Sidebar, Header, Footer }}>
      <Content />
    </Layout>
  </CSS>
);
