import { json } from "@remix-run/node";
import supabaseClient from "~/supabaseClient";

export async function loader() {
  console.debug("Fetching free players", supabaseClient);
  const { data: freePlayers, error } = await supabaseClient
    .from("freePlayers")
    .select("id");

  console.debug("Free players fetched", freePlayers, error);
  if (error) {
    console.error("Error fetching players", error);
    return json(
      { error: "An error occurred while fetching the free players" },
      { status: 500 }
    );
  }

  return json({ freePlayers });
}

// // This function can run for a maximum of 300 seconds
export const config = {
  regions: ["fra1"],
};
