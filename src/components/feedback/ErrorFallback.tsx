import type { FallbackProps } from 'react-error-boundary'
import { Button } from '@/components/ui/button'

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const message = (error instanceof Error ? error.message : '未知错误')
  const displayMessage = import.meta.env.PROD ? '系统异常，请稍后重试' : message

  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center gap-4 rounded-lg border border-red-200 bg-red-50 p-8 text-center">
      <h3 className="text-lg font-semibold text-red-900">发生了一些错误</h3>
      <p className="text-sm text-red-700">{displayMessage}</p>
      <Button variant="outline" onClick={resetErrorBoundary}>
        重试
      </Button>
    </div>
  )
}
