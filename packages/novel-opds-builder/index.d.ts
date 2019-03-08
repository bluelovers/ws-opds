/**
 * Created by user on 2019/3/8.
 */
import { IFilterNovelData, NovelStatCache } from '@node-novel/cache-loader';
import { OPDSV1 } from 'opds-extra';
import Bluebird = require('bluebird');
/**
 * build OPDS xml from node-novel novel-stat.json
 *
 * @param {string} novelStatJsonPath
 * @param {string} outputOPDSPath
 */
export declare function buildOPDS(novelStatJsonPath: string, outputOPDSPath: string): Bluebird<{
    ret: {
        pathMains: string[];
        alias: {
            [title: string]: IFilterNovelDataPlus[];
        };
        novels: IFilterNovelDataPlus[];
        authors: string[];
        max_chapter: number;
        data: import("@node-novel/cache-loader").IFilterNovel;
        novels2: {
            [title: string]: INovels2Row;
        };
        novels3: {
            [author: string]: IFilterNovelDataPlus[];
        };
        novelStatCache: NovelStatCache;
    };
    feed: OPDSV1.Feed;
    xml: string;
}>;
export interface INovels2Row {
    epub_date?: number;
    title?: string;
    titles?: string[];
    authors?: string[];
    list?: IFilterNovelDataPlus[];
}
export declare type IFilterNovelDataPlus = IFilterNovelData & {
    _index: number;
    update_date: number;
    update_date2: number;
    epub_date: number;
    segment_date: number;
    title: string;
};
export declare function _cache(novelStatJsonPath: string): Bluebird<{
    pathMains: string[];
    alias: {
        [title: string]: IFilterNovelDataPlus[];
    };
    novels: IFilterNovelDataPlus[];
    authors: string[];
    max_chapter: number;
    data: import("@node-novel/cache-loader").IFilterNovel;
    novels2: {
        [title: string]: INovels2Row;
    };
    novels3: {
        [author: string]: IFilterNovelDataPlus[];
    };
    novelStatCache: NovelStatCache;
}>;
export default buildOPDS;
