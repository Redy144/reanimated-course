import { PlaceDetail } from "@/components/content-list/PlaceDetail";
import { withSharedTransitionBoundary } from "@/navigation/withSharedTransitionBoundary";

function PlaceDetailScreen() {
  return <PlaceDetail />;
}

export default withSharedTransitionBoundary(PlaceDetailScreen);
