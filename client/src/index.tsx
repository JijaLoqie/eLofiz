import React from "react";
import ReactDOM from "react-dom/client";
import { ensureElement } from "@/shared/utils";
import { AppEntry } from "@/app/appEntry.tsx";



const modalEditRoot = ReactDOM.createRoot(ensureElement("#root"));
modalEditRoot.render(
    <AppEntry />
);





