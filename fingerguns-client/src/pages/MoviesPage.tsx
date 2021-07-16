import React from "react";

import Docket from "components/Movies/Docket";
import SidebarLayout from "layouts/PageLayouts/SidebarLayout";
import DocketSidebar from "components/Movies/Docket/DocketSidebar";

function MoviesPage() {
  return (
    // TODO: move docket to its own page
    <div className="movies-page">
      <SidebarLayout
        sidebarComponent={<DocketSidebar />}
        mainComponent={<Docket />}
      ></SidebarLayout>
    </div>
  );
}

export default MoviesPage;
