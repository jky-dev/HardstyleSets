import { qdanceYoutube } from './qdanceYoutube';
import { b2sYoutube } from './b2sYoutube';

export let musicSets = [...b2sYoutube, ...qdanceYoutube];

musicSets.sort((a, b) => (a.published > b.published) ? -1 : ((b.published > a.published) ? 1 : 0));
