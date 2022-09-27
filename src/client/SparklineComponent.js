/**
 * Created by Looker Data Applications Team 2021
 * These are simplified code snippets representing functionality on the page,
 * to view full implementation click the "Open Sandbox" button below
 */

import React from "react";
import { getSdk } from "../utils/client/looker_sdk";
import { Box, Heading } from "@looker/components";
import { Query } from "@looker/visualizations";
import { Visualization } from "../vis_src/Visualization";

const SparklineComponent = () => {
  console.log("SparklineComponent");
  const sdk = getSdk();

  // const [data, setData] = useState();
  // useEffect(() => {
  //   getTest();
  // }, []);

  // const getTest = async () => {
  //   try {
  //     const rawApiData = await sdk.ok(
  //       sdk.run_query({
  //         query_id: 36946,
  //         result_format: "json"
  //       })
  //     );
  //     formatApiDataForSparkline(rawApiData);
  //   } catch (e) {
  //     console.log({ e });
  //   }
  // };

  // const formatApiDataForSparkline = (rawApiData) => {
  //   console.log({ rawApiData }); //returning null for now
  //   let formattedApiData = rawApiData.map((item, index) => {
  //     return {
  //       [`point${index + 1}`]: [
  //         [item["order_items.created_date"], item["order_items.count"]]
  //       ]
  //     };
  //   });
  //   console.log({ formattedApiData });
  //   setData(formattedApiData);
  // };

  // return (
  //   <Box>
  //     <Heading>Query Visualization Component</Heading>
  //     <QueryContext.Provider
  //       value={{
  //         config: { type: "sparkline" },
  //         ok: true,
  //         loading: false,
  //         data: mockSdkDataResponse,
  //         fields: mockSdkFieldsResponse
  //       }}
  //     >
  //       <Visualization />
  //     </QueryContext.Provider>
  //   </Box>
  // );

  return (
    <Box>
      <Heading>Query Visualization Component</Heading>
      {/* produces ok response 
      but says "Something went wrong." 🤔 */}
      <Query sdk={sdk} query={36946} config={{ type: "sparkline" }}>
        <Visualization />
      </Query>
    </Box>
  );
};
export default SparklineComponent;
