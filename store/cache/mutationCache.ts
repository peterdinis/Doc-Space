import { MutationCache } from '@tanstack/react-query'
 
export const mutationCache = new MutationCache({
  onError: error => {
    console.log(error);
  },
  onSuccess: data => {
    console.log(data);
  },

  onMutate: data => {
    console.log(data);
  }
})