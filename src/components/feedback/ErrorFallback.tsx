import { AlertCircle, RotateCcw } from 'lucide-react'
import type { FallbackProps } from 'react-error-boundary'
import { Button } from '@/components/ui/button'

interface ErrorFallbackProps extends FallbackProps {
}

function getErrorMessage(error: unknown): string {
  if (import.meta.env.PROD) return '系统异常，请稍后重试'
  if (error instanceof Error) return error.message
  if (typeof error === 'string') return error
  return '未知错误'
}

export function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center gap-4 rounded-lg border border-red-200 bg-red-50 p-8 text-center">
      <AlertCircle className="h-12 w-12 text-red-500" />
      <div>
        <h3 className="text-lg font-semibold text-red-900">发生了一些错误</h3>
        <p className="mt-1 text-sm text-red-700">{getErrorMessage(error)}</p>
      </div>
      <Button
        variant="outline"
        onClick={resetErrorBoundary}
        className="border-red-300 text-red-700 hover:bg-red-100"
      >
        <RotateCcw className="mr-2 h-4 w-4" />
        重试
      </Button>
    </div>
  )
}
