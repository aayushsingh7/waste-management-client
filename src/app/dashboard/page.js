import Page from "@/components/Page";
import Button from "@/components/ui/Button";
import PageHeader from "@/layouts/PageHeader";
import React from "react";

const page = () => {
  return (
    <Page>
      <PageHeader heading={"Pending Requests"}>
        <Button
          style={{
            padding: "12px 15px",
            background: "var(--active-background)",
            fontSize: "0.75rem",
          }}
        >
          Create New Request
        </Button>
      </PageHeader>
    </Page>
  );
};

export default page;
