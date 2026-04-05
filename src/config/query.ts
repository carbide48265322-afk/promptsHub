import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      staleTime: 1000 * 60, // 1 minute
    },
    mutations: {
      onError: (error: unknown) => {
        console.error('Mutation error:', error)
      },
    },
  },
})
