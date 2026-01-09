import { useSyncExternalStore } from "react";

export function useMounted() {
  return useSyncExternalStore(
    () => () => {}, // subscribe (не нужен)
    () => true, // client snapshot
    () => false // server snapshot
  );
}
