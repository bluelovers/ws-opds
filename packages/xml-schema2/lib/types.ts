/**
 * Created by user on 2020/6/15.
 */
import { CreateOptions } from 'xmlbuilder';

export interface IOptions extends Pick<CreateOptions, 'standalone' | 'version' | 'encoding'>
{
	version?: '1.0' | string,
	encoding?: 'UTF-8' | string,
	standalone?: boolean,

	pretty?: boolean,
}

export interface ISchema
{
	name?: '$' | string

	transform?<T, R = T>(value: T): R
	untransform?<T, R = T>(value: T): R

	attributes?: Record<'$' | string, ISchema>
	fields?: Record<'$' | string, ISchema>

	map?: {
		to?,
	},

	value?
	inner?
	bool?
	tag?

	text?: boolean,
	raw?: boolean,
	array?: boolean,
	cdata?: boolean,

	default?
}
