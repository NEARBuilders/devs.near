const filter = context.accountId && {
  ignore: Social.getr(`${context.accountId}/graph/hide`),
};

return (
  <Widget
    loading={props.loading}
    src="${config_account}/widget/PR.IndexFeed"
    props={{ filter, ...props }}
  />
);
