import { QueryClient } from '@tanstack/react-query'

function handleError(error: unknown): void {
  if (import.meta.env.DEV) {
    console.error('Mutation error:', error)
  }
  // TODO: Sentry
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount: number, error: unknown) => {
        const status = (error as { status?: number })?.status
        return failureCount < 1 && status !== 404
      },
      staleTime: 1000 * 60, // 1 minute
    },
    mutations: {
      retry: false,
      onError: handleError,
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    queryClient.clear()
  })
}
