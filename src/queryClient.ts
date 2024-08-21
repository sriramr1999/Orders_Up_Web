import axios from 'axios'
import { toast } from 'react-toastify'
import {
  DefaultOptions,
  MutationCache,
  QueryCache,
  QueryClient,
} from 'react-query'

/**
 * Define the global default options for react-query
 */
export const defaultOptions: DefaultOptions = {
  queries: {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  },
} as const

/**
 * Create a new Mutation Cache
 */
export const mutationCache = new MutationCache({
  /**
   * Handle errors that occur when a mutation fails
   */
  onError: (error, variables, context, mutation) => {
    // If the mutation already has an onError handler, don't do anything
    if (mutation.options.onError) return

    // If the error is an axios error with a code response
    if (axios.isAxiosError(error)) {
      console.dir(error)
      toast.error(
        error.response?.data?.error ||
          `An unknown error occurred (code: ${
            error.response?.statusText || error.message
          })`
      )
    }
  },
})

/**
 * Create a new Query Cache
 */
export const queryCache = new QueryCache({})

/**
 * Create a new quety client
 */
export const queryClient = new QueryClient({
  mutationCache,
  queryCache,
  defaultOptions,
})
