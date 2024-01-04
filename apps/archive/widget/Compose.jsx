if (!context.accountId) {
  return "";
}

const indexKey = props.indexKey ?? "main";
const draftKey = props.indexKey ?? "draft";
const draft = Storage.privateGet(draftKey); // this should depend on feed key
const groupId = props.groupId;
const postType = props.postType;

if (draft === null) {
  return "";
}

const [initialText] = useState(draft || postType.template);

function generateUID() {
  const maxHex = 0xffffffff;
  const randomNumber = Math.floor(Math.random() * maxHex);
  return randomNumber.toString(16).padStart(8, "0");
}

const composeData = () => {
  const thingId = generateUID();
  const data = {
    update: {
      [thingId]: {
        "": JSON.stringify({
          content: state.content.text || "",
        }),
        metadata: {
          type: postType.type,
        },
      },
    },
    post: {
      main: JSON.stringify({
        type: "md",
        text: `[EMBED](${context.accountId}/${postType.type}/${thingId})`,
      }),
    },
    index: {
      post: JSON.stringify([
        {
          key: indexKey,
          value: {
            type: "md",
          },
        },
        {
          key: postType.type,
          value: {
            type: "md",
          },
        },
      ]),
    },
  };

  const item = {
    type: "social",
    path: `${context.accountId}/post/main`,
  };

  const notifications = state.extractMentionNotifications(
    state.content.text,
    item
  );

  if (notifications.length) {
    data.index.notify = JSON.stringify(
      notifications.length > 1 ? notifications : notifications[0]
    );
  }

  const hashtags = state.extractHashtags(state.content.text);

  if (hashtags.length) {
    data.index.hashtag = JSON.stringify(
      hashtags.map((hashtag) => ({
        key: hashtag,
        value: item,
      }))
    );
  }

  return data;
};

State.init({
  onChange: ({ content }) => {
    State.update({ content });
    Storage.privateSet(draftKey, content.text || "");
  },
});

return (
  <>
    <div style={{ margin: "0 -12px" }}>
      <Widget
        src="mob.near/widget/MainPage.N.Common.Compose"
        props={{
          placeholder: "What's happening?",
          onChange: state.onChange,
          initialText,
          onHelper: ({ extractMentionNotifications, extractHashtags }) => {
            State.update({ extractMentionNotifications, extractHashtags });
          },
          composeButton: (onCompose) => (
            <CommitButton
              disabled={!state.content}
              force
              className="btn btn-primary rounded-5"
              data={composeData}
              onCommit={() => {
                onCompose();
              }}
            >
              Post
            </CommitButton>
          ),
        }}
      />
    </div>
    {state.content && (
      <Widget
        key="post-preview"
        src="mob.near/widget/MainPage.N.Post"
        props={{
          accountId: context.accountId,
          content: state.content,
          blockHeight: "now",
        }}
      />
    )}
  </>
);
