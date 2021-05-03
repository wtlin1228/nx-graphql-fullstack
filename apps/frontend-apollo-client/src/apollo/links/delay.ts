import { setContext } from '@apollo/client/link/context';

export default function createDelayLink() {
  return setContext(() => new Promise((resolve) => setTimeout(resolve, 1500)));
}
