import usmapData from "./usmap.json"
import loadStates from "./loadstates.json"

export const usmap = usmapData as {
  viewBox: string
  states: { id: string; name: string; d: string }[]
  labels: { x: number; y: number; t: string }[]
}

export const statesWithLoads = new Set<string>(loadStates)
export type LoadsData = { columns: string[]; byState: Record<string, (string | number)[][]> }
