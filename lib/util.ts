import { Price } from './v1/index';
import { Schema } from './class';
import { EnumLinkRel } from './const';

export function typedOrObjectList<A, B extends Schema.Base>(inputList: unknown | unknown[], typeA: A | string, typeB: {
	new(): B
}): (A | B)[]
{
	if (inputList != null)
	{
		if (!Array.isArray(inputList))
		{
			inputList = [inputList];
		}

		let typeFn: (v: unknown) => boolean;

		if (typeof typeA === 'string')
		{
			typeFn = (v) => typeof v === typeA
		}
		else
		{
			// @ts-ignore
			typeFn = (v) => (v instanceof typeA)
		}

		return (inputList as (A | B)[]).reduce(function (a, v)
		{
			if (typeFn(v))
			{
				a.push(v);
			}
			else if (v != null)
			{
				let r = (typeB as any as typeof Schema.Base).deserialize(v as any);
				let ls = Object.entries(r.serialize()).filter(r => r[1] != null);

				if (ls.length > 0)
				{
					a.push(r);
				}
			}

			return a
		}, [])
	}

}

export function hrefURL(value: string | URL): string
{
	if (typeof value === 'string')
	{
		return value
	}
	else if (value && typeof (value as URL).href === 'string')
	{
		return value.href
	}
}

export function getOPDSRel(value: string | URL): string
{
	let v = hrefURL(value);

	if (v != null)
	{
		let lc = v.toLowerCase();
		if (lc in EnumLinkRel)
		{
			return EnumLinkRel[lc]
		}

		lc = lc.replace('_', '/');
		if (lc in EnumLinkRel)
		{
			return EnumLinkRel[lc]
		}

		lc = lc.replace('/', '_');
		if (lc in EnumLinkRel)
		{
			return EnumLinkRel[lc]
		}

		if (v in EnumLinkRel)
		{
			return EnumLinkRel[v]
		}
		else
		{
			return v
		}
	}
}

export default exports as typeof import('./util');
