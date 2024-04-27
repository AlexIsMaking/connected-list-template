import { Action, ActionPanel, getPreferenceValues, List, showToast, Toast } from "@raycast/api";
import { useFetch } from "@raycast/utils";
import { Ale, Preferences } from "./types";

export default function Command() {
  const preferences = getPreferenceValues<Preferences>();

  const { isLoading, data, revalidate } = useFetch(() => "https://api.sampleapis.com/beers/ale", {
    headers: { Authorization: `Bearer ${preferences.apiKey}` },
    initialData: [],
    keepPreviousData: true,
    mapResult(result: Ale[]) {
      // console.log("result:", JSON.stringify(result));
      return { data: result };
    },
  });

  return (
    <List isLoading={isLoading}>
      {data && data.length > 0 ? (
        data.map((item) => (
          <List.Item
            key={item.id}
            title={item.name}
            subtitle={`Price: ${item.price} | Rating: ${item.rating.average} (${item.rating.reviews} reviews)`}
            actions={
              <ActionPanel>
                <Action title="Select" onAction={() => showToast(Toast.Style.Success, "Selected", item.name)} />
                <Action title="Refresh" shortcut={{ modifiers: ["cmd"], key: "r" }} onAction={() => revalidate()} />
              </ActionPanel>
            }
          />
        ))
      ) : (
        <List.EmptyView title="No data available" description="Failed to fetch data from the API." />
      )}
    </List>
  );
}
