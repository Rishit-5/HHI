import { child, get, DatabaseReference } from 'firebase/database'
import { StakeholderInfo } from 'types'

export async function getData(dbRef: DatabaseReference): Promise<StakeholderInfo[]> {
  const snapshot = await get(child(dbRef, "/"))
  if (snapshot.exists()) {
    try {
      return snapshot.val()
    } catch (e) {
      console.error('Data failed to parse\n', e)
      return []
    }
  } else {
    console.error('No data available')
    return []
  }
}