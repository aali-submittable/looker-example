/*

 MIT License

 Copyright (c) 2021 Looker Data Sciences, Inc.

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.

 */
import React, { useContext } from "react";
import {
  ProgressCircular,
  Space,
  ComponentsProvider
} from "@looker/components";
import { ThemeContext } from "styled-components";
import { Table } from "@looker/visualizations-table";
import {
  Area,
  Bar,
  Column,
  Line,
  Scatter,
  Sparkline
} from "@looker/visualizations-visx";
// import { Sparkline } from './Sparkline'
import { SingleValue } from "@looker/visualizations-single-value";
import {
  buildChartConfig,
  Debug,
  QueryContext,
  ErrorBoundary,
  Unsupported,
  tabularResponse
} from "@looker/visualizations-adapters";

import has from "lodash/has";

export const defaultChartComponent = {
  area: Area,
  bar: Bar,
  column: Column,
  default: Table,
  line: Line,
  pie: Unsupported,
  scatter: Scatter,
  single_value: SingleValue,
  sparkline: Sparkline,
  table: Table
};

const VisualizationComponent = ({
  debug,
  height,
  width,
  config: configProp
}) => {
  const {
    ok,
    data = [],
    error,
    fields,
    config: rawConfig = {},
    loading
  } = useContext(QueryContext);

  const rawConfigWithOverrides = { ...rawConfig, ...configProp };

  if (loading) {
    return (
      <Space justifyContent="center" p="small">
        <ProgressCircular />
      </Space>
    );
  }

  if (debug || ok === false) {
    return (
      <Debug
        ok={ok}
        config={rawConfigWithOverrides}
        data={data}
        fields={fields}
        error={error}
      />
    );
  } else if (rawConfigWithOverrides && fields) {
    const config = buildChartConfig(rawConfigWithOverrides, fields);

    // immutably copy data to prevent mutations from bleeding into the rest of the system
    const dataCopy = tabularResponse(Array.from(data));

    if (has(config, "x_axis") && dataCopy.length) {
      // const xAxis = config.x_axis.[0];

      if (xAxis.reversed) {
        dataCopy.reverse();
      }
    }

    const ChartComponent = defaultChartComponent[config.type];
    return (
      <ChartComponent
        data={dataCopy}
        config={config}
        fields={fields}
        width={width}
        height={height}
      />
    );
  } else {
    return null;
  }
};

export const Visualization = (props) => {
  const contextValues = useContext(QueryContext);

  const theme = useContext(ThemeContext);

  if (!theme) {
    // Recursively wrap QueryFormatter in ComponentsProvider to ensure that
    // visualizations and adapters can be rendered outside of Looker Components context
    // without breaking.
    return (
      <ComponentsProvider>
        <Visualization {...props} />
      </ComponentsProvider>
    );
  }

  return (
    <ErrorBoundary contextValues={contextValues}>
      <VisualizationComponent {...props} />
    </ErrorBoundary>
  );
};
