import { child, get, DatabaseReference } from 'firebase/database'
import { DataSchema, Stakeholder } from 'types'
import { parse } from 'valibot';

export async function getData(dbRef: DatabaseReference): Promise<Stakeholder[]> {
  const snapshot = await get(child(dbRef, "/"))
  if (snapshot.exists()) {
    try {
      return parse(DataSchema, snapshot.val(), { abortEarly: true});
    } catch (e) {
      console.error('Data failed to parse\n', e)
      return []
    }
  } else {
    console.error('No data available')
    return []
  }
}