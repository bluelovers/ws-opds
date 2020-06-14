/**
 * Created by user on 2019/3/7.
 */

import {
	IParseOptions,
	JsonElementType,
	JsonObject,
	JsonProperty,
	JsonWriteonly,
	TaJson,
	BeforeDeserialized,
	OnDeserialized,
	JsonConstructor,
} from "ta-json-x";
import util = require('util');
import "reflect-metadata";
import SymbolInspect = require('symbol.inspect');
import { EnumPriceCurrencyCode } from './const';

export namespace Schema
{
	@JsonObject()
	export abstract class Base<D extends Base.TSTYPE = Base.TSTYPE>
	{

		constructor(...argv)
		{
			this._init(...argv);
		}

		@JsonConstructor()
		protected _init(...argv)
		{
			if (this.BeforeDeserialized)
			{
				this.BeforeDeserialized(...argv);
			}
		}

		@BeforeDeserialized()
		protected BeforeDeserialized(...argv)
		{};

		stringify(pretty?: boolean | string): string
		{
			if (pretty === false)
			{
				pretty = '';
			}

			if (typeof pretty !== 'string')
			{
				pretty = '\t';
			}

			return JSON.stringify(this.serialize(), null, pretty);
		}

		serialize<T extends D>(): T
		{
			return TaJson.serialize(this);
		}

		static deserialize<T extends Base>(json: Partial<T>, options?: IParseOptions): T
		static deserialize<T extends Base, J extends Base.TSTYPE | Partial<T>>(json: J, options?: IParseOptions): T & Base
		static deserialize<T extends Base, J extends Base.TSTYPE | Partial<T>>(json: J, options?: IParseOptions): T & Base
		{
			return TaJson.deserialize<T>(json, this as any, options) as any;
		}

		static parse<T extends Base>(json: string, options?: IParseOptions): T
		{
			return TaJson.parse<T>(json, this as any, options)
		}

		_isvaild(): boolean
		{
			let ls = Object.entries(this.serialize()).filter(r => r[1] != null);

			return ls.length > 0;
		}

	}

	export declare namespace Base
	{
		export interface TSTYPE
		{
			[k: string]: unknown
		}
	}

}

export default exports as typeof import('./class');
