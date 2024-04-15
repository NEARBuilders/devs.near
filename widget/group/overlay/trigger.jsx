return (
  <Widget
    loading={props.children}
    src="${alias_mob}/widget/N.Common.OverlayTrigger"
    props={{
      popup: (
        <Widget
          src="${alias_mob}/widget/group.overlay"
          props={{ groupId: props.groupId, accountId: props.accountId }}
        />
      ),
      ...props,
    }}
  />
);