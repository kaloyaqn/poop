import './index.css'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import Home from './screens/Home'

const supabase = createClient('https://zyuebxkjnotchjumbrqq.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5dWVieGtqbm90Y2hqdW1icnFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQyNzI1OTcsImV4cCI6MjAxOTg0ODU5N30.uljUag2sAZ1kEBuf8exQodk_Vy_q0sNO-FLgTPTKmFA')

export default function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (!session) {
    return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />)
  }
  else {
    return (<Home session={session}/>)
  }
}