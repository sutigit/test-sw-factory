export function VersionTag() {
  return (
    <p className="version-tag" aria-label={`Release ${__APP_RELEASE_TAG__}`}>
      {__APP_RELEASE_TAG__}
    </p>
  );
}
