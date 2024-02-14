interface IndexItem {
  accountId: string;
  blockHeight: number;
  action: string;
  key: string;
  value: {
    path?: string;
    type: string;
  };
}

// Define the props for the `Item` component
interface ItemProps {
  accountId: string;
  path?: string;
  blockHeight: number;
  type: string;
}

// Define the type for the `Item` component
type ItemComponent = React.ComponentType<ItemProps>;

// Define the props for the `Layout` component
interface LayoutProps {
  children: React.ReactNode;
}

// Define the type for the `Layout` component
type LayoutComponent = React.ComponentType<LayoutProps>;

// Define the props for the `Feed` component
interface FeedProps {
  index: IndexItem | IndexItem[];
  typeWhitelist?: string[];
  Item?: ItemComponent;
  Layout?: LayoutComponent;
  showCompose?: boolean;
}

const Feed: React.FC<FeedProps> = ({
  index,
  typeWhitelist,
  Item = ({ accountId, path, blockHeight, type }: ItemProps) => <div>{JSON.stringify({ accountId, path, blockHeight, type })}</div>,
  Layout = ({ children }: LayoutProps) => <>{children}</>,
  showCompose,
}) => {
  const renderItem = (a: IndexItem, i: number) => {
    if (typeWhitelist && !typeWhitelist.includes(a.value.type)) {
      return null;
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

  const composeIndex = (): { [key: string]: string } => {
    const arr: IndexItem[] = Array.isArray(index) ? index : [index];

    const grouped = arr.reduce((acc: { [action: string]: any }, i) => {
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

  const appendHashtags = (v: string) => {
    const arr: IndexItem[] = Array.isArray(index) ? index : [index];
    const hashtags = arr.filter((i) => i.action === "hashtag").map((i) => i.key);

    hashtags.forEach((hashtag) => {
      if (v.toLowerCase().includes(`#${hashtag.toLowerCase()}`)) return;
      else v += ` #${hashtag}`;
    });

    return v;
  };

  return (
    <>
      {showCompose && (
        <Widget
          src="devs.near/widget/Compose"
          props={{ index: composeIndex(), appendHashtags }}
        />
      )}
      {Array.isArray(index) ? (
        <Widget
          src="/*__@appAccount__*//widget/PR.MergedIndexFeed"
          props={{
            index,
            renderItem,
            Layout: ({ children }) => <Layout>{children}</Layout>,
          }}
        />
      ) : (
        <Widget
          src="/*__@appAccount__*//widget/PR.FilteredIndexFeed"
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
