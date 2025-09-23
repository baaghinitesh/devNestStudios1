import { useState, useEffect } from 'react'
import { apiUrl, handleApiError } from '@/lib/utils'
import type { ApiResponse } from '@/types'

interface UseApiOptions {
  immediate?: boolean
  onSuccess?: (data: any) => void
  onError?: (error: string) => void
}

export function useApi<T = any>(
  endpoint: string,
  options: UseApiOptions = {}
) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(options.immediate !== false)
  const [error, setError] = useState<string | null>(null)

  const execute = async (params?: Record<string, any>) => {
    try {
      setLoading(true)
      setError(null)

      const url = new URL(apiUrl(endpoint), window.location.origin)
      
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            url.searchParams.append(key, String(value))
          }
        })
      }

      const response = await fetch(url.toString())
      const result: ApiResponse<T> = await response.json()

      if (!response.ok || result.status === 'error') {
        throw new Error(result.message || 'Request failed')
      }

      setData(result.data || null)
      options.onSuccess?.(result.data)
      return result.data
    } catch (err) {
      const errorObj = handleApiError(err)
      const errorMessage = errorObj.message
      setError(errorMessage)
      options.onError?.(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const post = async (data: any) => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(apiUrl(endpoint), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result: ApiResponse<T> = await response.json()

      if (!response.ok || result.status === 'error') {
        throw new Error(result.message || 'Request failed')
      }

      setData(result.data || null)
      options.onSuccess?.(result.data)
      return result.data
    } catch (err) {
      const errorObj = handleApiError(err)
      const errorMessage = errorObj.message
      setError(errorMessage)
      options.onError?.(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (options.immediate !== false) {
      execute()
    }
  }, [endpoint])

  return {
    data,
    loading,
    error,
    execute,
    post,
    refresh: () => execute(),
    reset: () => {
      setData(null)
      setError(null)
      setLoading(false)
    }
  }
}

export function useBlogs() {
  return useApi('/blog')
}

export function useBlog(slug: string) {
  return useApi(`/blog/${slug}`, { immediate: !!slug })
}

export function useProjects() {
  return useApi('/projects')
}

export function useProject(slug: string) {
  return useApi(`/projects/${slug}`, { immediate: !!slug })
}

export function useFeaturedProjects() {
  return useApi('/projects/featured')
}

export function useFeaturedBlogs() {
  return useApi('/blog/featured')
}

// Custom hook for form submissions
export function useFormSubmit<T = any>(endpoint: string) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const submit = async (data: any) => {
    try {
      setLoading(true)
      setError(null)
      setSuccess(false)

      const response = await fetch(apiUrl(endpoint), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result: ApiResponse<T> = await response.json()

      if (!response.ok || result.status === 'error') {
        throw new Error(result.message || 'Submission failed')
      }

      setSuccess(true)
      return result.data
    } catch (err) {
      const errorObj = handleApiError(err)
      const errorMessage = errorObj.message
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setError(null)
    setSuccess(false)
    setLoading(false)
  }

  return {
    submit,
    loading,
    error,
    success,
    reset
  }
}