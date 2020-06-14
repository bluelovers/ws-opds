/**
 * Created by user on 2020/6/15.
 */
import { CreateOptions } from 'xmlbuilder';
export interface IOptions extends Pick<CreateOptions, 'standalone' | 'version' | 'encoding'> {
    version?: '1.0' | string;
    encoding?: 'UTF-8' | string;
    standalone?: boolean;
    pretty?: boolean;
}
export interface ISchema {
    name?: '$' | string;
    transform?<T, R>(value: T): R;
    transform?<R>(value: any): R;
    untransform?<T, R>(value: T): R;
    untransform?<R>(value: any): R;
    attributes?: Record<'$' | string, ISchema>;
    fields?: Record<'$' | string, ISchema>;
    map?: {
        to?: any;
        href?: any;
    };
    value?: any;
    inner?: any;
    bool?: any;
    tag?: any;
    text?: boolean;
    raw?: boolean;
    array?: boolean;
    cdata?: boolean;
    default?: any;
}
