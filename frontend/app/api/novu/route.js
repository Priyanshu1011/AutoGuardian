import { serve } from "@novu/framework/next";
import { myWorkflow } from "../../novu/workflows";

export const { GET, POST, PUT, OPTIONS } = serve({ workflows: [myWorkflow] });
