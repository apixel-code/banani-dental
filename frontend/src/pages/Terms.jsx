// Terms and Conditions page
import ContentPageLayout from "./ContentPageLayout";
import { termsOfService } from "@/content/legal";

export default function Terms() {
  return <ContentPageLayout {...termsOfService} />;
}
