// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import "./styles/base.css";
import "./styles/app.scss";
import App from "./App.svelte";

const app = new App({
  target: document.getElementById("app"),
});

export default app;
