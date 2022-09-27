import React, { useEffect } from "react";
import "./app.css";
import EmbeddedDashboard from "./EmbeddedDashboard";
import EmbeddedExplore from "./EmbeddedExplore";
import EmbeddedQuery from "./EmbeddedQuery";
import EmbeddedLook from "./EmbeddedLook";
import ApiRunQuery from "./ApiRunQuery";
import SparklineComponent from "./SparklineComponent";
import DynamicFilters from "./DynamicFilters";
import EmbeddedExtension from "./EmbeddedExtension";
// import QueryComponent from "./QueryComponent";
import Test from "./Test";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
console.log({ SparklineComponent });
const ROUTES = [
  {
    path: "/embedded_dashboard",
    label: "Embedded Dashboard",
    component: EmbeddedDashboard
  },
  {
    path: "/embedded_explore",
    label: "Embedded Explore",
    component: EmbeddedExplore
  },
  {
    path: "/embedded_query",
    label: "Embedded Query",
    component: EmbeddedQuery
  },
  {
    path: "/embedded_look",
    label: "Embedded Look",
    component: EmbeddedLook
  },
  {
    path: "/looker_api_run_query",
    label: "Api Run Query",
    component: ApiRunQuery
  },
  {
    path: "/sparkline_component",
    label: "SparklineComponent",
    component: SparklineComponent
  },
  {
    path: "/dynamic_filters",
    label: "DynamicFilters",
    component: DynamicFilters
  },
  {
    path: "/embedded_extension",
    label: "Embedded Extension",
    component: EmbeddedExtension
  },
  // {
  //   path: "/query_component",
  //   label: "Query Component",
  //   component: QueryComponent
  // },
  { path: "/test", label: "Test", component: Test }
];

function App() {
  return (
    <Router>
      <div>
        <Switch>
          {ROUTES.map(({ path, component }) => {
            const ComponentToUse = component;
            return (
              <Route key={path} path={path}>
                <ComponentToUse />
              </Route>
            );
          })}
          <Route render={() => <Redirect to="/embedded_dashboard" />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
