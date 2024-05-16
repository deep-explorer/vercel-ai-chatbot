import { Chat } from '@/components/chat'
import { AI } from '@/lib/chat/actions'
import { auth } from '@/auth'
import { Session } from '@/lib/types'
import { getMissingKeys } from '@/app/actions'
import { InitialMessage } from '@/components/vitamin/initial-message'

export const metadata = {
  title: "Antelope Chatbot: Children's Vitamins Analyzer"
}

export default async function IndexPage() {
  const session = (await auth()) as Session
  const missingKeys = await getMissingKeys()

  return (
    <AI initialAIState={{ chatId: 'vitamin-analyzer', messages: [] }}>
      <Chat
        initialScreen={<InitialMessage />}
        id={'vitamin-analyzer'}
        session={session}
        missingKeys={missingKeys}
      />
    </AI>
  )
}
