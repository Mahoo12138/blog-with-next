const MEMOS_TOKEN = process.env.MEMOS_TOKEN
const MEMOS_API_URL = process.env.MEMOS_API_URL

export const getLetastMemos = async (): Promise<Memos[]> => {
  try {
    const result = await fetch(`${MEMOS_API_URL}/api/v1/memos?pageSize=5`, {
      headers: { Authorization: `Bearer ${MEMOS_TOKEN}` },
    })
    const { memos } = await result.json()
    return memos
  } catch (error) {
    console.log('erorr', error)
    return []
  }
}

export interface Memos {
  name: string
  displayTime: string
  content: string
}
