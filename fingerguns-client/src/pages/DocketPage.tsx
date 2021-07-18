import React from "react";
import { useParams } from "react-router-dom";

import useDocket, { DocketContext } from "hooks/useDocket";

import SidebarLayout from "layouts/PageLayouts/SidebarLayout";
import DocketSidebar from "components/Movies/Docket/DocketSidebar";
import Docket from "components/Movies/Docket";

function DocketPage() {
  const { docketId } = useParams<{ docketId: string }>();
  const docketContextValue = useDocket(+docketId);

  return (
    <DocketContext.Provider value={docketContextValue}>
      <div className="docket-page">
        <SidebarLayout
          sidebarComponent={<DocketSidebar />}
          mainComponent={<Docket />}
        ></SidebarLayout>
      </div>
    </DocketContext.Provider>
  );
}

export default DocketPage;
