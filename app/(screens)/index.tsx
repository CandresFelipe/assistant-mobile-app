import { useRouter } from 'expo-router'
import { useEffect } from 'react'

const Index = () => {
	const router = useRouter()

	useEffect(() => {
		router.replace('/welcome') // Redirect to the welcome screen
	}, [router])

	return null
}

export default Index
