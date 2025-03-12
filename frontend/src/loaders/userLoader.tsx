import { isAuthenticatedVar } from "@/apollo/apolloVars";
import { redirect } from "react-router-dom";

export async function userLoader() {
  const isAuthenticated = isAuthenticatedVar();

  if (!isAuthenticated) {
    throw redirect("/"); 
  }

  return null; 
}
