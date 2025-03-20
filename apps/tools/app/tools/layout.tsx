import { PageLayout } from "@blog/common/layouts/BaseLayout";
import type React from "react";


export default ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => <PageLayout zone>{children}</PageLayout>;
