/**
 * Created by user on 2019/3/8.
 */
export { Feed, Entry, Link, Author, Price, EntryCategory, EntryContent } from './core';
import { Feed, Entry, Link, Author, Price, EntryCategory, EntryContent } from './core';

export const parseXML = Feed.parseXML.bind(Feed);
export const parseJSON = Feed.parseJSON.bind(Feed);

export const parseJSONObject = Feed.deserialize.bind(Feed);

export default exports as typeof import('./index');
