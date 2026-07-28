import { ContentList } from "@/components/content-list/ContentList";
import { withSharedTransitionBoundary } from "@/navigation/withSharedTransitionBoundary";

function ListScreen() {
  return <ContentList />;
}

export default withSharedTransitionBoundary(ListScreen);
