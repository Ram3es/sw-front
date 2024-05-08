import { ConditionItem } from "@/types/Card"

export function findNearestMaxValue (arr: ConditionItem[], value: number): ConditionItem | null {
  let nearestMaxValue: ConditionItem | null = null

  for (let i = 0; i < arr.length; i++) {
    const maxVal: number = arr[i].maxVal

    if (value < maxVal) {
      nearestMaxValue = arr[i]
      break
    }
  }

  return nearestMaxValue
}