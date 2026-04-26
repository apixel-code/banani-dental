// Privacy Policy page
import ContentPageLayout from "./ContentPageLayout";
import { privacyPolicy } from "@/content/legal";

export default function Privacy() {
  return <ContentPageLayout {...privacyPolicy} />;
}
